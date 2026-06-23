import { useMemo } from 'react'
import { useGetTicketsQuery } from '../../store/ticketsApi'
import { useGetMeQuery } from '../../store/usersApi'
import { computeStats } from './ticket-stats'

/** Container hook: pulls tickets + current user and derives dashboard stats. */
export function useTicketStats() {
  const { data: tickets, isLoading, isError } = useGetTicketsQuery()
  const { data: me } = useGetMeQuery()
  const stats = useMemo(() => computeStats(tickets ?? [], me?.id ?? -1), [tickets, me])
  return { stats, tickets: tickets ?? [], isLoading, isError }
}
