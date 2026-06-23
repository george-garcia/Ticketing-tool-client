import { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
