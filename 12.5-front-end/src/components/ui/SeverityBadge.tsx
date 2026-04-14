import type { EventSeverity } from '../../types/event'

const styles: Record<string, string> = {
  HIGH: 'bg-red-50 text-red-700 ring-red-200',
  MEDIUM: 'bg-amber-50 text-amber-800 ring-amber-200',
  LOW: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
}

export function SeverityBadge({ severity }: { severity: EventSeverity }) {
  const key = String(severity).toUpperCase()
  const cls = styles[key] ?? 'bg-slate-50 text-slate-700 ring-slate-200'
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cls}`}>
      {key}
    </span>
  )
}
