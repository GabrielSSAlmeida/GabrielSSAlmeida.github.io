import { Link } from 'react-router'
import type { Series } from '../lib/content'
import { formatMonth, plural } from '../lib/format'
import { ArrowRightIcon } from './Icons'
import { Cover } from './Cover'
import './SeriesCard.css'

const PREVIEW_COUNT = 3

export function SeriesCard({ series }: { series: Series }) {
  const preview = series.posts.slice(0, PREVIEW_COUNT)
  const remaining = series.posts.length - preview.length

  return (
    <article className="series-card card overflow-hidden">
      <Link
        to={`/series/${series.slug}`}
        className="series-card__media d-block text-decoration-none border-bottom border-soft"
        tabIndex={-1}
        aria-hidden
      >
        <Cover src={series.cover} label={series.title} />
      </Link>
      <div className="series-card__body card-body d-flex flex-column">
        <h2 className="series-card__title m-0">
          <Link to={`/series/${series.slug}`} className="text-decoration-none">
            {series.title}
          </Link>
        </h2>
        <div className="series-card__meta d-flex flex-wrap font-monospace text-body-tertiary">
          <span>{plural(series.posts.length, 'article')}</span>
          {series.startedAt && <span>Started {formatMonth(series.startedAt)}</span>}
        </div>
        <p className="series-card__desc m-0 text-body-secondary">{series.description}</p>

        {preview.length > 0 && (
          <div className="series-card__list border border-soft rounded-3 bg-body">
            <p className="series-card__list-label font-monospace text-uppercase text-body-tertiary">Articles in this series</p>
            <ol className="m-0">
              {preview.map((p) => (
                <li key={p.slug}>
                  <Link to={`/posts/${p.slug}`} className="text-decoration-none">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ol>
            {remaining > 0 && (
              <Link to={`/series/${series.slug}`} className="series-card__more d-inline-block text-decoration-none">
                + {plural(remaining, 'more article')}
              </Link>
            )}
          </div>
        )}

        <Link
          to={`/series/${series.slug}`}
          className="series-card__cta d-inline-flex align-items-center align-self-start fw-semibold text-decoration-none"
        >
          View series <ArrowRightIcon />
        </Link>
      </div>
    </article>
  )
}
