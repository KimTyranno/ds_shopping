module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals', // Next.js 권장 기본 설정
    'plugin:@typescript-eslint/recommended', // TypeScript 권장 규칙
    'plugin:react/recommended', // React 권장 규칙
    'eslint:recommended', // ESLint 기본 추천 규칙
  ],
  parser: '@typescript-eslint/parser', // TypeScript 파서 지정
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json', // 타입스크립트 설정 파일 경로
  },
  plugins: ['@typescript-eslint', 'react'],
  settings: {
    react: {
      version: 'detect', // 설치된 리액트 버전에 맞게 자동 감지
      pragma: 'React', // 기본값, 필요하면 설정
      // JSX 변환 방식이 automatic인지 명시해줍니다:
      // React 17+ 자동 JSX 변환 사용 시 필요
      jsxRuntime: 'automatic',
    },
  },
  rules: {
    // 커스텀 규칙
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'react/react-in-jsx-scope': 'off', // Next.js에서는 필요 없다함
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // TypeScript 파일에만 적용할 규칙 추가 가능
      rules: {
        // TypeScript 전용 규칙들
      },
    },
  ],
}
