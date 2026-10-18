import { EmptyState } from '../components/EmptyState'
import { PageHero } from '../components/PageHero'
import { SeriesCard } from '../components/SeriesCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { series } from '../lib/content'

export function SeriesListPage() {
  useDocumentTitle('Series')
  return (
    <>
      <PageHero title="Series" subtitle="Posts grouped into in-depth, multi-part deep dives. Best read in order." />
      <div className="page page--narrow mx-auto pt-5 d-flex flex-column stack">
        {series.length === 0 ? (
          <EmptyState>No series yet.</EmptyState>
        ) : (
          series.map((s) => <SeriesCard key={s.slug} series={s} />)
        )}
      </div>
    </>
  )
}
