import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl">심플몰</span>
            </div>
            <p className="text-gray-400 mb-4">고객 만족을 최우선으로 하는 온라인 쇼핑몰입니다.</p>
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

          {/* 쇼핑 정보 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">쇼핑 정보</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/products" className="hover:text-white">
                  전체상품
                </Link>
              </li>
              <li>
                <Link href="/best" className="hover:text-white">
                  베스트
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white">
                  카테고리
                </Link>
              </li>
              <li>
                <Link href="/sale" className="hover:text-white">
                  할인상품
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객 서비스 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">고객 서비스</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/mypage" className="hover:text-white">
                  마이페이지
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white">
                  주문조회
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white">
                  고객지원
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  자주묻는질문
                </Link>
              </li>
            </ul>
          </div>

          {/* 회사 정보 */}
          <div>
            <h3 className="font-semibold text-lg mb-4">회사 정보</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>상호명: 심플몰</li>
              <li>대표자: 홍길동</li>
              <li>사업자등록번호: 123-45-67890</li>
              <li>통신판매업신고: 제2024-서울강남-1234호</li>
              <li>주소: 서울시 강남구 테헤란로 123</li>
              <li>고객센터: 1588-1234</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 심플몰. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
