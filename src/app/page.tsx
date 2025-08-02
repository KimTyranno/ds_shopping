import Hero from "@/components/Hero"
import BestProducts from "@/components/BestProducts"
import Categories from "@/components/Categories"
import FeaturedSection from "@/components/FeaturedSection"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Categories />
      <BestProducts />
      <FeaturedSection />
    </div>
  )
}
