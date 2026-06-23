import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import { PRIORITY_COLOR } from '../../../lib/ticket-meta'
import type { TicketPriority } from '../../../types'

export function PriorityDonut({ data }: { data: { priority: TicketPriority; count: number }[] }) {
  const filtered = data.filter((d) => d.count > 0)

  if (filtered.length === 0) {
    return <p className="py-20 text-center text-sm text-slate-400">No tickets yet.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={filtered}
          dataKey="count"
          nameKey="priority"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
        >
          {filtered.map((d) => (
            <Cell key={d.priority} fill={PRIORITY_COLOR[d.priority]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
