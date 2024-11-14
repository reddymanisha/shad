'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { Heart, ShoppingCart, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

interface Product {
  id: number
  name: string
  image: string
  price: number
}

interface ProductPaginationProps {
  products: Product[]
  totalPages: number
}

export default function ProductPagination({ products, totalPages }: ProductPaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') ?? '1')

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
                aria-label="Add to wishlist"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <Button variant="outline" size="sm" className="w-[48%]">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="default" size="sm" className="w-[48%]">
                <CreditCard className="mr-2 h-4 w-4" /> Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center space-x-2">
        {currentPage > 1 && (
          <Link
            href={createPageURL(currentPage - 1)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Previous
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <Link
            key={pageNumber}
            href={createPageURL(pageNumber)}
            className={`px-4 py-2 border rounded ${
              currentPage === pageNumber ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            {pageNumber}
          </Link>
        ))}
        {currentPage < totalPages && (
          <Link
            href={createPageURL(currentPage + 1)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}