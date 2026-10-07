import { Link, useParams } from 'react-router'
import { EmptyState } from '../components/EmptyState'
import { ArrowLeftIcon } from '../components/Icons'
import { PageHero } from '../components/PageHero'
import { PostMeta } from '../components/PostMeta'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { getSeries } from '../lib/content'
import { formatDate, plural } from '../lib/format'
import { NotFoundPage } from './NotFoundPage'
import './SeriesPage.css'

export function SeriesPage() {
  const { slug = '' } = useParams()
  const s = getSeries(slug)
  useDocumentTitle(s?.title)
  if (!s) return <NotFoundPage />

  return (
    <>
      <PageHero title={s.title} subtitle={s.description}>
        <div className="series-hero__meta">
          <span>{plural(s.posts.length, 'article')} in this series</span>
          {s.startedAt && <span>Started {formatDate(s.startedAt)}</span>}
        </div>
      </PageHero>

      <div className="container container--narrow">
        <Link to="/series" className="back-link">
          <ArrowLeftIcon /> All series
        </Link>

        {s.cover && <img className="series-page__cover" src={s.cover} alt="" />}

        {s.posts.length === 0 ? (
          <EmptyState>No posts in this series yet.</EmptyState>
        ) : (
          <ol className="series-posts">
            {s.posts.map((p, i) => (
              <li key={p.slug} className="series-post">
                <span className="series-post__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="series-post__body">
                  <h2 className="series-post__title">
                    <Link to={`/posts/${p.slug}`}>{p.title}</Link>
                  </h2>
                  <PostMeta post={p} />
                  {p.description && <p className="series-post__desc">{p.description}</p>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  )
}
