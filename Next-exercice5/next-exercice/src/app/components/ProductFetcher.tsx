'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Product } from '../external/fetch'
import { fetchProducts } from '../external/fetch'

export default function ProductFetcher() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetch = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError('Impossible de récupérer les produits.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setProducts([])
    setError(null)
  }

  return (
    <div className="flex flex-col items-center mt-10 space-y-4">
      <button
        onClick={handleFetch}
        className="px-6 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
      >
        {loading ? 'Chargement...' : 'Charger les produits'}
      </button>

      <button
        onClick={handleReset}
        className="px-6 py-2 text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700 hover:cursor-pointer"
      >
        Réinitialiser la liste
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {products.length > 0 && (
        <ul className="grid w-full max-w-5xl grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <li
              key={p.code}
              className="overflow-hidden transition-shadow duration-200 bg-white shadow-md rounded-xl hover:shadow-lg"
            >
              <div className="relative w-full h-48">
                <Image
                src={p.image_url}
                alt={p.product_name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover rounded-t-xl"
                />

              </div>
              <div className="p-4">
                <h2 className="mb-2 text-lg font-semibold text-black">{p.product_name}</h2>
                <p className="text-sm text-gray-600">
                  Énergie : {p.nutriments?.energy ?? 'N/A'} kJ
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
