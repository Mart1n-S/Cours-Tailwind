import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import { AppLayout } from '../components/AppLayout'
import { TasksLayout, TasksList, TaskDetail } from '../pages/Tasks'
import NotFound from '../pages/NotFound'
import { PrivateRoute } from '../auth/PrivateRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        {/* Routes protégées */}
        <Route element={<PrivateRoute />}>
          <Route path="tasks" element={<TasksLayout />}>
            <Route index element={<TasksList />} />
            <Route path=":id" element={<TaskDetail />} />
          </Route>
        </Route>

        <Route path="" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
