import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ES Module 환경에서 __dirname 정의
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GENERATED_PATHS_FILE = path.resolve(
  __dirname,
  '../src/constants/paths.ts',
)
const TEMP_PATHS_FILE = path.resolve(
  __dirname,
  '../src/constants/paths.temp.ts',
)

// 1. generate-route-paths.ts 실행해서 임시 파일 생성
try {
  // --temp를 붙이면 paths.temp.ts 로 생성되게 처리해놨음
  execSync(`ts-node scripts/generate-route-paths.ts --temp`, {
    stdio: 'inherit',
  })
} catch (err) {
  console.error('Error running generate-route-paths.ts')
  process.exit(1)
}

// 2. 기존 파일과 새 파일 읽기
const original = fs.existsSync(GENERATED_PATHS_FILE)
  ? fs.readFileSync(GENERATED_PATHS_FILE, 'utf-8')
  : ''

const generated = fs.readFileSync(TEMP_PATHS_FILE, 'utf-8')

// 3. 비교
if (original !== generated) {
  console.error(`
⚠️ 경로 정보가 최신이 아닙니다! 
- 아래 명령어를 실행해서 경로를 업데이트해주세요:

  yarn generate:paths

그리고 변경 사항을 커밋 후 다시 시도하세요.
`)
  // fs.unlinkSync(TEMP_PATHS_FILE) // ❗에러여도 삭제
  process.exit(1) // CI 실패 처리
}

// 4. 비교 끝났으니 임시 파일 삭제
fs.unlinkSync(TEMP_PATHS_FILE)

console.log('✅ 경로 정보가 최신 상태입니다.')
process.exit(0)
