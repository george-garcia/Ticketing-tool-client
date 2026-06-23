import type { ReactNode } from 'react'
import bg from '../../assets/background.jpg'
import { Logo } from '../../components/ui/Logo'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden lg:block">
        <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-sidebar/85" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <span className="text-lg font-bold">Help Desk Hero</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold leading-tight">Help Desk Hero</h1>
            <p className="mt-3 max-w-md text-slate-300">
              Track, triage, and resolve IT incidents — a modern service desk for fast-moving teams.
            </p>
          </div>
          <p className="text-sm text-slate-400">Agent console</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-white p-6 sm:p-12">
        <div className="w-full max-w-sm animate-fade-in">{children}</div>
      </div>
    </div>
  )
}
