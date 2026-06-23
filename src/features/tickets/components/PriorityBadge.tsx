import { Badge } from '../../../components/ui/Badge'
import { PRIORITY_BADGE } from '../../../lib/ticket-meta'
import type { TicketPriority } from '../../../types'

export function PriorityBadge({ priority }: { priority: TicketPriority }) {
  return <Badge className={PRIORITY_BADGE[priority]}>{priority}</Badge>
}
