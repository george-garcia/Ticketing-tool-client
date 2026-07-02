import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Inbox,
  Ticket,
  UserCheck,
  CircleDot,
  Loader2,
  Clock,
  CheckCircle2,
  Search,
  type LucideIcon,
} from 'lucide-react'
import { Logo } from '../ui/Logo'
import { Avatar } from '../ui/Avatar'
import { cn } from '../../lib/utils'
import { useGetMeQuery } from '../../store/usersApi'
import { userName } from '../../lib/user'
import type { UserRole } from '../../types'

interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
}

const NAV: NavItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/tickets', label: 'All tickets', icon: Inbox, end: true },
  { to: '/views/unassigned', label: 'Unassigned', icon: Ticket },
  { to: '/views/mine', label: 'Assigned to me', icon: UserCheck },
  { to: '/views/open', label: 'Open', icon: CircleDot },
  { to: '/views/in-progress', label: 'In progress', icon: Loader2 },
  { to: '/views/pending', label: 'Pending', icon: Clock },
  { to: '/views/solved', label: 'Solved', icon: CheckCircle2 },
  { to: '/search', label: 'Search', icon: Search },
]

const ROLE_BADGE: Record<UserRole, { label: string; className: string }> = {
  admin: { label: 'Admin', className: 'bg-violet-500/20 text-violet-200' },
  agent: { label: 'Agent', className: 'bg-brand-500/20 text-brand-200' },
  user: { label: 'Requester', className: 'bg-white/10 text-white/60' },
}

export function Sidebar() {
  const { data: me } = useGetMeQuery()
  const badge = me ? ROLE_BADGE[me.role] : null

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-sidebar md:flex">
      <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
        <Logo className="h-8 w-8" />
        <span className="font-bold text-white">Help Desk Hero</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => cn('nav-item', isActive && 'nav-item-active')}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      {me && (
        <div className="flex items-center gap-3 border-t border-white/10 p-4">
          <Avatar name={userName(me)} src={me.pictureUrl} className="h-9 w-9 text-xs" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{userName(me)}</p>
            <p className="truncate text-xs text-white/40">{me.email}</p>
          </div>
          {badge && (
            <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', badge.className)}>
              {badge.label}
            </span>
          )}
        </div>
      )}
    </aside>
  )
}
