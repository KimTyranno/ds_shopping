import js from '@eslint/js'
import * as tseslint from 'typescript-eslint'

export default [
  // 기본 JS 권장 설정
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    ...js.configs.recommended,
  },

  // Next.js 권장 설정
  // ...next(),

  // TypeScript 권장 설정
  ...tseslint.configs.recommendedTypeChecked,

  // 프로젝트별 세부 설정
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-redundant-type-constituents': 'off',
    },
  },

  // JSX 관련 설정
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // Next.js에서 필요 없음
      'no-undef': 'off', // 타입스크립트에서 관리
    },
  },
]
