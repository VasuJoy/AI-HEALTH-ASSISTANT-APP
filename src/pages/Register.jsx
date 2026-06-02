import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    whatsapp: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  function handleRegister(e) {
    e.preventDefault()
    setError('')

    const name = formData.name.trim()
    const email = formData.email.trim()
    const mobile = formData.mobile.trim()
    const whatsapp = formData.whatsapp.trim()
    const { password, confirmPassword } = formData

    if (!name || !email || !mobile || !whatsapp || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    if (!/^\d{10}$/.test(whatsapp)) {
      setError('Please enter a valid 10-digit WhatsApp number.')
      return
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      setError('Password must be at least 8 characters and include both letters and numbers.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const user = {
        id: Date.now().toString(),
        name: name,
        email: email,
        mobile: mobile,
        whatsapp: whatsapp,
        registeredAt: new Date().toLocaleString(),
      }
      localStorage.setItem('user', JSON.stringify(user))
      onLogin(user)
      navigate('/chat')
      setLoading(false)
    }, 500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-50 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-600">Join AI Health Assistant today</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                placeholder="9876543210"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsapp"
                placeholder="9876543210"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
              <p className="text-xs text-slate-500 mt-1">
                We'll use this number to send you health guidance and updates
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="At least 8 letters and numbers"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:bg-green-400"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Log in here
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-xs text-slate-600">
              <strong>Info:</strong> Your health data is secure. We follow privacy guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
