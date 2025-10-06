import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Hello } from './components/Hello/Hello.tsx'
import { Counter } from './components/Counter/Counter.tsx'
import { Timer } from './components/Timer/Timer.tsx'
import { List } from './components/List/List.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Hello text='Hello World!'/>
    <Hello text='Bonjour!'/>
    <Hello text='Buenas días!'/>
    <Counter />
    <Timer />
    <List />
  </StrictMode>,
)
