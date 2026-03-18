import { createBrowserRouter } from 'react-router'
import Home from './pages/Home'
import Hero from './components/Hero'
import Features from './components/Features'
import Demo from './pages/Demo'
import Register from './pages/Register'
import AdminBoard from './pages/AdminBoard'
import ShowBoard from './pages/ShowBoard'

const router = createBrowserRouter([
  {
    path:"/",
    Component: Home
  },
  {
    path:"/hero",
    Component: Hero,
  },
  {
    path:"/features",
    Component: Features
  },
  {
    path:"/demo",
    Component: Demo
  },
  {
    path:"/register",
    Component: Register
  },
  {
    path:"/adminboard",
    Component: AdminBoard
  },
  {
    path:"/showboard",
    Component: ShowBoard
  }
])

export default router