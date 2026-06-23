export type TicketStatus = 'Open' | 'Assigned' | 'Pending' | 'In progress' | 'Resolved' | 'Closed'
export type TicketPriority = 'Minor' | 'Major' | 'Critical'
export type TicketImpact = 'Low' | 'Medium' | 'High'
export type TicketCategory = 'Incident' | 'Problem' | 'Major Incident'
export type UserRole = 'user' | 'agent' | 'admin'

export interface User {
  id: number
  cognitoSub: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  pictureUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: number
  ticketId: number
  authorId: number
  body: string
  createdAt: string
  author?: User
}

export interface Ticket {
  id: number
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  impact: TicketImpact
  category: TicketCategory
  contact: string | null
  product: string | null
  createdById: number
  assignedToId: number | null
  createdAt: string
  updatedAt: string
  createdBy?: User
  assignedTo?: User | null
  comments?: Comment[]
}

export interface CreateTicketInput {
  title: string
  description: string
  status?: TicketStatus
  priority?: TicketPriority
  impact?: TicketImpact
  category?: TicketCategory
  contact?: string
  product?: string
  assignedToId?: number | null
  comment?: string
}

export type UpdateTicketInput = Partial<Omit<CreateTicketInput, 'comment'>>

export interface TicketFilters {
  status?: TicketStatus
  assignedToId?: number
}
