import { useMemo } from 'react'
import { DashboardCharts } from '../components/dashboard/DashboardCharts'
import { SiteSummaryCards } from '../components/dashboard/SiteSummaryCards'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Spinner } from '../components/ui/Spinner'
import { useEvents } from '../hooks/useEvents'
import { buildDailyCounts, buildSiteSummaries, buildTypeShares } from '../lib/dashboardStats'

export function DashboardPage() {
  const { data, loading, error, refetch } = useEvents()

  const sites = useMemo(() => buildSiteSummaries(data), [data])
  const daily = useMemo(() => buildDailyCounts(data, 7), [data])
  const types = useMemo(() => buildTypeShares(data), [data])

  return (
    <div className="space-y-6">
      {error && (
        <Card title="데이터 로딩 오류" description="네트워크 또는 서버 응답을 확인해 주세요.">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-red-700">{error}</p>
            <Button variant="ghost" onClick={() => void refetch()}>
              다시 시도
            </Button>
          </div>
        </Card>
      )}

      {loading ? (
        <Card title="불러오는 중" description="이벤트 데이터를 집계하고 있습니다.">
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <Spinner className="h-6 w-6 text-primary" />
            로딩 중…
          </div>
        </Card>
      ) : (
        <>
          <SiteSummaryCards items={sites} />
          <DashboardCharts daily={daily} typeShares={types} />
        </>
      )}
    </div>
  )
}
