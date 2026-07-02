import { FormEvent, useState } from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} from '../../store/teamsApi'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { LoadingState } from '../../components/States'

export function TeamsAdmin() {
  const { data: teams, isLoading } = useGetTeamsQuery()
  const [createTeam, { isLoading: creating }] = useCreateTeamMutation()
  const [updateTeam] = useUpdateTeamMutation()
  const [deleteTeam] = useDeleteTeamMutation()

  const [newName, setNewName] = useState('')
  const [editId, setEditId] = useState<number | null>(null)
  const [editName, setEditName] = useState('')
  const [error, setError] = useState('')

  const add = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const name = newName.trim()
    if (!name) return
    try {
      await createTeam({ name }).unwrap()
      setNewName('')
    } catch {
      setError('Could not create the team (the name may already exist).')
    }
  }

  const saveEdit = async (id: number) => {
    const name = editName.trim()
    if (name) {
      try {
        await updateTeam({ id, name }).unwrap()
      } catch {
        setError('Could not rename the team.')
      }
    }
    setEditId(null)
  }

  const remove = (id: number, name: string) => {
    if (window.confirm(`Delete the "${name}" team? Members will be unassigned from it.`)) {
      deleteTeam(id)
    }
  }

  if (isLoading) return <LoadingState />

  return (
    <div className="space-y-4">
      <form onSubmit={add} className="flex gap-2">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New team name"
          maxLength={80}
        />
        <Button type="submit" isLoading={creating} disabled={!newName.trim()}>
          Add team
        </Button>
      </form>
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}

      <Card className="divide-y divide-slate-100 p-0">
        {(teams ?? []).length === 0 && (
          <p className="p-6 text-center text-sm text-slate-400">No teams yet.</p>
        )}
        {(teams ?? []).map((t) => (
          <div key={t.id} className="flex items-center gap-3 px-4 py-3">
            {editId === t.id ? (
              <>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  maxLength={80}
                  className="flex-1"
                  autoFocus
                />
                <button onClick={() => saveEdit(t.id)} className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50" aria-label="Save">
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={() => setEditId(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Cancel">
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 font-medium text-slate-800">{t.name}</span>
                <span className="text-xs text-slate-400">
                  {t.memberCount ?? 0} member{(t.memberCount ?? 0) === 1 ? '' : 's'}
                </span>
                <button
                  onClick={() => {
                    setEditId(t.id)
                    setEditName(t.name)
                  }}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  aria-label={`Rename ${t.name}`}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(t.id, t.name)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Delete ${t.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        ))}
      </Card>
    </div>
  )
}
