import { Link, Outlet, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchTasks, addTaskApi, updateTaskApi, getTaskDetail } from '../services/api'

export function TasksLayout() {
  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Tâches</h2>
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

  const [tasks, setTasks] = useState<{ id: number; title: string; completed: boolean }[]>([])
  const [newTask, setNewTask] = useState('')

  // Récupération dynamique des tâches
  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasks()
      setTasks(data)
    }
    loadTasks()
  }, [])

  const addTask = async () => {
    if (!newTask.trim()) return
    const task = await addTaskApi(newTask)
    setTasks([...tasks, task])
    setNewTask('')
  }

  const deleteTask = async (id: number) => {
    await updateTaskApi(id, { hidden: true })
    setTasks(tasks.filter(t => t.id !== id))
  }

  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="bg-gray-50 p-4 rounded shadow-md">
      {/* Recherche */}
      <div className="flex mb-4">
        <input
          placeholder="Recherche"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Liste des tâches */}
      <ul className="space-y-2">
        {filteredTasks.map(t => (
          <li key={t.id} className="flex items-center justify-between bg-white p-3 rounded shadow-sm hover:shadow-md transition-shadow">
            <Link to={String(t.id)} className="text-blue-600 hover:underline font-medium">{t.title}</Link>
            <button
              onClick={() => deleteTask(t.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {/* Ajouter une tâche */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <input
          placeholder="Nouvelle tâche"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Ajouter
        </button>
      </div>
    </div>
  )
}

export function TaskDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState<{ id: number; title: string; completed: boolean } | null>(null)

  useEffect(() => {
    const loadTask = async () => {
      if (!id) return
      const data = await getTaskDetail(Number(id))
      setTask(data)
    }
    loadTask()
  }, [id])

  if (!task) return <p className="text-center mt-4 text-gray-500">Chargement...</p>

  return (
    <article className="max-w-md mx-auto bg-white p-6 rounded shadow-md mt-6">
      <h3 className="text-xl font-bold mb-2">{task.title}</h3>
      <p className="mb-4">Complétée : <span className={task.completed ? 'text-green-600' : 'text-red-600'}>{task.completed ? 'Oui' : 'Non'}</span></p>
      <button
        onClick={() => navigate('..')}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Retour
      </button>
    </article>
  )
}
