import type { Ticket } from '../../types'
import { OPEN_STATUSES } from '../../lib/ticket-meta'

export interface TicketView {
  key: string
  title: string
  subtitle: string
  filter: (ticket: Ticket, currentUserId: number) => boolean
}

/** Saved views, à la Zendesk/ServiceNow. Filtering is client-side (demo-scale dataset). */
export const TICKET_VIEWS: Record<string, TicketView> = {
  all: {
    key: 'all',
    title: 'All tickets',
    subtitle: 'Every ticket in the system',
    filter: () => true,
  },
  unassigned: {
    key: 'unassigned',
    title: 'Unassigned',
    subtitle: 'Open tickets with no assignee',
    filter: (t) => !t.assignedToId && OPEN_STATUSES.includes(t.status),
  },
  mine: {
    key: 'mine',
    title: 'Assigned to me',
    subtitle: 'Your open work',
    filter: (t, uid) => t.assignedToId === uid && OPEN_STATUSES.includes(t.status),
  },
  open: {
    key: 'open',
    title: 'Open',
    subtitle: 'Newly opened tickets',
    filter: (t) => t.status === 'Open',
  },
  'in-progress': {
    key: 'in-progress',
    title: 'In progress',
    subtitle: 'Currently being worked on',
    filter: (t) => t.status === 'In progress',
  },
  pending: {
    key: 'pending',
    title: 'Pending',
    subtitle: 'Waiting on a response',
    filter: (t) => t.status === 'Pending',
  },
  solved: {
    key: 'solved',
    title: 'Solved',
    subtitle: 'Resolved or closed',
    filter: (t) => t.status === 'Resolved' || t.status === 'Closed',
  },
}

export function getView(key: string | undefined): TicketView {
  return (key && TICKET_VIEWS[key]) || TICKET_VIEWS.all
}
