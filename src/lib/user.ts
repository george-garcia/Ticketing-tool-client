import type { User } from '../types'

/** Human-friendly display name with email fallback. */
export function userName(user?: Pick<User, 'firstName' | 'lastName' | 'email'> | null): string {
  if (!user) return '—'
  const full = `${user.firstName} ${user.lastName}`.trim()
  return full || user.email
}
