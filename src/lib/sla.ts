import { differenceInHours } from 'date-fns'
import type { AppSettings, Ticket, TicketPriority } from '../types'
import { OPEN_STATUSES } from './ticket-meta'

export type SlaHours = Record<TicketPriority, number>

/** Fallback targets (hours) used until the server settings load. Admins can change these. */
export const DEFAULT_SLA_HOURS: SlaHours = {
  Critical: 4,
  Major: 24,
  Minor: 72,
}

/** Map the server settings row to per-priority hours (or defaults when unavailable). */
export function slaHoursFromSettings(
  s?: Pick<AppSettings, 'slaCriticalHours' | 'slaMajorHours' | 'slaMinorHours'> | null,
): SlaHours {
  if (!s) return DEFAULT_SLA_HOURS
  return { Critical: s.slaCriticalHours, Major: s.slaMajorHours, Minor: s.slaMinorHours }
}

export type SlaState = 'met' | 'on-track' | 'due-soon' | 'breached'

export interface SlaStatus {
  state: SlaState
  label: string
  /** Hours remaining until the deadline (negative if breached). Null for met/closed. */
  hoursLeft: number | null
}

const MET: SlaStatus = { state: 'met', label: 'Met', hoursLeft: null }

/** Derive SLA standing from a ticket's priority + age. Closed/resolved tickets are considered met. */
export function slaStatus(
  ticket: Ticket,
  hours: SlaHours = DEFAULT_SLA_HOURS,
  now: Date = new Date(),
): SlaStatus {
  if (!OPEN_STATUSES.includes(ticket.status)) return MET

  const budget = hours[ticket.priority]
  const elapsed = differenceInHours(now, new Date(ticket.createdAt))
  const hoursLeft = budget - elapsed

  if (hoursLeft < 0) return { state: 'breached', label: 'SLA breached', hoursLeft }
  if (hoursLeft <= budget * 0.25) return { state: 'due-soon', label: `Due in ${hoursLeft}h`, hoursLeft }
  return { state: 'on-track', label: `${hoursLeft}h left`, hoursLeft }
}

export const SLA_BADGE: Record<SlaState, string> = {
  met: 'bg-slate-100 text-slate-500 ring-1 ring-inset ring-slate-500/20',
  'on-track': 'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
  'due-soon': 'bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  breached: 'bg-red-100 text-red-700 ring-1 ring-inset ring-red-600/20',
}
