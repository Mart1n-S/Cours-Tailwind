import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

// Création d'une instance Axios centralisée
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000, // pour éviter que les requêtes pendent trop longtemps
});

// Intercepteur global des erreurs réseau
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si le serveur est injoignable (pas de réponse du backend)
    if (!error.response) {
      console.error('Erreur réseau : impossible de contacter le serveur API.');
      // On envoie un événement global que le GlobalErrorProvider écoutera
      window.dispatchEvent(new CustomEvent('api-error', { detail: 'server-unreachable' }));
    }
    return Promise.reject(error);
  }
);

// Fonction utilitaire pour ajouter le token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};


// Récupérer toutes les tâches
export const fetchTasks = async () => {
  const res = await api.get('/tasks', { headers: getAuthHeaders() });
  return res.data;
};

// Ajouter une tâche
export const addTaskApi = async (title: string) => {
  const res = await api.post('/tasks', { title }, { headers: getAuthHeaders() });
  return res.data;
};

// Mettre à jour une tâche
export const updateTaskApi = async (
  id: number,
  data: Partial<{ title: string; completed: boolean; hidden: boolean }>
) => {
  const res = await api.patch(`/tasks/${id}`, data, { headers: getAuthHeaders() });
  return res.data;
};

// Récupérer le détail d'une tâche
export const getTaskDetail = async (id: number) => {
  const res = await api.get(`/tasks/${id}`, { headers: getAuthHeaders() });
  return res.data;
};


export const isAuthenticated = (): boolean => !!localStorage.getItem('token');

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
};

export const loginApi = async (email: string, password: string) => {
  const res = await api.post('/login', { email, password });
  const { token } = res.data;

  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
  }

  return token;
};

export const getUserEmail = (): string | null => localStorage.getItem('userEmail');

