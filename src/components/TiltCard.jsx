import { useTilt } from '../lib/useTilt'

export default function TiltCard({ children, className = '', strength = 8, as: Tag = 'div' }) {
  const ref = useTilt(strength)
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
