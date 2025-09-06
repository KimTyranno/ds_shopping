import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

type PathsFile = {
  AUTH_PATHS: string[]
  PUBLIC_PATHS: string[]
  PROTECTED_PATHS: string[]
}

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

// 2. paths.ts와 paths.temp.ts를 동적으로 import
const importPathsFile = async (filePath: string): Promise<PathsFile> => {
  const fileUrl = pathToFileURL(filePath).href
  return (await import(fileUrl)) as PathsFile
}

const main = async () => {
  const current = await importPathsFile(GENERATED_PATHS_FILE)
  const temp = await importPathsFile(TEMP_PATHS_FILE)

  // 3. 구조 비교
  const isEqual = JSON.stringify(current) === JSON.stringify(temp)

  if (!isEqual) {
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
  if (fs.existsSync(TEMP_PATHS_FILE)) {
    fs.unlinkSync(TEMP_PATHS_FILE)
  }

  console.log('✅ 경로 정보가 최신 상태입니다.')
  process.exit(0)
}

void main()
