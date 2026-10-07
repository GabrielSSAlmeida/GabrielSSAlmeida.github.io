import './Cover.css'

interface CoverProps {
  src?: string
  label: string
  className?: string
}

/** Post/series image. Without an image, renders a generated placeholder so cards stay consistent. */
export function Cover({ src, label, className = '' }: CoverProps) {
  if (src) {
    return <img className={`cover ${className}`} src={src} alt="" loading="lazy" />
  }
  return (
    <div className={`cover cover--placeholder ${className}`} aria-hidden>
      <span className="cover__label">{label}</span>
    </div>
  )
}
