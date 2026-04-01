import './ui.css'

export default function PriceTag({ value, size = 'md', className = '' }) {
  return (
    <span className={`price-tag price-tag--${size} ${className}`}>
      {value}
    </span>
  )
}
