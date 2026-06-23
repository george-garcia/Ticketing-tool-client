import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useGetMeQuery } from '../../store/usersApi'
import { Spinner } from '../../components/ui/Spinner'

/** Gate for protected routes: resolves the current user via /users/me. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useGetMeQuery()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-8 w-8 text-brand-600" />
      </div>
    )
  }

  if (isError || !data) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}
