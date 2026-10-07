import { lazy, Suspense } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeftIcon, ArrowRightIcon } from '../components/Icons'
import { PostMeta } from '../components/PostMeta'
import { Tag } from '../components/Tag'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getPost, getSeries, type Post, type Series } from '../lib/content'
import { NotFoundPage } from './NotFoundPage'
import './PostPage.css'

// Markdown + syntax highlighting are the heaviest dependencies, so they're only loaded on post pages.
const Markdown = lazy(() => import('../components/Markdown'))

export function PostPage() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  useDocumentTitle(post?.title)
  if (!post) return <NotFoundPage />

  const s = post.series ? getSeries(post.series) : undefined

  return (
    <article className="post">
      <header className="post__header">
        <div className="post__header-inner">
          <Link to="/" className="back-link">
            <ArrowLeftIcon /> All posts
          </Link>
          {post.tags.length > 0 && (
            <div className="post__tags">
              {post.tags.map((t) => (
                <Link key={t} to={`/?tag=${encodeURIComponent(t)}`} className="post__tag-link">
                  <Tag>{t}</Tag>
                </Link>
              ))}
            </div>
          )}
          <h1 className="post__title">{post.title}</h1>
          {post.description && <p className="post__desc">{post.description}</p>}
          <PostMeta post={post} />
        </div>
      </header>

      <div className="container container--prose">
        {post.cover && <img className="post__cover" src={post.cover} alt="" />}
        {s && <SeriesToc series={s} current={post} />}
        <Suspense fallback={<div className="post__loading" />}>
          <Markdown>{post.body}</Markdown>
        </Suspense>
        {s && <SeriesPager series={s} current={post} />}
      </div>
    </article>
  )
}

function SeriesToc({ series, current }: { series: Series; current: Post }) {
  const index = series.posts.findIndex((p) => p.slug === current.slug)
  return (
    <aside className="series-toc">
      <p className="series-toc__label">
        Part {index + 1} of {series.posts.length} in{' '}
        <Link to={`/series/${series.slug}`}>{series.title}</Link>
      </p>
      <ol>
        {series.posts.map((p) => (
          <li key={p.slug} className={p.slug === current.slug ? 'is-current' : undefined}>
            {p.slug === current.slug ? <span>{p.title}</span> : <Link to={`/posts/${p.slug}`}>{p.title}</Link>}
          </li>
        ))}
      </ol>
    </aside>
  )
}

function SeriesPager({ series, current }: { series: Series; current: Post }) {
  const index = series.posts.findIndex((p) => p.slug === current.slug)
  const prev = series.posts[index - 1]
  const next = series.posts[index + 1]
  if (!prev && !next) return null
  return (
    <nav className="pager" aria-label="Series navigation">
      {prev ? (
        <Link to={`/posts/${prev.slug}`} className="pager__link">
          <span className="pager__dir">
            <ArrowLeftIcon /> Previous
          </span>
          <span className="pager__title">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={`/posts/${next.slug}`} className="pager__link pager__link--next">
          <span className="pager__dir">
            Next <ArrowRightIcon />
          </span>
          <span className="pager__title">{next.title}</span>
        </Link>
      )}
    </nav>
  )
}
