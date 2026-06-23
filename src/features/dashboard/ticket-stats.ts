import { differenceInHours, subDays, format } from 'date-fns'
import type { Ticket, TicketStatus, TicketPriority } from '../../types'
import { OPEN_STATUSES, TICKET_STATUSES, TICKET_PRIORITIES } from '../../lib/ticket-meta'

const OVERDUE_HOURS = 24
const TREND_DAYS = 14

export interface DashboardStats {
  total: number
  open: number
  unassigned: number
  myOpen: number
  overdue: number
  statusCounts: { status: TicketStatus; count: number }[]
  priorityCounts: { priority: TicketPriority; count: number }[]
  trend: { date: string; created: number }[]
}

const isOpen = (t: Ticket) => OPEN_STATUSES.includes(t.status)

/** Pure aggregation — no React, fully testable. */
export function computeStats(tickets: Ticket[], currentUserId: number): DashboardStats {
  const open = tickets.filter(isOpen).length
  const unassigned = tickets.filter((t) => isOpen(t) && !t.assignedToId).length
  const myOpen = tickets.filter((t) => isOpen(t) && t.assignedToId === currentUserId).length
  const overdue = tickets.filter(
    (t) => isOpen(t) && differenceInHours(new Date(), new Date(t.createdAt)) > OVERDUE_HOURS,
  ).length

  const statusCounts = TICKET_STATUSES.map((status) => ({
    status,
    count: tickets.filter((t) => t.status === status).length,
  }))
  const priorityCounts = TICKET_PRIORITIES.map((priority) => ({
    priority,
    count: tickets.filter((t) => t.priority === priority).length,
  }))

  const trend: { date: string; created: number }[] = []
  for (let i = TREND_DAYS - 1; i >= 0; i--) {
    const day = subDays(new Date(), i)
    const key = format(day, 'yyyy-MM-dd')
    trend.push({
      date: format(day, 'MMM d'),
      created: tickets.filter((t) => format(new Date(t.createdAt), 'yyyy-MM-dd') === key).length,
    })
  }

  return { total: tickets.length, open, unassigned, myOpen, overdue, statusCounts, priorityCounts, trend }
}
