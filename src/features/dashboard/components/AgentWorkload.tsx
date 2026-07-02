import { useMemo } from 'react'
import { Avatar } from '../../../components/ui/Avatar'
import { userName } from '../../../lib/user'
import { OPEN_STATUSES } from '../../../lib/ticket-meta'
import type { Ticket, User } from '../../../types'

/** Open-ticket load per assignee, busiest first — a quick read on who's overloaded. */
export function AgentWorkload({ tickets }: { tickets: Ticket[] }) {
  const rows = useMemo(() => {
    const byAgent = new Map<number, { user: User; count: number }>()
    for (const t of tickets) {
      if (!t.assignedTo || !OPEN_STATUSES.includes(t.status)) continue
      const entry = byAgent.get(t.assignedTo.id)
      if (entry) entry.count += 1
      else byAgent.set(t.assignedTo.id, { user: t.assignedTo, count: 1 })
    }
    return [...byAgent.values()].sort((a, b) => b.count - a.count).slice(0, 6)
  }, [tickets])

  if (rows.length === 0) {
    return <p className="py-8 text-center text-sm text-slate-400">No assigned open tickets.</p>
  }

  const max = Math.max(...rows.map((r) => r.count))

  return (
    <ul className="space-y-3">
      {rows.map(({ user, count }) => (
        <li key={user.id} className="flex items-center gap-3">
          <Avatar name={userName(user)} src={user.pictureUrl} className="h-8 w-8 shrink-0 text-xs" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-medium text-slate-700">{userName(user)}</span>
              <span className="shrink-0 text-xs font-semibold text-slate-500">{count} open</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-brand-500"
                style={{ width: `${Math.round((count / max) * 100)}%` }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
