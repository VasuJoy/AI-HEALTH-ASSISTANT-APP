import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleLogin(e) {
    e.preventDefault()
    setError('')
    const cleanEmail = email.trim()

    if (!cleanEmail || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (!cleanEmail.includes('@') && !/^\d{10}$/.test(cleanEmail)) {
      setError('Please enter a valid email or 10-digit mobile number.')
      return
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setError('Password must be at least 8 characters and include both letters and numbers.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const user = {
        id: Date.now().toString(),
        email: cleanEmail,
        loginTime: new Date().toLocaleString(),
      }
      localStorage.setItem('user', JSON.stringify(user))
      onLogin(user)
      navigate('/chat')
      setLoading(false)
    }, 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Health Assistant</h1>
            <p className="text-slate-600">Log in to access health guidance</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email or Mobile Number
              </label>
              <input
                type="text"
                placeholder="your@email.com or 9876543210"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="At least 8 letters and numbers"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-slate-600">
              <strong>Demo:</strong> Use any email/mobile and an 8+ character alphanumeric password.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
