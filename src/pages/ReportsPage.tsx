import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { usePdfDownload } from '../hooks/usePdfDownload'

export default function ReportsPage() {
  const { downloading, error, download } = usePdfDownload()

  return (
    <div className="space-y-4">
      <Card
        title="PDF 리포트"
        description="서버에서 생성된 리포트 파일을 내려받습니다. 처리 시간이 길면 로딩이 유지될 수 있습니다."
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-slate-700">
            버튼 클릭 시 <span className="font-mono text-xs">GET /reports/pdf</span>를 호출합니다. (베이스 URL은 환경변수)
          </div>
          <Button variant="secondary" loading={downloading} onClick={() => void download()}>
            PDF 다운로드
          </Button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200">{error}</div>
        )}
      </Card>
    </div>
  )
}
