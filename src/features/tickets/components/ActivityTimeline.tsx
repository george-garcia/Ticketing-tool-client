import { useMemo } from 'react'
import { CirclePlus, ArrowRightLeft, UserCheck, AlertCircle, Tag, Layers } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Avatar } from '../../../components/ui/Avatar'
import { fromNow } from '../../../lib/format'
import { userName } from '../../../lib/user'
import type { Comment, TicketEvent } from '../../../types'

type Item =
  | { kind: 'comment'; at: string; data: Comment }
  | { kind: 'event'; at: string; data: TicketEvent }

const FIELD_ICON: Record<string, LucideIcon> = {
  created: CirclePlus,
  status: ArrowRightLeft,
  priority: AlertCircle,
  impact: Layers,
  category: Tag,
  assignee: UserCheck,
}

/** A human sentence for a changelog event. */
function eventText(e: TicketEvent): string {
  const who = e.actor ? userName(e.actor) : 'Someone'
  switch (e.field) {
    case 'created':
      return `${who} created this ticket`
    case 'assignee':
      return e.toValue && e.toValue !== 'Unassigned'
        ? `${who} assigned this to ${e.toValue}`
        : `${who} unassigned this ticket`
    default:
      return `${who} changed ${e.field} from ${e.fromValue ?? '—'} to ${e.toValue ?? '—'}`
  }
}

export function ActivityTimeline({
  comments,
  events = [],
}: {
  comments: Comment[]
  events?: TicketEvent[]
}) {
  const items = useMemo<Item[]>(() => {
    const merged: Item[] = [
      ...comments.map((c) => ({ kind: 'comment' as const, at: c.createdAt, data: c })),
      ...events.map((e) => ({ kind: 'event' as const, at: e.createdAt, data: e })),
    ]
    return merged.sort((a, b) => +new Date(a.at) - +new Date(b.at))
  }, [comments, events])

  if (items.length === 0) {
    return <p className="text-sm text-slate-400">No activity yet — add the first comment below.</p>
  }

  return (
    <ol className="space-y-5">
      {items.map((item) => {
        if (item.kind === 'comment') {
          const c = item.data
          return (
            <li key={`c-${c.id}`} className="flex gap-3">
              <Avatar name={userName(c.author)} src={c.author?.pictureUrl} className="h-8 w-8 shrink-0 text-xs" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800">{userName(c.author)}</span>
                  <span className="text-xs text-slate-400">{fromNow(c.createdAt)}</span>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{c.body}</p>
              </div>
            </li>
          )
        }
        const e = item.data
        const Icon = FIELD_ICON[e.field] ?? ArrowRightLeft
        return (
          <li key={`e-${e.id}`} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Icon className="h-4 w-4" />
            </span>
            <p className="text-sm text-slate-500">
              {eventText(e)}
              <span className="ml-2 text-xs text-slate-400">{fromNow(e.createdAt)}</span>
            </p>
          </li>
        )
      })}
    </ol>
  )
}
