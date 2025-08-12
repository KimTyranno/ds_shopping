import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

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
