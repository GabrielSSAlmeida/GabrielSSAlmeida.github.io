// Provided by the `posts` plugin in vite.config.ts.
declare module 'virtual:posts' {
  /** Raw Markdown of each post, keyed by file path/name. */
  const files: Record<string, string>
  export default files
}
