# Frontend - Disaster Safety System

재난 안전 시스템 웹 인터페이스

## 🚀 Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **TypeScript** - Type Safety
- **TailwindCSS** - Styling
- **Axios** - HTTP Client

## 📦 Development

### Install Dependencies

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

→ http://localhost:3000

### Build for Production

```bash
npm run build
```

### Lint & Format

```bash
npm run lint
npm run format
```

## 🐳 Docker

```bash
docker build -t safety-frontend .
docker run -p 3000:80 safety-frontend
```

## 🔗 API Integration

Backend API: `http://localhost:8080/api`

See `vite.config.ts` for proxy configuration.

## 📁 Project Structure

```
src/
├── App.tsx          # Main App Component
├── main.tsx         # Entry Point
├── index.css        # Global Styles
└── components/      # (Add your components here)
```

## 🎯 Features

- ✅ CCTV 영상 업로드
- ✅ 실시간 사고 감지 결과 표시
- ✅ 알림 대시보드
- ✅ 탐지 히스토리

## 🧪 Testing

```bash
npm test
```

## 📝 License

MIT
