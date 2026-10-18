import { githubUrl, site } from '../site.config'
import { Logo } from './Logo'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer border-top border-soft">
      <div className="footer__inner d-flex flex-wrap align-items-center justify-content-between mx-auto">
        <Logo />
        <p className="footer__text m-0 font-monospace text-body-tertiary">
          © {new Date().getFullYear()} {site.name} ·{' '}
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a> ·{' '}
          <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </p>
      </div>
    </footer>
  )
}
