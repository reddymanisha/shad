import { Product } from '@/app/products/type'

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  )
}