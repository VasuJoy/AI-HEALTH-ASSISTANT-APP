import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate()

  function handleLogout() {
    onLogout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-sm p-4">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-6 items-center">
          <Link to="/" className="font-bold text-lg">
            AI Health Assistant
          </Link>
          {user && (
            <>
              <Link to="/chat" className="text-slate-700 hover:text-slate-900">
                Symptom Chat
              </Link>
              <Link to="/whatsapp-chat" className="text-slate-700 hover:text-slate-900 flex items-center gap-1">
                <span>💬</span> WhatsApp Chat
              </Link>
              <Link to="/whatsapp-inbox" className="text-slate-700 hover:text-slate-900 flex items-center gap-1">
                <span>📨</span> WhatsApp Inbox
              </Link>
              <Link to="/dashboard" className="text-slate-700 hover:text-slate-900">
                Dashboard
              </Link>
            </>
          )}
          <Link to="/insights" className="text-slate-700 hover:text-slate-900">
            Insights
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="text-sm text-slate-600">
                👤 <span className="font-medium">{user.name || user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

