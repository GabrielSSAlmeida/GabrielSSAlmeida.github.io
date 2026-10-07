import { Link } from 'react-router'
import { ArrowLeftIcon } from '../components/Icons'
import { PageHero } from '../components/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Not found')
  return (
    <PageHero title="404" subtitle="This page doesn't exist, or it was moved.">
      <Link to="/" className="btn btn--primary" style={{ marginTop: 32 }}>
        <ArrowLeftIcon /> Back home
      </Link>
    </PageHero>
  )
}
