import { useState } from 'react'
import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from '../components/Icons'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { about, avatarUrl, githubUrl, site, type TimelineItem } from '../site.config'
import './AboutPage.css'

export function AboutPage() {
  useDocumentTitle('About')
  return (
    <div className="page page--narrow mx-auto about">
      <section className="about__intro d-flex">
        <Avatar />
        <div className="d-flex flex-column gap-2">
          <span className="about__eyebrow font-monospace text-body-tertiary">// about me</span>
          <h1 className="about__name m-0">
            <span className="text-primary">{site.name.split(' ')[0]}</span> {site.name.split(' ').slice(1).join(' ')}
          </h1>
          <p className="about__role m-0 text-body-secondary">{about.role}</p>
          {about.location && (
            <p className="about__location m-0 d-inline-flex align-items-center font-monospace text-body-tertiary">
              <MapPinIcon size={14} /> {about.location}
            </p>
          )}
          <div className="about__links d-flex flex-wrap">
            <a className="btn btn-accent d-inline-flex align-items-center gap-2" href={githubUrl} target="_blank" rel="noreferrer">
              <GithubIcon /> GitHub
            </a>
            <a className="btn btn-ghost d-inline-flex align-items-center gap-2" href={site.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon /> LinkedIn
            </a>
            {site.email && (
              <a className="btn btn-ghost d-inline-flex align-items-center gap-2" href={`mailto:${site.email}`}>
                <MailIcon /> Email
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="about__section">
        {about.bio.map((paragraph, i) => (
          <p key={i} className="about__bio">
            {paragraph}
          </p>
        ))}
      </section>

      <Timeline title="Experience" items={about.experience} />
      <Timeline title="Education" items={about.education} />

      {about.skills.length > 0 && (
        <section className="about__section">
          <SectionLabel>Skills</SectionLabel>
          <ul className="d-flex flex-wrap gap-2 list-unstyled m-0">
            {about.skills.map((s) => (
              <li key={s} className="about__skill border rounded-1 bg-body-tertiary font-monospace text-body-secondary">
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="section-label d-flex align-items-center mt-3 mb-4 font-monospace fw-medium text-uppercase text-body-tertiary">
      {children}
    </h2>
  )
}

function Avatar() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="about__avatar position-relative flex-shrink-0 rounded-circle">
      {failed ? (
        <span className="about__avatar-img d-grid w-100 h-100 rounded-circle bg-body-secondary font-monospace fw-bold text-primary">
          GA
        </span>
      ) : (
        <img
          className="about__avatar-img d-grid w-100 h-100 rounded-circle object-fit-cover bg-body-secondary"
          src={avatarUrl}
          alt={site.name}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}

function Timeline({ title, items }: { title: string; items: TimelineItem[] }) {
  if (items.length === 0) return null
  return (
    <section className="about__section">
      <SectionLabel>{title}</SectionLabel>
      <ol className="timeline list-unstyled m-0 ps-4 border-start">
        {items.map((item, i) => (
          <li key={i} className="timeline__item position-relative">
            <span className="timeline__period font-monospace text-body-tertiary">{item.period}</span>
            <h3 className="timeline__title">{item.title}</h3>
            <p className="timeline__place m-0 text-primary-emphasis">{item.place}</p>
            {item.description && <p className="timeline__desc mt-2 mb-0 text-body-secondary">{item.description}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}
