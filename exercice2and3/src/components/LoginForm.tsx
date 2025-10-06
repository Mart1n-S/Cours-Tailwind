import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export function LoginForm() {
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('password');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/tasks', { replace: true });
    } catch {
      // l'erreur est déjà gérée dans le context
    }
  };

  return (
    <form className="max-w-md p-6 mx-auto bg-white rounded shadow-md" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-2xl font-bold text-center">Connexion</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">Email :</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block mb-1 font-medium">Mot de passe :</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 text-white transition-colors bg-blue-600 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? 'Connexion...' : 'Valider'}
      </button>
    </form>
  );
}
