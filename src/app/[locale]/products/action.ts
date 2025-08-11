export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  subcategory: string
  brand: string
  rating: number
  reviews: number
  description: string
  features: string[]
  inStock: boolean
  stockCount: number
  badge?: string
}

export const products: Product[] = [
  // 전자제품 - 스마트폰
  {
    id: '1',
    name: '갤럭시 S24 Ultra',
    price: 1590000,
    originalPrice: 1690000,
    image: '/placeholder.svg?height=300&width=300&text=Galaxy+S24',
    images: [
      '/placeholder.svg?height=500&width=500&text=Galaxy+S24+Front',
      '/placeholder.svg?height=500&width=500&text=Galaxy+S24+Back',
      '/placeholder.svg?height=500&width=500&text=Galaxy+S24+Side',
    ],
    category: 'electronics',
    subcategory: 'smartphones',
    brand: '삼성',
    rating: 4.8,
    reviews: 2341,
    description:
      '최신 AI 기능과 강력한 성능을 자랑하는 프리미엄 스마트폰입니다.',
    features: [
      '200MP 카메라',
      'S펜 내장',
      '5000mAh 배터리',
      '120Hz 디스플레이',
    ],
    inStock: true,
    stockCount: 50,
    badge: 'NEW',
  },
  {
    id: '2',
    name: '아이폰 15 Pro',
    price: 1550000,
    image: '/placeholder.svg?height=300&width=300&text=iPhone+15',
    images: [
      '/placeholder.svg?height=500&width=500&text=iPhone+15+Front',
      '/placeholder.svg?height=500&width=500&text=iPhone+15+Back',
    ],
    category: 'electronics',
    subcategory: 'smartphones',
    brand: '애플',
    rating: 4.9,
    reviews: 1876,
    description: '티타늄 소재와 A17 Pro 칩으로 한층 업그레이드된 아이폰입니다.',
    features: ['A17 Pro 칩', '티타늄 소재', '48MP 카메라', 'USB-C'],
    inStock: true,
    stockCount: 30,
    badge: 'HOT',
  },
  // 전자제품 - 노트북
  {
    id: '3',
    name: '맥북 에어 M3',
    price: 1590000,
    originalPrice: 1690000,
    image: '/placeholder.svg?height=300&width=300&text=MacBook+Air',
    images: [
      '/placeholder.svg?height=500&width=500&text=MacBook+Air+Open',
      '/placeholder.svg?height=500&width=500&text=MacBook+Air+Closed',
    ],
    category: 'electronics',
    subcategory: 'laptops',
    brand: '애플',
    rating: 4.7,
    reviews: 1234,
    description: 'M3 칩으로 더욱 강력해진 맥북 에어입니다.',
    features: ['M3 칩', '18시간 배터리', '13.6인치 Liquid Retina', '1.24kg'],
    inStock: true,
    stockCount: 25,
    badge: 'BEST',
  },
  // 패션 - 남성의류
  {
    id: '4',
    name: '프리미엄 코튼 셔츠',
    price: 89000,
    originalPrice: 120000,
    image: '/placeholder.svg?height=300&width=300&text=Cotton+Shirt',
    images: [
      '/placeholder.svg?height=500&width=500&text=Shirt+Front',
      '/placeholder.svg?height=500&width=500&text=Shirt+Back',
    ],
    category: 'fashion',
    subcategory: 'mens',
    brand: '유니클로',
    rating: 4.5,
    reviews: 856,
    description: '고급 코튼 소재로 제작된 편안한 셔츠입니다.',
    features: ['100% 코튼', '형태 안정성', '이지케어', '슬림핏'],
    inStock: true,
    stockCount: 100,
    badge: 'SALE',
  },
  // 홈&리빙 - 가구
  {
    id: '5',
    name: '모던 소파 3인용',
    price: 450000,
    originalPrice: 550000,
    image: '/placeholder.svg?height=300&width=300&text=Modern+Sofa',
    images: [
      '/placeholder.svg?height=500&width=500&text=Sofa+Front',
      '/placeholder.svg?height=500&width=500&text=Sofa+Side',
    ],
    category: 'home',
    subcategory: 'furniture',
    brand: '이케아',
    rating: 4.6,
    reviews: 432,
    description: '모던한 디자인의 편안한 3인용 소파입니다.',
    features: ['고밀도 스펀지', '패브릭 소재', '조립식', '3년 품질보증'],
    inStock: true,
    stockCount: 15,
    badge: 'HOT',
  },
  // 도서
  {
    id: '6',
    name: '클린 코드',
    price: 32000,
    originalPrice: 35000,
    image: '/placeholder.svg?height=300&width=300&text=Clean+Code',
    images: [
      '/placeholder.svg?height=500&width=500&text=Book+Cover',
      '/placeholder.svg?height=500&width=500&text=Book+Back',
    ],
    category: 'books',
    subcategory: 'computer',
    brand: '인사이트',
    rating: 4.8,
    reviews: 1567,
    description: '소프트웨어 장인 정신에 대한 필독서입니다.',
    features: ['번역서', '464페이지', '프로그래밍 필독서', '실무 예제'],
    inStock: true,
    stockCount: 200,
    badge: 'BEST',
  },
  // 스포츠
  {
    id: '7',
    name: '나이키 에어맥스 270',
    price: 159000,
    originalPrice: 189000,
    image: '/placeholder.svg?height=300&width=300&text=Nike+AirMax',
    images: [
      '/placeholder.svg?height=500&width=500&text=Shoes+Side',
      '/placeholder.svg?height=500&width=500&text=Shoes+Top',
    ],
    category: 'sports',
    subcategory: 'sneakers',
    brand: '나이키',
    rating: 4.7,
    reviews: 2134,
    description: '편안함과 스타일을 모두 갖춘 운동화입니다.',
    features: ['에어맥스 쿠셔닝', '메쉬 갑피', '러버 아웃솔', '다양한 컬러'],
    inStock: true,
    stockCount: 80,
    badge: 'HOT',
  },
  // 뷰티
  {
    id: '8',
    name: '히알루론산 세럼',
    price: 45000,
    originalPrice: 55000,
    image: '/placeholder.svg?height=300&width=300&text=Serum',
    images: [
      '/placeholder.svg?height=500&width=500&text=Serum+Bottle',
      '/placeholder.svg?height=500&width=500&text=Serum+Drop',
    ],
    category: 'beauty',
    subcategory: 'skincare',
    brand: '더오디너리',
    rating: 4.6,
    reviews: 3421,
    description: '깊은 수분 공급으로 촉촉한 피부를 만들어주는 세럼입니다.',
    features: ['히알루론산 2%', '30ml', '모든 피부타입', '비건 제품'],
    inStock: true,
    stockCount: 150,
    badge: 'BEST',
  },
  // 전자제품 - 스마트워치
  {
    id: '9',
    name: '갤럭시 워치 6',
    price: 398000,
    originalPrice: 429000,
    image: '/placeholder.svg?height=300&width=300&text=Galaxy+Watch+6',
    images: [
      '/placeholder.svg?height=500&width=500&text=Watch+Front',
      '/placeholder.svg?height=500&width=500&text=Watch+Back',
    ],
    category: 'electronics',
    subcategory: 'smartwatch',
    brand: '삼성',
    rating: 4.5,
    reviews: 850,
    description: '건강 추적 기능과 세련된 디자인을 갖춘 스마트워치입니다.',
    features: ['심박수 측정', '수면 추적', 'NFC 결제', '30가지 운동 모드'],
    inStock: true,
    stockCount: 60,
    badge: 'NEW',
  },

  // 패션 - 여성의류
  {
    id: '10',
    name: '여성 여름 원피스',
    price: 59000,
    originalPrice: 79000,
    image: '/placeholder.svg?height=300&width=300&text=Summer+Dress',
    images: [
      '/placeholder.svg?height=500&width=500&text=Dress+Front',
      '/placeholder.svg?height=500&width=500&text=Dress+Back',
    ],
    category: 'fashion',
    subcategory: 'womens',
    brand: '자라',
    rating: 4.3,
    reviews: 543,
    description: '시원한 소재로 제작된 여름용 원피스입니다.',
    features: ['린넨 소재', '루즈핏', '미디 길이', '패턴 디자인'],
    inStock: true,
    stockCount: 120,
    badge: 'SALE',
  },

  // 홈&리빙 - 주방용품
  {
    id: '11',
    name: '스테인리스 냄비 세트',
    price: 89000,
    originalPrice: 99000,
    image: '/placeholder.svg?height=300&width=300&text=Pot+Set',
    images: [
      '/placeholder.svg?height=500&width=500&text=Pot+1',
      '/placeholder.svg?height=500&width=500&text=Pot+2',
    ],
    category: 'home',
    subcategory: 'kitchen',
    brand: '해피콜',
    rating: 4.6,
    reviews: 678,
    description: '내구성이 뛰어난 스테인리스 주방용품 세트입니다.',
    features: ['3종 세트', '인덕션 호환', '세라믹 코팅', '열전도율 우수'],
    inStock: true,
    stockCount: 80,
    badge: 'BEST',
  },

  // 도서 - 자기계발
  {
    id: '12',
    name: '아침 5시의 기적',
    price: 17000,
    originalPrice: 18000,
    image: '/placeholder.svg?height=300&width=300&text=Morning+Miracle',
    images: [
      '/placeholder.svg?height=500&width=500&text=Book+Front',
      '/placeholder.svg?height=500&width=500&text=Book+Back',
    ],
    category: 'books',
    subcategory: 'self-help',
    brand: '비즈니스북스',
    rating: 4.2,
    reviews: 910,
    description:
      '하루를 성공적으로 시작하기 위한 습관을 제시하는 자기계발서입니다.',
    features: ['224페이지', '습관 형성 가이드', '모닝 루틴', '실천 팁'],
    inStock: true,
    stockCount: 170,
    badge: 'HOT',
  },

  // 스포츠 - 수영용품
  {
    id: '13',
    name: '미즈노 수경',
    price: 29000,
    originalPrice: 35000,
    image: '/placeholder.svg?height=300&width=300&text=Swim+Goggles',
    images: [
      '/placeholder.svg?height=500&width=500&text=Goggles+Front',
      '/placeholder.svg?height=500&width=500&text=Goggles+Side',
    ],
    category: 'sports',
    subcategory: 'swimming',
    brand: '미즈노',
    rating: 4.4,
    reviews: 390,
    description: '김 서림 방지 기능이 포함된 고급 수영용 고글입니다.',
    features: [
      'UV 차단',
      '안티포그 렌즈',
      '인체공학적 디자인',
      '실리콘 스트랩',
    ],
    inStock: true,
    stockCount: 90,
    badge: 'NEW',
  },

  // 뷰티 - 향수
  {
    id: '14',
    name: '샤넬 넘버5 오 드 퍼퓸',
    price: 159000,
    originalPrice: 175000,
    image: '/placeholder.svg?height=300&width=300&text=Chanel+No+5',
    images: [
      '/placeholder.svg?height=500&width=500&text=Perfume+Front',
      '/placeholder.svg?height=500&width=500&text=Perfume+Box',
    ],
    category: 'beauty',
    subcategory: 'perfume',
    brand: '샤넬',
    rating: 4.9,
    reviews: 1260,
    description: '시대를 초월한 클래식한 향기의 대명사.',
    features: ['100ml', '플로럴 향', '오 드 퍼퓸', '오리지널 보틀'],
    inStock: true,
    stockCount: 45,
    badge: 'BEST',
  },
]

export const getProductById = (id: string) => {
  return products.find(product => product.id === id)
}

export const getBestProducts = () => {
  return products.filter(product => product.badge === 'BEST').slice(0, 8)
}

export const getNewProducts = () => {
  return products.filter(product => product.badge === 'NEW').slice(0, 8)
}

export const getSaleProducts = () => {
  return products
    .filter(
      product => product.originalPrice && product.originalPrice > product.price,
    )
    .slice(0, 8)
}
