import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@/i18n/navigation'
import { getCategories } from '@/lib/api/category'
import { getTranslations } from 'next-intl/server'

export default async function Categories() {
  const t = await getTranslations()
  const categories = await getCategories()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('category_section.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('category_section.description')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => {
            // const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {/* <IconComponent className="w-8 h-8" /> */}
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
