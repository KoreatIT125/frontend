import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../components/auth/AuthLayout'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
    password2?: string
  }>({})
  const [info, setInfo] = useState<string | null>(null)

  const validate = (): boolean => {
    const next: typeof errors = {}
    if (name.trim().length > 0 && name.trim().length < 2) next.name = '이름은 2자 이상 입력해 주세요.'
    if (!email.trim()) next.email = '이메일을 입력해 주세요.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = '올바른 이메일 형식이 아닙니다.'
    if (!password) next.password = '비밀번호를 입력해 주세요.'
    else if (password.length < 8) next.password = '비밀번호는 8자 이상으로 설정해 주세요.'
    if (password !== password2) next.password2 = '비밀번호가 일치하지 않습니다.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInfo(null)
    if (!validate()) return
    setInfo('회원가입 API는 백엔드 준비 후 연동할 예정입니다. 화면만 동작합니다.')
  }

  return (
    <AuthLayout
      title="회원가입"
      subtitle="관리자 콘솔 사용을 위한 계정을 만듭니다."
      footer={
        <p>
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            로그인
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        {info && (
          <div
            className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900 ring-1 ring-emerald-100"
            role="status"
          >
            {info}
          </div>
        )}

        <Input
          name="name"
          type="text"
          autoComplete="name"
          label="이름"
          placeholder="홍길동"
          hint="선택 사항입니다."
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

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
            <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700">
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
            id="signup-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 ${
              errors.password ? 'border-red-300' : 'border-slate-200'
            }`}
          />
          {errors.password && (
            <p className="text-xs font-medium text-red-600" role="alert">
              {errors.password}
            </p>
          )}
          <p className="text-xs text-slate-500">8자 이상, 백엔드 정책에 맞춰 추후 강화할 수 있습니다.</p>
        </div>

        <Input
          name="password2"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          label="비밀번호 확인"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          error={errors.password2}
        />

        <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-600">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/40" />
          <span>
            서비스 이용약관 및 개인정보 처리방침에 동의합니다.{' '}
            <span className="text-slate-400">(UI만 제공, 실제 약관 링크는 추후 연결)</span>
          </span>
        </label>

        <Button type="submit" variant="secondary" className="w-full py-3">
          회원가입
        </Button>
      </form>
    </AuthLayout>
  )
}
