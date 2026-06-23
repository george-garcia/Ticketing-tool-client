import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateTicketMutation } from '../../store/ticketsApi'
import { useGetUsersQuery } from '../../store/usersApi'
import { TICKET_PRIORITIES, TICKET_IMPACTS, TICKET_CATEGORIES } from '../../lib/ticket-meta'
import { userName } from '../../lib/user'
import { PageHeader } from '../../components/PageHeader'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import type { CreateTicketInput } from '../../types'

export default function NewTicketPage() {
  const navigate = useNavigate()
  const { data: users } = useGetUsersQuery()
  const [createTicket, { isLoading }] = useCreateTicketMutation()
  const [error, setError] = useState('')
  const [form, setForm] = useState<CreateTicketInput>({
    title: '',
    description: '',
    priority: 'Minor',
    impact: 'Low',
    category: 'Incident',
  })

  const set = <K extends keyof CreateTicketInput>(key: K, value: CreateTicketInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const ticket = await createTicket(form).unwrap()
      navigate(`/tickets/${ticket.id}`)
    } catch {
      setError('Could not create the ticket. Check the fields and try again.')
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="New ticket" subtitle="Open a new incident or request" />
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label">Subject</label>
            <Input
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              required
              minLength={3}
              maxLength={100}
              placeholder="Short summary of the issue"
            />
          </div>
          <div>
            <label className="label">Description</label>
            <Textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              required
              minLength={3}
              maxLength={500}
              placeholder="What's happening?"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="label">Priority</label>
              <Select
                value={form.priority}
                onChange={(e) => set('priority', e.target.value as CreateTicketInput['priority'])}
              >
                {TICKET_PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="label">Impact</label>
              <Select
                value={form.impact}
                onChange={(e) => set('impact', e.target.value as CreateTicketInput['impact'])}
              >
                {TICKET_IMPACTS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="label">Category</label>
              <Select
                value={form.category}
                onChange={(e) => set('category', e.target.value as CreateTicketInput['category'])}
              >
                {TICKET_CATEGORIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Assignee</label>
              <Select
                value={form.assignedToId ?? ''}
                onChange={(e) =>
                  set('assignedToId', e.target.value ? Number(e.target.value) : undefined)
                }
              >
                <option value="">Unassigned</option>
                {(users ?? []).map((u) => (
                  <option key={u.id} value={u.id}>
                    {userName(u)}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="label">Contact</label>
              <Input
                value={form.contact ?? ''}
                onChange={(e) => set('contact', e.target.value)}
                maxLength={100}
                placeholder="Phone or email (optional)"
              />
            </div>
          </div>

          <div>
            <label className="label">Product</label>
            <Input
              value={form.product ?? ''}
              onChange={(e) => set('product', e.target.value)}
              maxLength={100}
              placeholder="Affected product or service (optional)"
            />
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Create ticket
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
