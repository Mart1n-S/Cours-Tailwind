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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="p-4 text-white bg-blue-600 shadow-md">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link
            to="/"
            className="text-2xl font-bold transition-colors hover:text-blue-200"
          >
            React Cours
          </Link>

          <nav className="flex items-center space-x-4">
            <NavLink to="/" end className={activeClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={activeClass}>
              À propos
            </NavLink>

            {loggedIn ? (
              <>
                <NavLink to="/tasks" className={activeClass}>
                  Tâches
                </NavLink>

                <div className="flex items-center ml-6 space-x-3">
                  <span className="px-2 py-1 text-sm rounded bg-white/20">
                    Connecté en tant que <strong>{userEmail}</strong>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 text-blue-600 transition-colors bg-white rounded hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                className="px-3 py-1 text-blue-600 transition-colors bg-white rounded hover:bg-gray-100"
              >
                Connexion
              </NavLink>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl p-6 mx-auto">
        <Outlet />
      </main>
    </div>
  )
}
