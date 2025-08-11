import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('notFound')
  return (
    <div>
      <h2>{t('title')}</h2>
      <p>
        <Link href="/">{t('goHome')}</Link>
      </p>
    </div>
  )
}
