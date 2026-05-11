import type { ReactNode } from 'react'
import {
  Activity,
  AlertTriangle,
  Camera,
  CheckCircle2,
  Clock,
  FileText,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const trendData = [
  { day: '월', events: 8 },
  { day: '화', events: 12 },
  { day: '수', events: 6 },
  { day: '목', events: 15 },
  { day: '금', events: 10 },
  { day: '토', events: 18 },
  { day: '일', events: 11 },
]

const recentEvents = [
  { time: '14:22', site: '대구 반려동물 병원', type: '결막염 의심', level: '주의' },
  { time: '14:05', site: '부산 24시 동물병원', type: '활동량 급감', level: '위험' },
  { time: '13:48', site: '서울 펫케어 클리닉', type: '피부 농포 의심', level: '주의' },
  { time: '13:21', site: '대구 반려동물 병원', type: '정상 모니터링', level: '정상' },
]

const siteStatus = [
  { name: '대구 반려동물 병원', status: '주의', events: 7 },
  { name: '부산 24시 동물병원', status: '위험', events: 11 },
  { name: '서울 펫케어 클리닉', status: '정상', events: 2 },
]

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: ReactNode
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-black text-slate-900">{value}</h3>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="overflow-hidden rounded-[2rem] bg-slate-900 p-8 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-emerald-300">
                <Activity className="h-4 w-4" />
                AI 진단 시스템 운영 중
              </div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                PetCare AI Control Center
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
                병원·케어센터별 반려동물의 안구·피부 질환 의심 알림과
                건강 상태 변화를 실시간으로 확인하고 빠르게 대응합니다.
              </p>
            </div>
            <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-slate-300">System Health</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-black">98%</span>
                <span className="pb-1 text-sm text-emerald-300">정상 운영</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI */}
        <div className="grid gap-5 md:grid-cols-2">
          <StatCard
            title="오늘 감지 이벤트"
            value="18건"
            description="AI가 감지한 이상 징후"
            icon={<AlertTriangle className="h-6 w-6" />}
          />
          <StatCard
            title="리포트 생성"
            value="8건"
            description="PDF 리포트 다운로드 가능"
            icon={<FileText className="h-6 w-6" />}
          />
        </div>

        {/* Chart + Events */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">주간 이벤트 추이</h3>
                <p className="mt-1 text-sm text-slate-500">최근 7일간 AI 감지 이벤트 수</p>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="events" stroke="#10b981" fill="#d1fae5" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-xl font-black text-slate-900">최근 건강 이벤트</h3>
            <p className="mt-1 text-sm text-slate-500">실시간 감지 로그</p>
            <div className="mt-5 space-y-4">
              {recentEvents.map((event) => (
                <div key={`${event.time}-${event.site}`} className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        event.level === '위험'
                          ? 'bg-rose-100 text-rose-700'
                          : event.level === '주의'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {event.level}
                    </span>
                  </div>
                  <p className="mt-3 font-bold text-slate-900">{event.type}</p>
                  <p className="mt-1 text-sm text-slate-500">{event.site}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Site status */}
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900">병원·센터별 모니터링 상태</h3>
              <p className="mt-1 text-sm text-slate-500">
                병원·센터별 건강 위험도와 이벤트 현황
              </p>
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 sm:flex">
              <Camera className="h-4 w-4" />
              카메라 연동 대기
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {siteStatus.map((site) => (
              <div key={site.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-slate-900">{site.name}</h4>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      site.status === '위험'
                        ? 'bg-rose-100 text-rose-700'
                        : site.status === '주의'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {site.status}
                  </span>
                </div>
                <p className="mt-4 text-3xl font-black text-slate-900">{site.events}건</p>
                <p className="mt-1 text-sm text-slate-500">오늘 감지된 이벤트</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-bold text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  실시간 모니터링 중
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
