import Link from 'next/link'

export default async function NotFound() {
  return (
    <div>
      <h2>존재하지 않는 페이지 입니다.</h2>
      <p>
        <Link href="/">홈으로</Link>
      </p>
    </div>
  )
}
