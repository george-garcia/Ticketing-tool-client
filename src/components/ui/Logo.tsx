/** Help Desk Hero brand mark (headset in a gradient tile). Inline SVG, always square. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Help Desk Hero">
      <defs>
        <linearGradient id="hdh-logo" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="7" fill="url(#hdh-logo)" />
      <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 18.5V16a7.5 7.5 0 0 1 15 0v2.5" />
        <path d="M23.5 24v1a3 3 0 0 1-3 3h-3.2" />
      </g>
      <rect x="6.6" y="17.6" width="3.6" height="6.4" rx="1.8" fill="#fff" />
      <rect x="21.8" y="17.6" width="3.6" height="6.4" rx="1.8" fill="#fff" />
      <circle cx="15.3" cy="28" r="1.5" fill="#fff" />
    </svg>
  )
}
