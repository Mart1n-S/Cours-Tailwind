import Counter from "../components/Counter"

export default function CounterPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Mon Compteur Next.js 🧮
      </h1>
      <Counter />
    </main>
  )
}
