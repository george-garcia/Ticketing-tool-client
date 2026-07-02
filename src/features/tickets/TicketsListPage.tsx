import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Inbox, Download } from 'lucide-react'
import { useGetTicketsQuery } from '../../store/ticketsApi'
import { useGetMeQuery } from '../../store/usersApi'
import { getView } from './views'
import { TicketsTable } from './components/TicketsTable'
import { BulkActionBar } from './components/BulkActionBar'
import { PageHeader } from '../../components/PageHeader'
import { Button } from '../../components/ui/Button'
import { LoadingState, ErrorState, EmptyState } from '../../components/States'
import { downloadTicketsCsv } from '../../lib/csv'

export default function TicketsListPage() {
  const { view: viewKey } = useParams()
  const view = getView(viewKey)
  const { data: me } = useGetMeQuery()
  const { data: tickets, isLoading, isError } = useGetTicketsQuery()
  const [selected, setSelected] = useState<Set<number>>(new Set())

  const canManage = me?.role === 'agent' || me?.role === 'admin'

  const filtered = useMemo(
    () => (tickets ?? []).filter((t) => view.filter(t, me?.id ?? -1)),
    [tickets, view, me],
  )

  // Keep the selection scoped to what's currently visible.
  const visibleSelected = useMemo(
    () => filtered.filter((t) => selected.has(t.id)).map((t) => t.id),
    [filtered, selected],
  )

  const toggle = (id: number) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const toggleAll = () =>
    setSelected((prev) => {
      const allShown = filtered.every((t) => prev.has(t.id))
      if (allShown) return new Set()
      return new Set(filtered.map((t) => t.id))
    })

  const clear = () => setSelected(new Set())

  const exportCsv = () =>
    downloadTicketsCsv(filtered, `${viewKey ?? 'tickets'}-${filtered.length}.csv`)

  return (
    <div>
      <PageHeader
        title={view.title}
        subtitle={view.subtitle}
        action={
          <Button variant="secondary" size="sm" onClick={exportCsv} disabled={filtered.length === 0}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        }
      />
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
        <>
          {canManage && visibleSelected.length > 0 && (
            <BulkActionBar ids={visibleSelected} onDone={clear} />
          )}
          <TicketsTable
            tickets={filtered}
            selectable={canManage}
            selectedIds={selected}
            onToggle={toggle}
            onToggleAll={toggleAll}
          />
        </>
      )}
    </div>
  )
}
