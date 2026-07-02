import { useNavigate } from 'react-router-dom'
import { StatusBadge } from './StatusBadge'
import { PriorityBadge } from './PriorityBadge'
import { Avatar } from '../../../components/ui/Avatar'
import { fromNow } from '../../../lib/format'
import { userName } from '../../../lib/user'
import type { Ticket } from '../../../types'

interface Props {
  tickets: Ticket[]
  /** When set, a leading checkbox column is shown for bulk selection. */
  selectable?: boolean
  selectedIds?: Set<number>
  onToggle?: (id: number) => void
  onToggleAll?: () => void
}

/** Presentational, dense ticket table. Rows link to the ticket detail. */
export function TicketsTable({ tickets, selectable, selectedIds, onToggle, onToggleAll }: Props) {
  const navigate = useNavigate()
  const allSelected = selectable && tickets.length > 0 && tickets.every((t) => selectedIds?.has(t.id))

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            {selectable && (
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={Boolean(allSelected)}
                  onChange={onToggleAll}
                  className="h-4 w-4 cursor-pointer rounded border-slate-300"
                  aria-label="Select all"
                />
              </th>
            )}
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">ID</th>
            <th className="px-4 py-3 font-semibold">Subject</th>
            <th className="hidden px-4 py-3 font-semibold lg:table-cell">Requester</th>
            <th className="hidden px-4 py-3 font-semibold md:table-cell">Assignee</th>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">Priority</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="hidden px-4 py-3 font-semibold xl:table-cell">Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tickets.map((t) => (
            <tr
              key={t.id}
              onClick={() => navigate(`/tickets/${t.id}`)}
              className={`cursor-pointer transition-colors hover:bg-slate-50 ${
                selectedIds?.has(t.id) ? 'bg-brand-50/60' : ''
              }`}
            >
              {selectable && (
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds?.has(t.id) ?? false}
                    onChange={() => onToggle?.(t.id)}
                    className="h-4 w-4 cursor-pointer rounded border-slate-300"
                    aria-label={`Select ticket ${t.id}`}
                  />
                </td>
              )}
              <td className="hidden whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-400 sm:table-cell">
                #{t.id}
              </td>
              <td className="px-4 py-3">
                <p className="line-clamp-1 font-medium text-slate-800">{t.title}</p>
                <p className="text-xs text-slate-400">{t.category}</p>
              </td>
              <td className="hidden whitespace-nowrap px-4 py-3 text-slate-600 lg:table-cell">
                {userName(t.createdBy)}
              </td>
              <td className="hidden whitespace-nowrap px-4 py-3 md:table-cell">
                {t.assignedTo ? (
                  <div className="flex items-center gap-2">
                    <Avatar
                      name={userName(t.assignedTo)}
                      src={t.assignedTo.pictureUrl}
                      className="h-6 w-6 text-[10px]"
                    />
                    <span className="text-slate-600">{userName(t.assignedTo)}</span>
                  </div>
                ) : (
                  <span className="text-slate-400">Unassigned</span>
                )}
              </td>
              <td className="hidden px-4 py-3 sm:table-cell">
                <PriorityBadge priority={t.priority} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={t.status} />
              </td>
              <td className="hidden whitespace-nowrap px-4 py-3 text-slate-400 xl:table-cell">{fromNow(t.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
