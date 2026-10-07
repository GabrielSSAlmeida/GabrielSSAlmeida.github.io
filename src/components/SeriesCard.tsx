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
    <article className="series-card">
      <Link to={`/series/${series.slug}`} className="series-card__media" tabIndex={-1} aria-hidden>
        <Cover src={series.cover} label={series.title} />
      </Link>
      <div className="series-card__body">
        <h2 className="series-card__title">
          <Link to={`/series/${series.slug}`}>{series.title}</Link>
        </h2>
        <div className="series-card__meta">
          <span>{plural(series.posts.length, 'article')}</span>
          {series.startedAt && <span>Started {formatMonth(series.startedAt)}</span>}
        </div>
        <p className="series-card__desc">{series.description}</p>

        {preview.length > 0 && (
          <div className="series-card__list">
            <p className="series-card__list-label">Articles in this series</p>
            <ol>
              {preview.map((p) => (
                <li key={p.slug}>
                  <Link to={`/posts/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ol>
            {remaining > 0 && (
              <Link to={`/series/${series.slug}`} className="series-card__more">
                + {plural(remaining, 'more article')}
              </Link>
            )}
          </div>
        )}

        <Link to={`/series/${series.slug}`} className="series-card__cta">
          View series <ArrowRightIcon />
        </Link>
      </div>
    </article>
  )
}
