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
        <div className="series-hero__meta d-flex flex-wrap font-monospace text-body-tertiary">
          <span>{plural(s.posts.length, 'article')} in this series</span>
          {s.startedAt && <span>Started {formatDate(s.startedAt)}</span>}
        </div>
      </PageHero>

      <div className="page page--narrow mx-auto pt-5">
        <Link
          to="/series"
          className="back-link d-inline-flex align-items-center align-self-start mb-4 font-monospace text-decoration-none"
        >
          <ArrowLeftIcon /> All series
        </Link>

        {s.cover && <img className="series-page__cover d-block w-100 object-fit-cover border" src={s.cover} alt="" />}

        {s.posts.length === 0 ? (
          <EmptyState>No posts in this series yet.</EmptyState>
        ) : (
          <ol className="series-posts position-relative d-flex flex-column gap-3 list-unstyled m-0">
            {s.posts.map((p, i) => (
              <li key={p.slug} className="series-post card flex-row">
                <span className="series-post__num d-grid flex-shrink-0 rounded-circle border border-primary-subtle bg-primary-subtle text-primary-emphasis font-monospace fw-bold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="series-post__body d-flex flex-column">
                  <h2 className="series-post__title">
                    <Link to={`/posts/${p.slug}`} className="stretched-link text-decoration-none">
                      {p.title}
                    </Link>
                  </h2>
                  <PostMeta post={p} />
                  {p.description && <p className="series-post__desc m-0 text-body-secondary">{p.description}</p>}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  )
}
