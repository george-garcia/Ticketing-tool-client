import type { LucideIcon } from 'lucide-react'
import { cn } from '../../../lib/utils'

interface Props {
  label: string
  value: number
  icon: LucideIcon
  accent?: string
}

export function StatCard({ label, value, icon: Icon, accent = 'bg-brand-50 text-brand-600' }: Props) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <div className={cn('flex h-11 w-11 items-center justify-center rounded-lg', accent)}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  )
}
