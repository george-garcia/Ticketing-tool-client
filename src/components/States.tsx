import type { ReactNode } from 'react'
import { Spinner } from './ui/Spinner'

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <Spinner className="h-7 w-7 text-brand-600" />
    </div>
  )
}

export function ErrorState({ message }: { message?: string }) {
  return (
    <div className="card p-10 text-center text-sm font-medium text-red-600">
      {message ?? 'Something went wrong. Please try again.'}
    </div>
  )
}

export function EmptyState({
  title,
  hint,
  icon,
}: {
  title: string
  hint?: string
  icon?: ReactNode
}) {
  return (
    <div className="card flex flex-col items-center justify-center gap-2 p-12 text-center">
      {icon && <div className="text-slate-300">{icon}</div>}
      <p className="font-medium text-slate-700">{title}</p>
      {hint && <p className="text-sm text-slate-400">{hint}</p>}
    </div>
  )
}
