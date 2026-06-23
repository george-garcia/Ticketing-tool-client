import type { TicketStatus, TicketPriority, TicketImpact, TicketCategory } from '../types'

export const TICKET_STATUSES: TicketStatus[] = [
  'Open',
  'Assigned',
  'Pending',
  'In progress',
  'Resolved',
  'Closed',
]
export const TICKET_PRIORITIES: TicketPriority[] = ['Minor', 'Major', 'Critical']
export const TICKET_IMPACTS: TicketImpact[] = ['Low', 'Medium', 'High']
export const TICKET_CATEGORIES: TicketCategory[] = ['Incident', 'Problem', 'Major Incident']

/** Statuses considered "open" (still need work). */
export const OPEN_STATUSES: TicketStatus[] = ['Open', 'Assigned', 'Pending', 'In progress']

export const STATUS_BADGE: Record<TicketStatus, string> = {
  Open: 'bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-600/20',
  Assigned: 'bg-indigo-100 text-indigo-700 ring-1 ring-inset ring-indigo-600/20',
  Pending: 'bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-600/20',
  'In progress': 'bg-violet-100 text-violet-700 ring-1 ring-inset ring-violet-600/20',
  Resolved: 'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
  Closed: 'bg-slate-200 text-slate-600 ring-1 ring-inset ring-slate-500/20',
}

export const PRIORITY_BADGE: Record<TicketPriority, string> = {
  Minor: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/20',
  Major: 'bg-orange-100 text-orange-700 ring-1 ring-inset ring-orange-600/20',
  Critical: 'bg-red-100 text-red-700 ring-1 ring-inset ring-red-600/20',
}

export const STATUS_COLOR: Record<TicketStatus, string> = {
  Open: '#0ea5e9',
  Assigned: '#6366f1',
  Pending: '#f59e0b',
  'In progress': '#8b5cf6',
  Resolved: '#10b981',
  Closed: '#94a3b8',
}

export const PRIORITY_COLOR: Record<TicketPriority, string> = {
  Minor: '#94a3b8',
  Major: '#f97316',
  Critical: '#ef4444',
}
