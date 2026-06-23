import { useMemo, useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { useGetTicketsQuery } from '../../store/ticketsApi'
import { TicketsTable } from '../tickets/components/TicketsTable'
import { PageHeader } from '../../components/PageHeader'
import { Input } from '../../components/ui/Input'
import { LoadingState, ErrorState, EmptyState } from '../../components/States'
import { userName } from '../../lib/user'

export default function SearchPage() {
  const [q, setQ] = useState('')
  const { data: tickets, isLoading, isError } = useGetTicketsQuery()
  const term = q.trim().toLowerCase()

  const results = useMemo(() => {
    if (!term) return []
    return (tickets ?? []).filter((t) =>
      [
        String(t.id),
        t.title,
        t.description,
        t.product ?? '',
        userName(t.createdBy),
        userName(t.assignedTo),
      ]
        .join(' ')
        .toLowerCase()
        .includes(term),
    )
  }, [tickets, term])

  return (
    <div>
      <PageHeader title="Search" subtitle="Find tickets by subject, description, id, or person" />
      <div className="mb-6 max-w-xl">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tickets…"
          autoFocus
        />
      </div>
      {isLoading ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState />
      ) : !term ? (
        <EmptyState title="Start typing to search" icon={<SearchIcon className="h-10 w-10" />} />
      ) : results.length === 0 ? (
        <EmptyState title={`No results for “${q}”`} />
      ) : (
        <TicketsTable tickets={results} />
      )}
    </div>
  )
}
