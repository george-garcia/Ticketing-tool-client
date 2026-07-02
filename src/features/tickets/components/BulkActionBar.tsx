import { useState } from 'react'
import { X } from 'lucide-react'
import {
  useBulkUpdateTicketsMutation,
  useBulkDeleteTicketsMutation,
} from '../../../store/ticketsApi'
import { useGetUsersQuery } from '../../../store/usersApi'
import { Select } from '../../../components/ui/Select'
import { Button } from '../../../components/ui/Button'
import { TICKET_STATUSES } from '../../../lib/ticket-meta'
import { userName } from '../../../lib/user'
import type { TicketStatus } from '../../../types'

interface Props {
  ids: number[]
  onDone: () => void
}

/** Sticky toolbar shown when tickets are selected. Applies one change to the whole batch. */
export function BulkActionBar({ ids, onDone }: Props) {
  const { data: users } = useGetUsersQuery()
  const [bulkUpdate, { isLoading: updating }] = useBulkUpdateTicketsMutation()
  const [bulkDelete, { isLoading: deleting }] = useBulkDeleteTicketsMutation()
  const [status, setStatus] = useState('')
  const [assignee, setAssignee] = useState('')

  const busy = updating || deleting

  const applyStatus = async (value: string) => {
    setStatus(value)
    if (!value) return
    await bulkUpdate({ ids, changes: { status: value as TicketStatus } }).unwrap()
    setStatus('')
    onDone()
  }

  const applyAssignee = async (value: string) => {
    setAssignee(value)
    if (value === '') return
    await bulkUpdate({
      ids,
      changes: { assignedToId: value === 'unassign' ? null : Number(value) },
    }).unwrap()
    setAssignee('')
    onDone()
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${ids.length} ticket(s)? This cannot be undone.`)) return
    await bulkDelete({ ids }).unwrap()
    onDone()
  }

  return (
    <div className="sticky top-4 z-10 mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-brand-200 bg-white p-3 shadow-sm">
      <span className="text-sm font-semibold text-slate-700">{ids.length} selected</span>

      <Select
        value={status}
        disabled={busy}
        onChange={(e) => applyStatus(e.target.value)}
        className="w-auto"
      >
        <option value="">Set status…</option>
        {TICKET_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>

      <Select
        value={assignee}
        disabled={busy}
        onChange={(e) => applyAssignee(e.target.value)}
        className="w-auto"
      >
        <option value="">Assign to…</option>
        <option value="unassign">Unassigned</option>
        {(users ?? []).map((u) => (
          <option key={u.id} value={u.id}>
            {userName(u)}
          </option>
        ))}
      </Select>

      <Button variant="danger" onClick={handleDelete} isLoading={deleting} disabled={busy}>
        Delete
      </Button>

      <button
        onClick={onDone}
        className="ml-auto inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
      >
        <X className="h-4 w-4" /> Clear
      </button>
    </div>
  )
}
