import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Trash2 } from 'lucide-react'
import {
  useGetTicketQuery,
  useUpdateTicketMutation,
  useAddCommentMutation,
  useDeleteTicketMutation,
} from '../../store/ticketsApi'
import { useGetUsersQuery, useGetMeQuery } from '../../store/usersApi'
import { PropertiesPanel } from './components/PropertiesPanel'
import { ActivityTimeline } from './components/ActivityTimeline'
import { CommentComposer } from './components/CommentComposer'
import { StatusBadge } from './components/StatusBadge'
import { PriorityBadge } from './components/PriorityBadge'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { LoadingState, ErrorState } from '../../components/States'
import { formatDateTime } from '../../lib/format'
import { userName } from '../../lib/user'
import { slaStatus, SLA_BADGE, slaHoursFromSettings } from '../../lib/sla'
import { useGetSettingsQuery } from '../../store/settingsApi'
import type { UpdateTicketInput } from '../../types'

export default function TicketDetailPage() {
  const { id } = useParams()
  const ticketId = Number(id)
  const navigate = useNavigate()

  const {
    data: ticket,
    isLoading,
    isError,
  } = useGetTicketQuery(ticketId, { skip: !Number.isFinite(ticketId) })
  const { data: users } = useGetUsersQuery()
  const { data: me } = useGetMeQuery()
  const { data: settings } = useGetSettingsQuery()
  const [updateTicket, { isLoading: isUpdating }] = useUpdateTicketMutation()
  const [addComment, { isLoading: isCommenting }] = useAddCommentMutation()
  const [deleteTicket, { isLoading: isDeleting }] = useDeleteTicketMutation()

  if (isLoading) return <LoadingState />
  if (isError || !ticket) return <ErrorState message="Ticket not found." />

  // Requesters ('user') can read a ticket and comment, but not reassign or change its state.
  const canManage = me?.role === 'agent' || me?.role === 'admin'
  const canDelete = canManage

  const handleChange = (changes: UpdateTicketInput) => {
    updateTicket({ id: ticket.id, changes })
  }
  const handleComment = async (body: string) => {
    await addComment({ id: ticket.id, body }).unwrap()
  }
  const handleDelete = async () => {
    if (!window.confirm('Delete this ticket? This cannot be undone.')) return
    await deleteTicket(ticket.id).unwrap()
    navigate('/tickets')
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn-ghost mb-4 px-2 text-sm">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-slate-400">#{ticket.id}</p>
                <h1 className="mt-1 text-xl font-bold text-slate-900">{ticket.title}</h1>
              </div>
              <div className="flex shrink-0 flex-wrap justify-end gap-2">
                {(() => {
                  const sla = slaStatus(ticket, slaHoursFromSettings(settings))
                  if (sla.state === 'met') return null
                  return (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${SLA_BADGE[sla.state]}`}>
                      {sla.label}
                    </span>
                  )
                })()}
                <PriorityBadge priority={ticket.priority} />
                <StatusBadge status={ticket.status} />
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm text-slate-600">{ticket.description}</p>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-sm font-semibold text-slate-900">Activity</h2>
            <ActivityTimeline comments={ticket.comments ?? []} events={ticket.events ?? []} />
            <div className="mt-6 border-t border-slate-100 pt-5">
              <CommentComposer onSubmit={handleComment} isSubmitting={isCommenting} />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <PropertiesPanel
            ticket={ticket}
            users={users ?? []}
            onChange={handleChange}
            disabled={isUpdating || !canManage}
            readOnly={!canManage}
          />
          <Card className="space-y-3 p-5 text-sm">
            <h3 className="text-sm font-semibold text-slate-900">Details</h3>
            <Detail label="Requester" value={userName(ticket.createdBy)} />
            <Detail label="Contact" value={ticket.contact || '—'} />
            <Detail label="Product" value={ticket.product || '—'} />
            <Detail label="Created" value={formatDateTime(ticket.createdAt)} />
            <Detail label="Updated" value={formatDateTime(ticket.updatedAt)} />
          </Card>
          {canDelete && (
            <Button
              variant="danger"
              className="w-full"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              <Trash2 className="h-4 w-4" /> Delete ticket
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-medium text-slate-700">{value}</span>
    </div>
  )
}
