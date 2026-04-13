import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

function titleForPath(pathname: string): { title: string; subtitle: string } {
  if (pathname.startsWith('/events')) {
    return { title: '위반 이벤트', subtitle: 'AI 탐지 이벤트를 조회하고 상세를 확인합니다.' }
  }
  if (pathname.startsWith('/polygon')) {
    return { title: '위험구역 폴리곤', subtitle: '모니터링 영역을 설정하고 저장합니다.' }
  }
  if (pathname.startsWith('/reports')) {
    return { title: '리포트', subtitle: '운영 리포트를 내려받습니다.' }
  }
  return { title: '대시보드', subtitle: '현장별 요약과 최근 추세를 한눈에 봅니다.' }
}

export function TopHeader() {
  const loc = useLocation()
  const { title, subtitle } = useMemo(() => titleForPath(loc.pathname), [loc.pathname])

  return (
    <header className="border-b border-slate-200 bg-surface/80 backdrop-blur">
      <div className="flex items-start justify-between gap-6 px-8 py-6">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <div className="rounded-xl bg-app-bg px-3 py-2 text-xs text-slate-600 ring-1 ring-slate-200">
            <span className="font-semibold text-slate-800">시스템</span> 정상
          </div>
        </div>
      </div>
    </header>
  )
}
