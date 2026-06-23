import { Badge } from '../../../components/ui/Badge'
import { STATUS_BADGE } from '../../../lib/ticket-meta'
import type { TicketStatus } from '../../../types'

export function StatusBadge({ status }: { status: TicketStatus }) {
  return <Badge className={STATUS_BADGE[status]}>{status}</Badge>
}
