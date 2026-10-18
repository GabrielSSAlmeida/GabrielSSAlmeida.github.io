import type { ReactNode } from 'react'

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="empty-state my-3 text-center font-monospace text-body-tertiary">{children}</p>
}
