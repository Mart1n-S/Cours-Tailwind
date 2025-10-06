import { Link, NavLink, Outlet } from 'react-router-dom'

export function AppLayout() {
  const active = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: isActive ? 'underline' : 'none',
  })
  return (
    <div>
      <header>
        <Link to="/">React Cours</Link>
        <nav>
          <NavLink to="/" style={active} end>Home</NavLink>
          <NavLink to="/about" style={active}>À propos</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}