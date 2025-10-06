import { Link, Outlet, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function TasksLayout() {
  return (
    <section>
      <h2>Tâches</h2>
      <Outlet />
    </section>
  )
}

export function TasksList() {
  const [search, setSearch] = useSearchParams()
  const q = search.get('q') ?? ''
  const setQ = (v: string) => {
    const s = new URLSearchParams(search)
    v ? s.set('q', v) : s.delete('q')
    setSearch(s, { replace: true })
  }

  // State pour les tâches
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Lire la doc React' },
    { id: 't2', title: 'Installer React Router' },
  ])

  const [newTask, setNewTask] = useState('')

  // Compteur pour générer des IDs uniques
  const [nextId, setNextId] = useState(3) // Commence après t2

  // Ajouter une tâche
  const addTask = () => {
    if (!newTask.trim()) return
    const id = 't' + nextId
    setTasks([...tasks, { id, title: newTask }])
    setNextId(nextId + 1) // Incrémenter le compteur
    setNewTask('')
  }

  // Supprimer une tâche
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  // Filtrer les tâches selon la recherche
  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <input
        placeholder="Recherche"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <ul>
        {filteredTasks.map(t => (
          <li key={t.id}>
            <Link to={t.id}>{t.title}</Link>
            <button onClick={() => deleteTask(t.id)} style={{ marginLeft: 8 }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <div>
        <input
          placeholder="Nouvelle tâche"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Ajouter</button>
      </div>
    </div>
  )
}

export function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <article>
      <p>Détail de {id}</p>
      <button onClick={() => navigate('..')}>Retour</button>
    </article>
  )
}
