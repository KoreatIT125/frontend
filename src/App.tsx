import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🚨 재난 안전 시스템
        </h1>
        <p className="text-gray-600 mb-6">
          CCTV 기반 실시간 사고 감지 시스템
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            카운트: {count}
          </button>
          
          <div className="text-sm text-gray-500">
            <p>✅ React + Vite + TypeScript</p>
            <p>✅ TailwindCSS</p>
            <p>✅ ESLint + Prettier</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
