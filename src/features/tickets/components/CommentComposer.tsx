import { FormEvent, useState } from 'react'
import { Textarea } from '../../../components/ui/Textarea'
import { Button } from '../../../components/ui/Button'

interface Props {
  onSubmit: (body: string) => Promise<void> | void
  isSubmitting?: boolean
}

export function CommentComposer({ onSubmit, isSubmitting }: Props) {
  const [body, setBody] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!body.trim()) return
    await onSubmit(body.trim())
    setBody('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Add a comment…"
        maxLength={2000}
      />
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting} disabled={!body.trim()}>
          Comment
        </Button>
      </div>
    </form>
  )
}
