import { Suspense } from 'react'
import ProductList from '@/app/products/product-list'
import Pagination from '@/app/products/pagination'
import { ProductsSkeleton } from '@/app/products/loading'

// This is a mock function to simulate fetching products from an API
async function getProducts(page: number, limit: number) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock product data
  const totalProducts = 100
  const products = Array.from({ length: limit }, (_, i) => ({
    id: (page - 1) * limit + i + 1,
    name: `Product ${(page - 1) * limit + i + 1}`,
    price: Math.floor(Math.random() * 100) + 1
  }))

  return {
    products,
    totalPages: Math.ceil(totalProducts / limit)
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams['page'] ?? '1')
  const limit = 10 // Number of products per page

  const { products, totalPages } = await getProducts(page, limit)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductList products={products} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </div>
  )
}