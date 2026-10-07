import { Link } from 'react-router'
import { getSeries, type Post } from '../lib/content'
import './SeriesBadge.css'

/** "Part 2 of <Series>" link, rendered only for posts that belong to a series. */
export function SeriesBadge({ post }: { post: Post }) {
  const s = post.series ? getSeries(post.series) : undefined
  if (!s) return null
  const part = s.posts.findIndex((p) => p.slug === post.slug) + 1
  return (
    <Link to={`/series/${s.slug}`} className="series-badge">
      Part {part} of <strong>{s.title}</strong>
    </Link>
  )
}
