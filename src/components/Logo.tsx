import { Link } from 'react-router'
import './Logo.css'

export function Logo() {
  return (
    <Link to="/" className="logo font-monospace fw-bold text-decoration-none text-nowrap" aria-label="Gabriel Almeida, home">
      <span className="text-primary">GABRIEL</span>
      <span className="logo__sep text-primary">_</span>
      ALMEIDA
    </Link>
  )
}
