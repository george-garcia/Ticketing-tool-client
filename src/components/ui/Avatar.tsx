import { cn, initials } from '../../lib/utils'

interface AvatarProps {
  name: string
  src?: string | null
  className?: string
}

export function Avatar({ name, src, className }: AvatarProps) {
  if (src) {
    return <img src={src} alt={name} className={cn('rounded-full object-cover', className)} />
  }
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold',
        className,
      )}
      aria-hidden="true"
    >
      {initials(name) || '?'}
    </div>
  )
}
