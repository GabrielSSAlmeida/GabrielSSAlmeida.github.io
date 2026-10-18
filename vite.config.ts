import { copyFileSync, readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { parseFrontmatter } from './src/lib/frontmatter.ts'

// GitHub Pages has no SPA fallback: a direct hit on /posts/foo would 404.
// GitHub serves 404.html for unknown paths, so we make it a copy of index.html
// and the client-side router takes over from there.
function githubPagesSpaFallback(): Plugin {
  let outDir = 'dist'
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    },
  }
}

// `virtual:posts` exports the raw Markdown of every post, keyed by file name.
// In production builds, posts with `draft: true` are left out entirely, so neither
// their text nor their file name ends up in the deployed site.
function posts(): Plugin {
  const id = 'virtual:posts'
  const resolvedId = '\0' + id
  const dir = resolve(import.meta.dirname, 'src/content/posts')
  let isBuild = false
  return {
    name: 'posts',
    configResolved(config) {
      isBuild = config.command === 'build'
    },
    resolveId(source) {
      if (source === id) return resolvedId
    },
    load(loadedId) {
      if (loadedId !== resolvedId) return
      if (!isBuild) {
        // Dev: a glob, so new and deleted files are picked up live. Drafts are included.
        return `export default import.meta.glob('/src/content/posts/*.md', { query: '?raw', import: 'default', eager: true })`
      }
      const files = readdirSync(dir)
        .filter((f) => f.endsWith('.md'))
        .filter((f) => parseFrontmatter(readFileSync(resolve(dir, f), 'utf8')).data.draft !== true)
      const imports = files.map((f, i) => `import p${i} from ${JSON.stringify(resolve(dir, f) + '?raw')}`)
      const entries = files.map((f, i) => `  ${JSON.stringify(f)}: p${i},`)
      return `${imports.join('\n')}\nexport default {\n${entries.join('\n')}\n}`
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), posts(), githubPagesSpaFallback()],
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5's Sass still uses @import and global functions; hide those upstream warnings.
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
      },
    },
  },
})
