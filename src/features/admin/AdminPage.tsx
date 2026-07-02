import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useGetMeQuery } from '../../store/usersApi'
import { PageHeader } from '../../components/PageHeader'
import { LoadingState } from '../../components/States'
import { cn } from '../../lib/utils'
import { UsersAdmin } from './UsersAdmin'
import { TeamsAdmin } from './TeamsAdmin'
import { SlaSettings } from './SlaSettings'

const TABS = [
  { id: 'users', label: 'Users' },
  { id: 'teams', label: 'Teams' },
  { id: 'sla', label: 'SLA policy' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function AdminPage() {
  const { data: me, isLoading } = useGetMeQuery()
  const [tab, setTab] = useState<TabId>('users')

  if (isLoading) return <LoadingState />
  // Defense in depth: the nav link is admin-only, but guard the route directly too.
  if (me?.role !== 'admin') return <Navigate to="/dashboard" replace />

  return (
    <div>
      <PageHeader title="Admin" subtitle="Manage users, teams, and SLA policy" />

      <div className="mb-6 flex gap-1 border-b border-slate-200">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              '-mb-px border-b-2 px-4 py-2 text-sm font-medium transition',
              tab === t.id
                ? 'border-brand-600 text-brand-700'
                : 'border-transparent text-slate-500 hover:text-slate-700',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'users' && <UsersAdmin />}
      {tab === 'teams' && <TeamsAdmin />}
      {tab === 'sla' && <SlaSettings />}
    </div>
  )
}
