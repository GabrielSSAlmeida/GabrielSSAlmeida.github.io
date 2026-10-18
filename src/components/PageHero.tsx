import type { ReactNode } from 'react'
import './PageHero.css'

interface PageHeroProps {
  title: ReactNode
  subtitle?: ReactNode
  /** Rendered beside the title, aligned right (e.g. the search box). */
  aside?: ReactNode
  children?: ReactNode
}

/** Page header: title + subtitle, with an optional right-aligned slot. */
export function PageHero({ title, subtitle, aside, children }: PageHeroProps) {
  return (
    <section className="border-bottom border-soft">
      <div className="hero__inner d-flex justify-content-between mx-auto">
        <div className="hero__text">
          <span className="hero__dash d-block mb-4 bg-primary" />
          <h1 className="hero__title m-0">{title}</h1>
          {subtitle && <p className="hero__subtitle mb-0 text-body-secondary">{subtitle}</p>}
          {children}
        </div>
        {aside && <div className="hero__aside">{aside}</div>}
      </div>
    </section>
  )
}
