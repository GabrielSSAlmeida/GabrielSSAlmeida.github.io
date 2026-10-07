import { seriesDefinitions, type SeriesDefinition } from '../content/series'
import { parseFrontmatter } from './frontmatter'

export interface Post {
  slug: string
  title: string
  date: Date
  description: string
  tags: string[]
  series?: string
  seriesOrder?: number
  cover?: string
  draft: boolean
  body: string
  readingMinutes: number
}

export interface Series extends SeriesDefinition {
  posts: Post[]
  startedAt?: Date
}

// Every .md file in src/content/posts is a post; its file name (minus .md) is the URL slug.
const files = import.meta.glob<string>('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const seriesSlugs = new Set(seriesDefinitions.map((s) => s.slug))

function fail(file: string, message: string): never {
  throw new Error(`[content] ${file}: ${message}`)
}

/** Parses "YYYY-MM-DD" as a local date so it doesn't shift a day in negative UTC offsets. */
function toDate(value: unknown, file: string): Date {
  const str = value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? '')
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(str)
  if (!m) fail(file, `"date" must be YYYY-MM-DD, got "${str}"`)
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
}

function toPost(path: string, raw: string): Post {
  const file = path.split('/').pop()!
  const slug = file.replace(/\.md$/, '')
  const { data, body } = parseFrontmatter(raw)

  if (typeof data.title !== 'string' || !data.title) fail(file, 'missing "title"')
  const series = data.series == null ? undefined : String(data.series)
  if (series && !seriesSlugs.has(series)) {
    fail(file, `unknown series "${series}". Define it in src/content/series.ts`)
  }

  const words = body.trim().split(/\s+/).length
  return {
    slug,
    title: data.title,
    date: toDate(data.date, file),
    description: typeof data.description === 'string' ? data.description : '',
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    series,
    seriesOrder: typeof data.seriesOrder === 'number' ? data.seriesOrder : undefined,
    cover: typeof data.cover === 'string' ? data.cover : undefined,
    draft: data.draft === true,
    body,
    readingMinutes: Math.max(1, Math.round(words / 220)),
  }
}

/** All published posts, newest first. Drafts are only visible in `npm run dev`. */
export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => toPost(path, raw))
  .filter((p) => import.meta.env.DEV || !p.draft)
  .sort((a, b) => b.date.getTime() - a.date.getTime())

/** All series, each with its posts in reading order, most recently active first. */
export const series: Series[] = seriesDefinitions
  .map((def) => {
    const seriesPosts = posts
      .filter((p) => p.series === def.slug)
      .sort(
        (a, b) =>
          (a.seriesOrder ?? Infinity) - (b.seriesOrder ?? Infinity) ||
          a.date.getTime() - b.date.getTime(),
      )
    const startedAt = seriesPosts.reduce<Date | undefined>(
      (min, p) => (!min || p.date < min ? p.date : min),
      undefined,
    )
    return { ...def, posts: seriesPosts, startedAt }
  })
  .sort((a, b) => latest(b) - latest(a))

function latest(s: Series): number {
  return Math.max(0, ...s.posts.map((p) => p.date.getTime()))
}

export const allTags: string[] = [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) =>
  a.localeCompare(b),
)

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getSeries(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug)
}
