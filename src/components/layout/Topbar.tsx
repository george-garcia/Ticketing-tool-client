import { Link } from 'react-router-dom'
import { Plus, LogOut } from 'lucide-react'
import { Button } from '../ui/Button'
import { Avatar } from '../ui/Avatar'
import { useGetMeQuery } from '../../store/usersApi'
import { useSignOut } from '../../features/auth/useAuthActions'

export function Topbar() {
  const { data: me } = useGetMeQuery()
  const signOut = useSignOut()
  const fullName = me ? `${me.firstName} ${me.lastName}`.trim() || me.email : ''

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
      <Link to="/tickets/new">
        <Button size="sm">
          <Plus className="h-4 w-4" />
          New ticket
        </Button>
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/profile" className="flex items-center gap-2.5 rounded-lg p-1 transition hover:bg-slate-50" title="My profile">
          <Avatar name={fullName} src={me?.pictureUrl} className="h-9 w-9 text-sm" />
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">{fullName}</p>
            <p className="text-xs capitalize text-slate-500">{me?.role}</p>
          </div>
        </Link>
        <button
          onClick={signOut}
          className="btn btn-ghost p-2"
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
