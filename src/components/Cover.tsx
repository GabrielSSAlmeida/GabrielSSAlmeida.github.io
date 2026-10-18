import './Cover.css'

interface CoverProps {
  src?: string
  label: string
  className?: string
}

/** Post/series image. Without an image, renders a generated placeholder so cards stay consistent. */
export function Cover({ src, label, className = '' }: CoverProps) {
  if (src) {
    return <img className={`d-block w-100 h-100 object-fit-cover ${className}`} src={src} alt="" loading="lazy" />
  }
  return (
    <div className={`cover-placeholder d-grid w-100 h-100 overflow-hidden bg-body-secondary ${className}`} aria-hidden>
      <span className="cover-placeholder__label font-monospace fw-bold text-center text-body-tertiary">{label}</span>
    </div>
  )
}
