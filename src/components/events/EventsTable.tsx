import type { EventRecord } from '../../types/event'
import { formatEventType, formatSeverity } from '../../lib/eventLabels'
import { SeverityBadge } from '../ui/SeverityBadge'

function formatTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(d)
}

export function EventsTable({
  rows,
  onSelect,
}: {
  rows: EventRecord[]
  onSelect: (e: EventRecord) => void
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-surface shadow-sm ring-1 ring-slate-200/70">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="bg-app-bg text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 sm:px-5 py-2 sm:py-3">시간</th>
              <th className="px-3 sm:px-5 py-2 sm:py-3">병원·센터명</th>
              <th className="px-3 sm:px-5 py-2 sm:py-3">이벤트 타입</th>
              <th className="px-3 sm:px-5 py-2 sm:py-3">위험도</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((r) => (
              <tr
                key={r.eventId}
                className="cursor-pointer bg-white transition hover:bg-slate-50"
                onClick={() => onSelect(r)}
              >
                <td className="whitespace-nowrap px-3 sm:px-5 py-2 sm:py-4 font-medium text-slate-900 text-xs sm:text-sm">{formatTime(r.timestamp)}</td>
                <td className="px-3 sm:px-5 py-2 sm:py-4 text-slate-700 text-xs sm:text-sm">{r.siteName}</td>
                <td className="px-3 sm:px-5 py-2 sm:py-4 text-slate-700 text-xs sm:text-sm">{formatEventType(r.eventType)}</td>
                <td className="px-3 sm:px-5 py-2 sm:py-4">
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={r.severity} />
                    <span className="text-xs text-slate-500">{formatSeverity(String(r.severity))}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
