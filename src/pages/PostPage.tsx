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
    <article>
      <header className="border-bottom border-soft">
        <div className="post__header-inner d-flex flex-column mx-auto">
          <Link to="/" className="back-link d-inline-flex align-items-center align-self-start font-monospace text-decoration-none">
            <ArrowLeftIcon /> All posts
          </Link>
          {post.tags.length > 0 && (
            <div className="post__tags d-flex flex-wrap">
              {post.tags.map((t) => (
                <Link key={t} to={`/?tag=${encodeURIComponent(t)}`} className="text-decoration-none">
                  <Tag>{t}</Tag>
                </Link>
              ))}
            </div>
          )}
          <h1 className="post__title m-0">{post.title}</h1>
          {post.description && <p className="post__desc m-0 text-body-secondary">{post.description}</p>}
          <PostMeta post={post} />
        </div>
      </header>

      <div className="page page--prose mx-auto pt-5">
        {post.cover && <img className="post__cover d-block w-100 border" src={post.cover} alt="" />}
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
    <aside className="series-toc rounded-3 bg-body-tertiary">
      <p className="series-toc__label font-monospace text-body-tertiary">
        Part {index + 1} of {series.posts.length} in{' '}
        <Link to={`/series/${series.slug}`} className="text-decoration-none">
          {series.title}
        </Link>
      </p>
      <ol className="m-0">
        {series.posts.map((p) => (
          <li key={p.slug} className={p.slug === current.slug ? 'is-current fw-semibold' : undefined}>
            {p.slug === current.slug ? (
              <span>{p.title}</span>
            ) : (
              <Link to={`/posts/${p.slug}`} className="text-decoration-none">
                {p.title}
              </Link>
            )}
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
    <nav className="pager d-grid border-top" aria-label="Series navigation">
      {prev ? (
        <Link to={`/posts/${prev.slug}`} className="pager__link card text-decoration-none">
          <span className="pager__dir d-inline-flex align-items-center font-monospace text-body-tertiary">
            <ArrowLeftIcon /> Previous
          </span>
          <span className="pager__title fw-semibold">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={`/posts/${next.slug}`} className="pager__link card text-decoration-none text-end">
          <span className="pager__dir d-inline-flex align-items-center justify-content-end font-monospace text-body-tertiary">
            Next <ArrowRightIcon />
          </span>
          <span className="pager__title fw-semibold">{next.title}</span>
        </Link>
      )}
    </nav>
  )
}
