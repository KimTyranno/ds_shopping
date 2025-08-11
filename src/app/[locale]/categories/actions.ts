import { products } from '../products/action'

export const getProductsByCategory = (
  category: string,
  subcategory?: string,
) => {
  return products.filter(product => {
    if (subcategory) {
      return (
        product.category === category && product.subcategory === subcategory
      )
    }
    return product.category === category
  })
}
