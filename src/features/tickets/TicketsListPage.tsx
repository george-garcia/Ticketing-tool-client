import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Inbox } from 'lucide-react'
import { useGetTicketsQuery } from '../../store/ticketsApi'
import { useGetMeQuery } from '../../store/usersApi'
import { getView } from './views'
import { TicketsTable } from './components/TicketsTable'
import { PageHeader } from '../../components/PageHeader'
import { LoadingState, ErrorState, EmptyState } from '../../components/States'

export default function TicketsListPage() {
  const { view: viewKey } = useParams()
  const view = getView(viewKey)
  const { data: me } = useGetMeQuery()
  const { data: tickets, isLoading, isError } = useGetTicketsQuery()

  const filtered = useMemo(
    () => (tickets ?? []).filter((t) => view.filter(t, me?.id ?? -1)),
    [tickets, view, me],
  )

  return (
    <div>
      <PageHeader title={view.title} subtitle={view.subtitle} />
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No tickets here"
          hint="Nothing matches this view yet."
          icon={<Inbox className="h-10 w-10" />}
        />
      ) : (
        <TicketsTable tickets={filtered} />
      )}
    </div>
  )
}
