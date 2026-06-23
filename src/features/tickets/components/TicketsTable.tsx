import { useNavigate } from 'react-router-dom'
import { StatusBadge } from './StatusBadge'
import { PriorityBadge } from './PriorityBadge'
import { Avatar } from '../../../components/ui/Avatar'
import { fromNow } from '../../../lib/format'
import { userName } from '../../../lib/user'
import type { Ticket } from '../../../types'

/** Presentational, dense ticket table. Rows link to the ticket detail. */
export function TicketsTable({ tickets }: { tickets: Ticket[] }) {
  const navigate = useNavigate()

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3 font-semibold">ID</th>
            <th className="px-4 py-3 font-semibold">Subject</th>
            <th className="px-4 py-3 font-semibold">Requester</th>
            <th className="px-4 py-3 font-semibold">Assignee</th>
            <th className="px-4 py-3 font-semibold">Priority</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 font-semibold">Updated</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tickets.map((t) => (
            <tr
              key={t.id}
              onClick={() => navigate(`/tickets/${t.id}`)}
              className="cursor-pointer transition-colors hover:bg-slate-50"
            >
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-400">
                #{t.id}
              </td>
              <td className="px-4 py-3">
                <p className="line-clamp-1 font-medium text-slate-800">{t.title}</p>
                <p className="text-xs text-slate-400">{t.category}</p>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                {userName(t.createdBy)}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
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
              <td className="px-4 py-3">
                <PriorityBadge priority={t.priority} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={t.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-400">{fromNow(t.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
