import { Inbox, Ticket as TicketIcon, UserCheck, AlertTriangle } from 'lucide-react'
import { useTicketStats } from './useTicketStats'
import { StatCard } from './components/StatCard'
import { StatusBarChart } from './components/StatusBarChart'
import { PriorityDonut } from './components/PriorityDonut'
import { TrendChart } from './components/TrendChart'
import { TicketsTable } from '../tickets/components/TicketsTable'
import { PageHeader } from '../../components/PageHeader'
import { Card } from '../../components/ui/Card'
import { LoadingState, ErrorState } from '../../components/States'

export default function DashboardPage() {
  const { stats, tickets, isLoading, isError } = useTicketStats()

  if (isLoading) return <LoadingState />
  if (isError) return <ErrorState />

  const recent = [...tickets]
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
    .slice(0, 5)

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
          label="Overdue (24h+)"
          value={stats.overdue}
          icon={AlertTriangle}
          accent="bg-red-50 text-red-600"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Tickets by status</h3>
          <StatusBarChart data={stats.statusCounts} />
        </Card>
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">By priority</h3>
          <PriorityDonut data={stats.priorityCounts} />
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Tickets created (14 days)</h3>
          <TrendChart data={stats.trend} />
        </Card>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Recently updated</h3>
          {recent.length ? (
            <TicketsTable tickets={recent} />
          ) : (
            <Card className="p-8 text-center text-sm text-slate-400">No tickets yet.</Card>
          )}
        </div>
      </div>
    </div>
  )
}
