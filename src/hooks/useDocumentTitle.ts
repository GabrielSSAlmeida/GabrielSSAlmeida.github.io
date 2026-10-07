import { useEffect } from 'react'
import { site } from '../site.config'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : site.name
  }, [title])
}
