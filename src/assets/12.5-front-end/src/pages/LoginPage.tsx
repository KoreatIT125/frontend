import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../components/auth/AuthLayout'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [info, setInfo] = useState<string | null>(null)

  const validate = (): boolean => {
    const next: typeof errors = {}
    if (!email.trim()) next.email = '이메일을 입력해 주세요.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = '올바른 이메일 형식이 아닙니다.'
    if (!password) next.password = '비밀번호를 입력해 주세요.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInfo(null)
    if (!validate()) return
    setInfo('인증 API는 백엔드 준비 후 연동할 예정입니다. 화면만 동작합니다.')
  }

  return (
    <AuthLayout
      title="로그인"
      subtitle="관리자 계정으로 PetCare AI 콘솔에 접속합니다."
      footer={
        <p>
          계정이 없으신가요?{' '}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            회원가입
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        {info && (
          <div
            className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900 ring-1 ring-blue-100"
            role="status"
          >
            {info}
          </div>
        )}

        <Input
          name="email"
          type="email"
          autoComplete="email"
          label="이메일"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <div className="space-y-1.5">
          <div className="flex items-end justify-between gap-3">
            <label htmlFor="login-password" className="block text-sm font-medium text-slate-700">
              비밀번호
            </label>
            <button
              type="button"
              className="text-xs font-medium text-slate-500 hover:text-primary"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? '숨기기' : '표시'}
            </button>
          </div>
          <input
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              errors.password ? 'border-red-300' : 'border-slate-200'
            }`}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? 'login-password-err' : undefined}
          />
          {errors.password && (
            <p id="login-password-err" className="text-xs font-medium text-red-600" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/40"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          로그인 상태 유지
        </label>

        <Button type="submit" variant="primary" className="w-full py-3">
          로그인
        </Button>

        <p className="text-center text-xs text-slate-500">
          비밀번호 찾기 등은 백엔드 연동 후 제공 예정입니다.
        </p>
      </form>
    </AuthLayout>
  )
}
