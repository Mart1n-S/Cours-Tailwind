'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center w-64 p-6 mx-auto mt-10 space-y-4 bg-white shadow-md rounded-2xl">
      <p className="text-2xl font-semibold text-gray-800">
        {count} {count === 1 ? 'like' : 'likes'}
      </p>

      <button
        onClick={() => setCount(count + 1)}
        className="px-5 py-2 font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        ❤️ Click me
      </button>
    </div>
  )
}
