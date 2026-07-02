import type { Ticket } from '../types'
import { userName } from './user'

/** Quote a CSV cell, escaping embedded quotes and wrapping when it contains a delimiter. */
function cell(value: unknown): string {
  const s = value == null ? '' : String(value)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

const COLUMNS: { header: string; get: (t: Ticket) => unknown }[] = [
  { header: 'ID', get: (t) => t.id },
  { header: 'Subject', get: (t) => t.title },
  { header: 'Status', get: (t) => t.status },
  { header: 'Priority', get: (t) => t.priority },
  { header: 'Impact', get: (t) => t.impact },
  { header: 'Category', get: (t) => t.category },
  { header: 'Requester', get: (t) => userName(t.createdBy) },
  { header: 'Assignee', get: (t) => (t.assignedTo ? userName(t.assignedTo) : 'Unassigned') },
  { header: 'Product', get: (t) => t.product ?? '' },
  { header: 'Created', get: (t) => t.createdAt },
  { header: 'Updated', get: (t) => t.updatedAt },
]

/** Build a CSV string from tickets (header row + one row per ticket). */
export function ticketsToCsv(tickets: Ticket[]): string {
  const header = COLUMNS.map((c) => c.header).join(',')
  const rows = tickets.map((t) => COLUMNS.map((c) => cell(c.get(t))).join(','))
  return [header, ...rows].join('\n')
}

/** Trigger a browser download of the given tickets as a CSV file. */
export function downloadTicketsCsv(tickets: Ticket[], filename = 'tickets.csv'): void {
  const blob = new Blob([ticketsToCsv(tickets)], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
