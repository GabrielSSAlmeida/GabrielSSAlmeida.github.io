# GabrielSSAlmeida.github.io

Personal blog built with Vite + React + TypeScript, deployed to GitHub Pages.

NOTE: This code was generated almost entirely by AI, while the design and content of the posts were created entirely by me.

## Commands

```bash
npm install       # once
npm run dev       # local preview at http://localhost:5173 (shows drafts)
npm run build     # production build into dist/
npm run deploy    # build + push dist/ to the gh-pages branch
```

> GitHub repo settings → Pages → Source: **Deploy from a branch**, branch **gh-pages**, folder `/ (root)`.

## Writing a post

Create a Markdown file in `src/content/posts/`. The file name is the URL:
`src/content/posts/my-post.md` → `/posts/my-post`.

```md
---
title: My post title           # required
date: 2026-10-06               # required, YYYY-MM-DD
description: One-line summary  # cards + search
tags: [Linux, Yocto]           # optional, tag filter on Home
series: yocto-from-scratch     # optional, must exist in src/content/series.ts
seriesOrder: 1                 # optional, position inside the series
cover: /images/posts/foo.png   # optional, file in public/images/posts/
draft: true                    # optional, only visible in `npm run dev`
---

Post content in Markdown (GitHub-flavored: tables, task lists, code blocks with highlighting).
```

Images go in `public/images/posts/` and are referenced as `/images/posts/<file>`.

## Creating a series

Add an entry to `src/content/series.ts`:

```ts
{
  slug: 'yocto-from-scratch',
  title: 'Yocto from Scratch',
  description: 'Building an embedded Linux image step by step.',
  cover: '/images/series/yocto.png', // optional
}
```

Then set `series: yocto-from-scratch` in each post. Series with no published posts are hidden.

## Personal info

Name, links, bio and résumé (About page) live in `src/site.config.ts`.
The profile photo is loaded from GitHub (`https://github.com/<user>.png`).

## Project layout

```
src/
  content/posts/*.md   ← posts
  content/series.ts    ← series definitions
  site.config.ts       ← name, links, About page content
  lib/content.ts       ← loads/validates posts, builds series
  components/          ← UI pieces (Header, PostCard, SeriesCard, Markdown…)
  pages/               ← Home, Series, Series detail, Post, About, 404
  styles/              ← theme tokens (dark/light) + code highlighting
```

## GitHub Pages notes

- Routing uses clean URLs (`/posts/foo`). GitHub Pages has no SPA fallback, so the build
  copies `index.html` to `404.html` (see `vite.config.ts`) and the router takes over.
- `--nojekyll` in the deploy script stops GitHub from running Jekyll on the build output.
