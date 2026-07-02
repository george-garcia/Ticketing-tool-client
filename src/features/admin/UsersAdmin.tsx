import { Trash2 } from 'lucide-react'
import {
  useGetUsersQuery,
  useGetMeQuery,
  useUpdateUserRoleMutation,
  useAssignUserTeamMutation,
  useDeleteUserMutation,
} from '../../store/usersApi'
import { useGetTeamsQuery } from '../../store/teamsApi'
import { Card } from '../../components/ui/Card'
import { Select } from '../../components/ui/Select'
import { Avatar } from '../../components/ui/Avatar'
import { LoadingState } from '../../components/States'
import { userName } from '../../lib/user'
import type { UserRole } from '../../types'

const ROLES: UserRole[] = ['user', 'agent', 'admin']

export function UsersAdmin() {
  const { data: users, isLoading } = useGetUsersQuery()
  const { data: teams } = useGetTeamsQuery()
  const { data: me } = useGetMeQuery()
  const [updateRole] = useUpdateUserRoleMutation()
  const [assignTeam] = useAssignUserTeamMutation()
  const [deleteUser] = useDeleteUserMutation()

  if (isLoading) return <LoadingState />

  const remove = (id: number, name: string) => {
    if (window.confirm(`Delete ${name}? Their tickets remain but are unassigned from them.`)) {
      deleteUser(id)
    }
  }

  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3 font-semibold">User</th>
            <th className="px-4 py-3 font-semibold">Role</th>
            <th className="px-4 py-3 font-semibold">Team</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {(users ?? []).map((u) => {
            const isSelf = u.id === me?.id
            return (
              <tr key={u.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={userName(u)} src={u.pictureUrl} className="h-8 w-8 text-xs" />
                    <div className="min-w-0">
                      <p className="font-medium text-slate-800">
                        {userName(u)}
                        {isSelf && <span className="ml-1.5 text-xs text-slate-400">(you)</span>}
                      </p>
                      <p className="truncate text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Select
                    value={u.role}
                    disabled={isSelf}
                    title={isSelf ? 'You cannot change your own role' : undefined}
                    onChange={(e) => updateRole({ id: u.id, role: e.target.value as UserRole })}
                    className="w-32 capitalize"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </Select>
                </td>
                <td className="px-4 py-3">
                  <Select
                    value={u.teamId ?? ''}
                    onChange={(e) =>
                      assignTeam({ id: u.id, teamId: e.target.value ? Number(e.target.value) : null })
                    }
                    className="w-44"
                  >
                    <option value="">No team</option>
                    {(teams ?? []).map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </Select>
                </td>
                <td className="px-4 py-3 text-right">
                  {!isSelf && (
                    <button
                      onClick={() => remove(u.id, userName(u))}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      title="Delete user"
                      aria-label={`Delete ${userName(u)}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
  )
}
