import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts'
import { STATUS_COLOR } from '../../../lib/ticket-meta'
import type { TicketStatus } from '../../../types'

interface Props {
  data: { status: TicketStatus; count: number }[]
  onSelect?: (status: TicketStatus) => void
  active?: TicketStatus | null
}

export function StatusBarChart({ data, onSelect, active }: Props) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis
          dataKey="status"
          tick={{ fontSize: 11, fill: '#64748b' }}
          tickLine={false}
          axisLine={false}
          interval={0}
          angle={-15}
          textAnchor="end"
          height={50}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: '#64748b' }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip cursor={{ fill: '#f1f5f9' }} />
        <Bar
          dataKey="count"
          radius={[4, 4, 0, 0]}
          onClick={onSelect ? (d: { status: TicketStatus }) => onSelect(d.status) : undefined}
          className={onSelect ? 'cursor-pointer' : undefined}
        >
          {data.map((d) => (
            <Cell
              key={d.status}
              fill={STATUS_COLOR[d.status]}
              fillOpacity={active && active !== d.status ? 0.35 : 1}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
