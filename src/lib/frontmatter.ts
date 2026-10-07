import { parse } from 'yaml'

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

/** Splits a Markdown file into its YAML front matter and body. */
export function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = FRONTMATTER.exec(raw)
  if (!match) return { data: {}, body: raw }
  const data = (parse(match[1]) ?? {}) as Record<string, unknown>
  return { data, body: match[2] }
}
