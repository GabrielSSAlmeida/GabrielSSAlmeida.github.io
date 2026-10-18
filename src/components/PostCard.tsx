import { Link } from 'react-router'
import type { Post } from '../lib/content'
import { ArrowRightIcon } from './Icons'
import { Cover } from './Cover'
import { PostMeta } from './PostMeta'
import { SeriesBadge } from './SeriesBadge'
import { Tag } from './Tag'
import './PostCard.css'

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card card overflow-hidden">
      <div className="post-card__media">
        <Cover src={post.cover} label={post.tags[0] ?? 'post'} />
      </div>
      <div className="post-card__body card-body d-flex flex-column">
        {post.tags.length > 0 && (
          <div className="d-flex flex-wrap post-card__tags">
            {post.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
        <h2 className="post-card__title m-0 lh-sm">
          {/* Stretched link: the whole card is clickable. */}
          <Link to={`/posts/${post.slug}`} className="post-card__link stretched-link text-reset text-decoration-none">
            {post.title}
          </Link>
        </h2>
        {post.description && <p className="post-card__desc m-0 text-body-secondary">{post.description}</p>}
        <SeriesBadge post={post} />
        <div className="post-card__footer d-flex align-items-center justify-content-between mt-auto pt-1">
          <PostMeta post={post} />
          <ArrowRightIcon className="post-card__arrow flex-shrink-0" />
        </div>
      </div>
    </article>
  )
}
