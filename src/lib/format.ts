import { format, formatDistanceToNow } from 'date-fns'

export const formatDate = (iso: string) => format(new Date(iso), 'MMM d, yyyy')
export const formatDateTime = (iso: string) => format(new Date(iso), "MMM d, yyyy 'at' h:mm a")
export const fromNow = (iso: string) => formatDistanceToNow(new Date(iso), { addSuffix: true })
