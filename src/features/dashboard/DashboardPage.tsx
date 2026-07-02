import { useMemo, useState } from 'react'
import { Inbox, Ticket as TicketIcon, UserCheck, ShieldAlert, X } from 'lucide-react'
import { useTicketStats } from './useTicketStats'
import { StatCard } from './components/StatCard'
import { StatusBarChart } from './components/StatusBarChart'
import { PriorityDonut } from './components/PriorityDonut'
import { TrendChart } from './components/TrendChart'
import { AgentWorkload } from './components/AgentWorkload'
import { TicketsTable } from '../tickets/components/TicketsTable'
import { PageHeader } from '../../components/PageHeader'
import { Card } from '../../components/ui/Card'
import { LoadingState, ErrorState } from '../../components/States'
import { slaStatus } from '../../lib/sla'
import type { TicketPriority, TicketStatus } from '../../types'

export default function DashboardPage() {
  const { stats, tickets, isLoading, isError } = useTicketStats()
  const [status, setStatus] = useState<TicketStatus | null>(null)
  const [priority, setPriority] = useState<TicketPriority | null>(null)

  const hasFilter = status !== null || priority !== null

  const slaBreaches = useMemo(
    () => tickets.filter((t) => slaStatus(t).state === 'breached').length,
    [tickets],
  )

  // Click a chart segment to filter; click the same segment again to clear it.
  const filtered = useMemo(() => {
    const list = tickets.filter(
      (t) => (!status || t.status === status) && (!priority || t.priority === priority),
    )
    return [...list].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
  }, [tickets, status, priority])

  const listShown = hasFilter ? filtered : filtered.slice(0, 5)

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState />

  const filterLabel = [status, priority && `${priority} priority`].filter(Boolean).join(' · ')

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Service desk overview" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open tickets" value={stats.open} icon={Inbox} accent="bg-sky-50 text-sky-600" />
        <StatCard
          label="Unassigned"
          value={stats.unassigned}
          icon={TicketIcon}
          accent="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          label="Assigned to me"
          value={stats.myOpen}
          icon={UserCheck}
          accent="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          label="SLA breached"
          value={slaBreaches}
          icon={ShieldAlert}
          accent="bg-red-50 text-red-600"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-1 text-sm font-semibold text-slate-900">Tickets by status</h3>
          <p className="mb-3 text-xs text-slate-400">Click a bar to filter the list below.</p>
          <StatusBarChart
            data={stats.statusCounts}
            active={status}
            onSelect={(s) => setStatus((cur) => (cur === s ? null : s))}
          />
        </Card>
        <Card className="p-5">
          <h3 className="mb-1 text-sm font-semibold text-slate-900">By priority</h3>
          <p className="mb-3 text-xs text-slate-400">Click a slice to filter.</p>
          <PriorityDonut
            data={stats.priorityCounts}
            active={priority}
            onSelect={(p) => setPriority((cur) => (cur === p ? null : p))}
          />
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Tickets created (14 days)</h3>
          <TrendChart data={stats.trend} />
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Agent workload</h3>
          <AgentWorkload tickets={tickets} />
        </Card>
      </div>

      <div className="mt-6">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">
              {hasFilter ? 'Filtered tickets' : 'Recently updated'}
            </h3>
            {hasFilter && (
              <button
                onClick={() => {
                  setStatus(null)
                  setPriority(null)
                }}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 hover:bg-slate-200"
              >
                {filterLabel}
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          {listShown.length ? (
            <TicketsTable tickets={listShown} />
          ) : (
            <Card className="p-8 text-center text-sm text-slate-400">
              No tickets match this filter.
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
