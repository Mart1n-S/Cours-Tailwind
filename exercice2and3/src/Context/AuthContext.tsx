import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { loginApi, logout as apiLogout, getUserEmail, isAuthenticated } from '../services/api';

interface AuthContextType {
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur est déjà connecté au démarrage
    if (isAuthenticated()) {
      setUserEmail(getUserEmail());
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError('');
    try {
      const token = await loginApi(email, password);
      setUserEmail(email);
      setIsLoggedIn(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur réseau ou serveur');
      throw err; // pour que le composant LoginForm puisse aussi gérer l'erreur si nécessaire
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiLogout();
    setUserEmail(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ userEmail, login, logout, loading, error, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l’intérieur d’un AuthProvider');
  }
  return context;
};
