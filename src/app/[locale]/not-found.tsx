import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('not_found')
  return (
    <div>
      <h2>{t('title')}</h2>
      <p>
        <Link href="/">{t('go_home')}</Link>
      </p>
    </div>
  )
}
