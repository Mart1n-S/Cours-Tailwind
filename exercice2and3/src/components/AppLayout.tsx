import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { isAuthenticated, logout, getUserEmail } from '../services/api'

export function AppLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const activeClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'underline font-semibold text-white'
      : 'hover:underline text-white/90'

  const loggedIn = isAuthenticated()
  const userEmail = getUserEmail()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="font-bold text-2xl hover:text-blue-200 transition-colors">
            React Cours
          </Link>

          <nav className="flex items-center space-x-4">
            <NavLink to="/" end className={activeClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={activeClass}>
              À propos
            </NavLink>

            {loggedIn && (
              <>
                <NavLink to="/tasks" className={activeClass}>
                  Tâches
                </NavLink>

                <div className="flex items-center space-x-3 ml-6">
                  <span className="bg-white/20 px-2 py-1 rounded text-sm">
                    Connecté en tant que <strong>{userEmail}</strong>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}
