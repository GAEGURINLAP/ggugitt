# React 19 → Next.js 15 마이그레이션 가이드

## 1. Next.js 15 프로젝트 생성

```bash
# 새 Next.js 15 프로젝트 생성
npx create-next-app@latest ggugitt-next --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes

# 프로젝트 디렉토리로 이동
cd ggugitt-next

# 기존 의존성 설치 (React 19 호환성 고려)
npm install @emotion/react @emotion/styled firebase lottie-react react-hook-form @sentry/react @sentry/tracing --legacy-peer-deps
```

## 2. 환경 변수 설정

### .env.local 파일 생성

```env
# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_vapid_key

# 환경 설정
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_KAKAO_KEY=your_kakao_key
```

## 3. 디렉토리 구조 변환

### 현재 구조 → Next.js App Router 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 관련 라우트 그룹
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── create-account/
│   │   │   └── page.tsx
│   │   └── reset-password/
│   │       └── page.tsx
│   ├── (protected)/       # 보호된 라우트 그룹
│   │   ├── mypage/
│   │   │   └── page.tsx
│   │   └── vote-register/
│   │       ├── page.tsx
│   │       └── candidate/
│   │           └── page.tsx
│   ├── vote/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── vote-result/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── vote-progress/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── vote-history-result/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── landing/
│   │   └── page.tsx
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── not-found.tsx      # 404 페이지
├── components/            # 컴포넌트
├── lib/                   # 유틸리티
│   ├── firebase.ts
│   └── utils.ts
├── hooks/                 # 커스텀 훅
├── styles/                # 스타일
└── types/                 # 타입 정의
```

## 4. 주요 변경사항

### 4-1. 라우팅 변경

- **React Router DOM** → **Next.js App Router**
- `useNavigate()` → `useRouter()` (next/navigation)
- `Link` → `Link` (next/link)

### 4-2. 환경 변수 변경

- `import.meta.env.VITE_*` → `process.env.NEXT_PUBLIC_*`

### 4-3. 메타데이터 관리

- `react-helmet-async` → Next.js 내장 메타데이터 API

### 4-4. 스타일링

- Emotion은 그대로 사용 가능
- CSS 모듈 또는 Tailwind CSS 활용

## 5. 컴포넌트 마이그레이션 예시

### 5-1. 로그인 페이지 변환

**기존 (React Router)**

```tsx
// src/routes/auth/login.tsx
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const onSubmit = async (data: FormInputs) => {
    // ...
    navigate("/");
  };

  return <StyledLink to="/create-account">회원 가입</StyledLink>;
}
```

**변환 후 (Next.js)**

```tsx
// src/app/(auth)/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const onSubmit = async (data: FormInputs) => {
    // ...
    router.push("/");
  };

  return <Link href="/create-account">회원 가입</Link>;
}
```

### 5-2. 레이아웃 변환

**기존**

```tsx
// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return <RouterProvider router={router} />;
}
```

**변환 후**

```tsx
// src/app/layout.tsx
import { Global } from "@emotion/react";
import global from "@/styles/global";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Global styles={global} />
        {children}
      </body>
    </html>
  );
}
```

## 6. Firebase 설정 변환

### 6-1. 환경 변수 변경

```tsx
// src/lib/firebase.ts
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
```

## 7. 빌드 및 배포 설정

### 7-1. package.json 스크립트

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 7-2. Firebase 호스팅 설정

```json
// firebase.json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## 8. 단계별 마이그레이션 순서

1. **기본 설정**

   - Next.js 프로젝트 생성
   - 환경 변수 설정
   - Firebase 설정 변환

2. **공통 컴포넌트**

   - Layout, Header, LoadingScreen 등
   - 스타일 파일 이동

3. **페이지 변환**

   - 정적 페이지부터 시작 (landing, 404)
   - 인증 페이지들
   - 보호된 라우트들

4. **동적 라우트**

   - `[id]` 파라미터를 사용하는 페이지들

5. **테스트 및 최적화**
   - 빌드 테스트
   - 성능 최적화

## 9. 주의사항

- **클라이언트 컴포넌트**: `"use client"` 지시어 필요
- **서버 컴포넌트**: 기본적으로 서버에서 실행
- **라우팅**: App Router의 규칙 준수
- **메타데이터**: Next.js 내장 API 사용 권장
