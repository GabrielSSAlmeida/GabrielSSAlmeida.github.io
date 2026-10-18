import { Link } from 'react-router'
import { getSeries, type Post } from '../lib/content'
import './SeriesBadge.css'

/** "Part 2 of <Series>" link, rendered only for posts that belong to a series. */
export function SeriesBadge({ post }: { post: Post }) {
  const s = post.series ? getSeries(post.series) : undefined
  if (!s) return null
  const part = s.posts.findIndex((p) => p.slug === post.slug) + 1
  return (
    <Link
      to={`/series/${s.slug}`}
      className="series-badge position-relative align-self-start font-monospace text-body-secondary text-decoration-none"
    >
      Part {part} of <strong className="fw-medium">{s.title}</strong>
    </Link>
  )
}
