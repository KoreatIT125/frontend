import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/events', label: 'Events' },
  { to: '/polygon', label: 'Polygon' },
  { to: '/reports', label: 'Reports' },
] as const

export function Sidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-surface">
      <div className="px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <span className="text-lg" aria-hidden="true">
              ✚
            </span>
          </div>
          <div className="min-w-0 text-left">
            <div className="text-sm font-semibold text-slate-900">PetCare AI</div>
            <div className="truncate text-xs text-slate-500">질환 진단 관리</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 pb-6">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={'end' in it ? it.end : false}
            className={({ isActive }) =>
              `block rounded-xl px-3 py-2.5 text-sm font-semibold transition hover:bg-slate-50 ${
                isActive ? 'bg-slate-50 text-primary ring-1 ring-slate-200' : 'text-slate-700'
              }`
            }
          >
            {it.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
        운영 콘솔 · 내부 전용
      </div>
    </aside>
  )
}
