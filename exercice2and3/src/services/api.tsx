import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

// Pour inclure le token si besoin
const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
}

// Récupérer toutes les tâches
export const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`, { headers: getAuthHeaders() })
    return res.data
}

// Ajouter une tâche
export const addTaskApi = async (title: string) => {
    const res = await axios.post(`${API_URL}/tasks`, { title }, { headers: getAuthHeaders() })
    return res.data
}

// Mettre à jour une tâche
export const updateTaskApi = async (id: number, data: Partial<{ title: string; completed: boolean; hidden: boolean }>) => {
    const res = await axios.patch(`${API_URL}/tasks/${id}`, data, { headers: getAuthHeaders() })
    return res.data
}

// Récupérer le détail d'une tâche
export const getTaskDetail = async (id: number) => {
    const res = await axios.get(`${API_URL}/tasks/${id}`, { headers: getAuthHeaders() })
    return res.data
}

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = (): boolean => !!localStorage.getItem('token')

// Déconnexion
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
}

// Connexion
export const loginApi = async (email: string, password: string) => {
    const res = await axios.post(`${API_URL}/login`, { email, password })
    const { token } = res.data
    if (token) {
        localStorage.setItem('token', token)
        localStorage.setItem('userEmail', email)
    }
    return token
}

// Récupérer l'email de l'utilisateur connecté
export const getUserEmail = (): string | null => localStorage.getItem('userEmail')
