import { FormEvent, useEffect, useState } from 'react'
import { useGetMeQuery, useUpdateMeMutation } from '../../store/usersApi'
import { useGetTeamsQuery } from '../../store/teamsApi'
import { PageHeader } from '../../components/PageHeader'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../../components/ui/Avatar'
import { userName } from '../../lib/user'

export default function ProfilePage() {
  const { data: me } = useGetMeQuery()
  const { data: teams } = useGetTeamsQuery()
  const [updateMe, { isLoading }] = useUpdateMeMutation()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'saved' | 'error'>('idle')

  useEffect(() => {
    if (me) {
      setFirstName(me.firstName)
      setLastName(me.lastName)
      setPictureUrl(me.pictureUrl ?? '')
    }
  }, [me])

  const team = teams?.find((t) => t.id === me?.teamId)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('idle')
    try {
      // pictureUrl is validated as a URL server-side; only send it when non-empty.
      await updateMe({ firstName, lastName, pictureUrl: pictureUrl.trim() || undefined }).unwrap()
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="My profile" subtitle="Update your name and avatar" />

      <Card className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <Avatar name={userName(me)} src={pictureUrl || me?.pictureUrl} className="h-16 w-16 text-lg" />
          <div>
            <p className="text-lg font-semibold text-slate-900">{userName(me)}</p>
            <p className="text-sm text-slate-500">{me?.email}</p>
            <p className="mt-1 text-xs text-slate-400">
              <span className="capitalize">{me?.role}</span>
              {team ? ` · ${team.name} team` : ''}
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">First name</label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={100} required />
            </div>
            <div>
              <label className="label">Last name</label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={100} required />
            </div>
          </div>
          <div>
            <label className="label">Avatar URL</label>
            <Input
              type="url"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              placeholder="https://…"
            />
            <p className="mt-1 text-xs text-slate-400">Leave blank to keep your current avatar.</p>
          </div>

          {status === 'error' && <p className="text-sm font-medium text-red-600">Could not save your profile.</p>}
          {status === 'saved' && <p className="text-sm font-medium text-emerald-600">Profile saved.</p>}

          <div className="flex justify-end">
            <Button type="submit" isLoading={isLoading}>
              Save changes
            </Button>
          </div>
        </form>
      </Card>

      <p className="mt-4 text-center text-xs text-slate-400">
        Your role and team are managed by an administrator.
      </p>
    </div>
  )
}
