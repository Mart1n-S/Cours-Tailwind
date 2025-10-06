import { useState, useTransition, useMemo } from 'react'

const items = Array.from({ length: 2000 }, (_, i) => `Item ${i + 1}`)

export  function List() {
  const [filter, setFilter] = useState('')
  const [isPending, startTransition] = useTransition()

  const filtered = useMemo(() => {
    const query = filter.trim().toLowerCase()
    if (!query) return items
    return items.filter((item) => item.toLowerCase().includes(query))
  }, [filter])

  return (
    <div>
      <h2>Recherche avec transition</h2>

      <input
        type="text"
        placeholder="Filtrer les items..."
        value={filter}
        onChange={(e) => {
          const value = e.target.value
          startTransition(() => {
            setFilter(value)
          })
        }}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />

      {isPending && <p style={{ color: 'orange' }}>UI en transition...</p>}

      <ul style={{ maxHeight: 400, overflowY: 'auto', border: '1px solid #ccc', padding: '0.5rem' }}>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
