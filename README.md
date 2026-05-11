# 12.5-V3.0 — PetCare AI 프론트엔드

반려동물 **피부·안구 질환 진단** + **회원 마이페이지** 통합 프론트엔드.

## 라우트

| Path | 인증 | 설명 |
| --- | :---: | --- |
| `/` | — | 대시보드 (KPI, 주간 추이, 병원·센터 상태) |
| `/diagnose` | — | AI 진단 (사진 업로드 + Top-3 + 가이드 + JSON) |
| `/events` | — | 건강 이벤트 (DISEASE_ALERT, BEHAVIOR_ANOMALY) |
| `/reports` | — | PDF 리포트 다운로드 |
| `/me` | ✅ | 마이페이지 (내 정보 + 내 반려동물 CRUD) |
| `/login` | — | 로그인 |
| `/signup` | — | 회원가입 |

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
```

첫 실행 시 5명의 테스트 회원이 localStorage에 자동 seed됩니다.

## 테스트 계정 (모두 비밀번호 `pw1234`)

- `mango@petcare.kr` (김민지) — 망고 / 푸들
- `junpark@petcare.kr` (박서준) — 나비 / 코리안숏헤어
- `sualee@petcare.kr` (이수아) — 보리 + 콩이
- `doyoun@petcare.kr` (최도윤) — 초코 / 시바견
- `haneul@petcare.kr` (정하늘) — 미카 + 라떼

> 로그인 페이지에 한 번에 채워 넣을 수 있는 버튼이 있습니다.

## 진단 모델 / 인증 백엔드 연동 위치

- `src/lib/diagnoseLogic.ts` 의 `mockPredict()` → 실제 모델 API로 교체
- `src/hooks/useAuth.ts` + `src/lib/authStorage.ts` → JWT/세션 쿠키로 교체

## 변경 내역

`docs/V3.0_CHANGES.md` 참고.

## ⚠ 보안 안내

본 데모는 **localStorage에 비밀번호 평문 저장**합니다. 실서비스 절대 금지.
