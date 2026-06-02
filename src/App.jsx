import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Dashboard from './pages/Dashboard'
import Insights from './pages/Insights'
import Login from './pages/Login'
import Register from './pages/Register'
import WhatsAppChat from './pages/WhatsAppChat'
import WhatsAppInbox from './pages/WhatsAppInbox'

function ProtectedRoute({ element, user, authReady }) {
  if (!authReady) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm font-medium text-slate-600">
        Loading your session...
      </div>
    )
  }
  return user ? element : <Navigate to="/login" />
}

export default function App() {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('user')
      }
    }
    setAuthReady(true)
  }, [])

  function handleLogin(userData) {
    setUser(userData)
  }

  function handleLogout() {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route
          path="/chat"
          element={<ProtectedRoute element={<Chat user={user} />} user={user} authReady={authReady} />}
        />
        <Route
          path="/whatsapp-chat"
          element={<ProtectedRoute element={<WhatsAppChat user={user} />} user={user} authReady={authReady} />}
        />
        <Route
          path="/whatsapp-inbox"
          element={<ProtectedRoute element={<WhatsAppInbox user={user} />} user={user} authReady={authReady} />}
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard user={user} />} user={user} authReady={authReady} />}
        />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </div>
  )
}
