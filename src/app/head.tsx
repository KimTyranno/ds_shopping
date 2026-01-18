export default function Head() {
  return (
    <>
      {/* 절대경로 /manifest.json */}
      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#000000" />
      {/* Apple 홈화면 아이콘 */}
      <link rel="apple-touch-icon" href="/icons/192.png" />
    </>
  )
}
