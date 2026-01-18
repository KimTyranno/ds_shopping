export function generateViewport() {
  return {
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#000000',
  }
}

// layout 자체는 children만 렌더링
export default function NotFoundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
