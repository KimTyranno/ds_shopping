import { Link } from '@/i18n/navigation'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const tFooter = useTranslations('footer')
  const t = useTranslations()
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  S
                </span>
              </div>
              <span className="font-bold text-xl">{t('common.logo')}</span>
            </div>
            <p className="text-gray-400 mb-4">{tFooter('description')}</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* 고객 서비스 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {tFooter('customer_service')}
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/mypage" className="hover:text-white">
                  {t('user.mypage')}
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white">
                  {t('user.orders')}
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white">
                  {t('common.support')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  {t('common.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 회사 정보 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {tFooter('company_info')}
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>{tFooter('company.name')}</li>
              <li>{tFooter('company.ceo')}</li>
              <li>{tFooter('company.biz_number')}</li>
              <li>{tFooter('company.license')}</li>
              <li>{tFooter('company.address')}</li>
              <li>{tFooter('company.customer_center')}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm space-y-1">
          <p>&copy; 2025 심플몰. All rights reserved.</p>
          <p>
            <a href="https://storyset.com/business">
              Business illustrations by Storyset
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
