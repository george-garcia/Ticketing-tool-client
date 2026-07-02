import type { CreateTicketInput } from '../../types'

export interface TicketTemplate {
  id: string
  label: string
  emoji: string
  values: Pick<CreateTicketInput, 'title' | 'description' | 'priority' | 'impact' | 'category'>
}

/** Common IT-desk request shapes. Picking one pre-fills the form; every field stays editable. */
export const TICKET_TEMPLATES: TicketTemplate[] = [
  {
    id: 'password-reset',
    label: 'Password reset',
    emoji: '🔑',
    values: {
      title: 'Password reset request',
      description: 'User is locked out and needs their account password reset. Confirm identity before resetting.',
      priority: 'Minor',
      impact: 'Low',
      category: 'Incident',
    },
  },
  {
    id: 'new-hire',
    label: 'New hire onboarding',
    emoji: '🧑‍💼',
    values: {
      title: 'New hire account provisioning',
      description: 'Provision email, VPN, and app access for a new starter. Include start date and team in a comment.',
      priority: 'Major',
      impact: 'Medium',
      category: 'Problem',
    },
  },
  {
    id: 'hardware',
    label: 'Hardware failure',
    emoji: '💻',
    values: {
      title: 'Hardware not working',
      description: 'Device (laptop / monitor / peripheral) is failing or unresponsive. Note the asset tag and symptoms.',
      priority: 'Major',
      impact: 'Medium',
      category: 'Incident',
    },
  },
  {
    id: 'access-request',
    label: 'Access request',
    emoji: '🔐',
    values: {
      title: 'Application access request',
      description: 'User needs access to an application or shared resource. State the system and required permission level.',
      priority: 'Minor',
      impact: 'Low',
      category: 'Incident',
    },
  },
  {
    id: 'network',
    label: 'Network / VPN',
    emoji: '📶',
    values: {
      title: 'Network or VPN connectivity issue',
      description: 'User cannot connect to the network or VPN. Capture location, error message, and whether others are affected.',
      priority: 'Major',
      impact: 'High',
      category: 'Incident',
    },
  },
  {
    id: 'outage',
    label: 'Service outage',
    emoji: '🚨',
    values: {
      title: 'Service outage affecting multiple users',
      description: 'A shared service is down or degraded for several users. Escalate and record scope and start time.',
      priority: 'Critical',
      impact: 'High',
      category: 'Major Incident',
    },
  },
]
