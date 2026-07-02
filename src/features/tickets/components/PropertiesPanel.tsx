import type { ReactNode } from 'react'
import { Select } from '../../../components/ui/Select'
import {
  TICKET_STATUSES,
  TICKET_PRIORITIES,
  TICKET_IMPACTS,
  TICKET_CATEGORIES,
} from '../../../lib/ticket-meta'
import { userName } from '../../../lib/user'
import type { Ticket, UpdateTicketInput, User } from '../../../types'

interface Props {
  ticket: Ticket
  users: User[]
  onChange: (changes: UpdateTicketInput) => void
  disabled?: boolean
  /** When true, the panel is shown read-only (requester view) with an explanatory note. */
  readOnly?: boolean
}

/** Editable ticket properties. Emits changes to the parent (container) on each edit. */
export function PropertiesPanel({ ticket, users, onChange, disabled, readOnly }: Props) {
  return (
    <div className="card space-y-4 p-5">
      <h3 className="text-sm font-semibold text-slate-900">Properties</h3>
      {readOnly && (
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
          Read-only. Only agents and admins can change these.
        </p>
      )}

      <Field label="Status">
        <Select
          value={ticket.status}
          disabled={disabled}
          onChange={(e) => onChange({ status: e.target.value as Ticket['status'] })}
        >
          {TICKET_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Priority">
        <Select
          value={ticket.priority}
          disabled={disabled}
          onChange={(e) => onChange({ priority: e.target.value as Ticket['priority'] })}
        >
          {TICKET_PRIORITIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Impact">
        <Select
          value={ticket.impact}
          disabled={disabled}
          onChange={(e) => onChange({ impact: e.target.value as Ticket['impact'] })}
        >
          {TICKET_IMPACTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Category">
        <Select
          value={ticket.category}
          disabled={disabled}
          onChange={(e) => onChange({ category: e.target.value as Ticket['category'] })}
        >
          {TICKET_CATEGORIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Assignee">
        <Select
          value={ticket.assignedToId ?? ''}
          disabled={disabled}
          onChange={(e) =>
            onChange({ assignedToId: e.target.value ? Number(e.target.value) : null })
          }
        >
          <option value="">Unassigned</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {userName(u)}
            </option>
          ))}
        </Select>
      </Field>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  )
}
