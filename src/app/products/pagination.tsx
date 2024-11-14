'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get('page') ?? '1')

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
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
  )
}