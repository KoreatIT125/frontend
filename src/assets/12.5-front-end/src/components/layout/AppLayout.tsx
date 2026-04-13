import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Spinner } from '../ui/Spinner'
import { Sidebar } from './Sidebar'
import { TopHeader } from './TopHeader'

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center gap-3 text-sm text-slate-600">
      <Spinner className="h-6 w-6 text-primary" label="페이지를 불러오는 중" />
      페이지를 불러오는 중…
    </div>
  )
}

export function AppLayout() {
  return (
    <div className="flex min-h-full bg-app-bg">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader />
        <main className="flex-1 px-8 py-8">
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
