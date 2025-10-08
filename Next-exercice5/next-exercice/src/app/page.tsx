import Link from 'next/link'
import ProductFetcher from './components/ProductFetcher'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 space-y-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-600">Hello World!</h1>

      <Link
        href="/about/martin/25"
        className="text-lg text-green-500 underline transition-colors decoration-2 hover:text-green-700"
      >
        About Page !
      </Link>

      <ProductFetcher />
    </main>
  )
}
