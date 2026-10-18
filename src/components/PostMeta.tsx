import type { Post } from '../lib/content'
import { formatDate } from '../lib/format'
import { ClockIcon } from './Icons'
import './PostMeta.css'

export function PostMeta({ post }: { post: Post }) {
  return (
    <div className="post-meta d-flex flex-wrap align-items-center font-monospace text-body-tertiary">
      <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
      <span className="post-meta__item d-inline-flex align-items-center">
        <ClockIcon size={13} />
        {post.readingMinutes} min read
      </span>
      {post.draft && <span className="post-meta__draft fw-bold text-primary-emphasis">DRAFT</span>}
    </div>
  )
}
