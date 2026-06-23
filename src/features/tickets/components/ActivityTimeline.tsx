import { Avatar } from '../../../components/ui/Avatar'
import { fromNow } from '../../../lib/format'
import { userName } from '../../../lib/user'
import type { Comment } from '../../../types'

export function ActivityTimeline({ comments }: { comments: Comment[] }) {
  if (comments.length === 0) {
    return <p className="text-sm text-slate-400">No activity yet — add the first comment below.</p>
  }

  return (
    <ol className="space-y-5">
      {comments.map((c) => (
        <li key={c.id} className="flex gap-3">
          <Avatar
            name={userName(c.author)}
            src={c.author?.pictureUrl}
            className="h-8 w-8 shrink-0 text-xs"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-800">{userName(c.author)}</span>
              <span className="text-xs text-slate-400">{fromNow(c.createdAt)}</span>
            </div>
            <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{c.body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
