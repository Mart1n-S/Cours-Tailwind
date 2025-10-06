import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import { AppLayout } from '../components/AppLayout'
import { TasksLayout, TasksList, TaskDetail } from '../pages/Tasks'
import NotFound from '../pages/NotFound'

function AppRoutes() {

  return (
    <Routes>
        <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="tasks" element={<TasksLayout />}>
                <Route index element={<TasksList />} />
                <Route path=":id" element={<TaskDetail />} />
            </Route>
            <Route path="" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes
