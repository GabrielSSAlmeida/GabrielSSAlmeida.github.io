import { useState } from 'react'
import { GithubIcon, LinkedinIcon, MailIcon, MapPinIcon } from '../components/Icons'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { about, avatarUrl, githubUrl, site, type TimelineItem } from '../site.config'
import './AboutPage.css'

export function AboutPage() {
  useDocumentTitle('About')
  return (
    <div className="container container--narrow about">
      <section className="about__intro">
        <Avatar />
        <div className="about__intro-text">
          <span className="about__eyebrow">// about me</span>
          <h1 className="about__name">
            <span className="about__first">{site.name.split(' ')[0]}</span> {site.name.split(' ').slice(1).join(' ')}
          </h1>
          <p className="about__role">{about.role}</p>
          {about.location && (
            <p className="about__location">
              <MapPinIcon size={14} /> {about.location}
            </p>
          )}
          <div className="about__links">
            <a className="btn btn--primary" href={githubUrl} target="_blank" rel="noreferrer">
              <GithubIcon /> GitHub
            </a>
            <a className="btn btn--ghost" href={site.linkedin} target="_blank" rel="noreferrer">
              <LinkedinIcon /> LinkedIn
            </a>
            {site.email && (
              <a className="btn btn--ghost" href={`mailto:${site.email}`}>
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
          <h2 className="section-label">Skills</h2>
          <ul className="about__skills">
            {about.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function Avatar() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="about__avatar">
      {failed ? (
        <span className="about__avatar-fallback">GA</span>
      ) : (
        <img src={avatarUrl} alt={site.name} onError={() => setFailed(true)} />
      )}
    </div>
  )
}

function Timeline({ title, items }: { title: string; items: TimelineItem[] }) {
  if (items.length === 0) return null
  return (
    <section className="about__section">
      <h2 className="section-label">{title}</h2>
      <ol className="timeline">
        {items.map((item, i) => (
          <li key={i} className="timeline__item">
            <span className="timeline__period">{item.period}</span>
            <h3 className="timeline__title">{item.title}</h3>
            <p className="timeline__place">{item.place}</p>
            {item.description && <p className="timeline__desc">{item.description}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}
