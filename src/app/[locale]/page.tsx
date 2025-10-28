import BestProducts from '@/components/BestProducts'
import FeaturedSection from '@/components/FeaturedSection'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      {/* TODO: 아이콘이 없으니 밋밋해져서 없어도 될거 같아서 일단 비표시 */}
      {/* <Categories /> */}
      <BestProducts />
      <FeaturedSection />
    </div>
  )
}
