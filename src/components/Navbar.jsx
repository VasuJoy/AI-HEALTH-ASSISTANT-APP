import { Link, useNavigate } from 'react-router-dom'

function NavIcon({ children, className = '' }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 ${className}`}
      width="20"
      height="20"
      style={{ width: 20, height: 20, minWidth: 20, maxWidth: 20 }}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function IconBadge({ children, className = '' }) {
  return (
    <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg shadow-sm ${className}`}>
      {children}
    </span>
  )
}

const icons = {
  brand: (
    <NavIcon className="text-emerald-700" fill="none">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      <path d="M8 13h2l1.5-3 2.5 6 1.5-3H18" />
    </NavIcon>
  ),
  chat: (
    <IconBadge className="bg-purple-600 text-white">
      <NavIcon>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </NavIcon>
    </IconBadge>
  ),
  whatsapp: (
    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-sm ring-1 ring-green-200">
      <svg
        width="18"
        height="18"
        style={{ width: 18, height: 18, minWidth: 18, maxWidth: 18 }}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M7.1 18.5 8 15.6a6.6 6.6 0 1 1 2.5 2.2l-3.4.7Z" fill="white" />
        <path d="M9.6 8.6c.2-.4.4-.5.7-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.2.1.4 0 .5l-.5.7c-.1.1-.1.3 0 .5.2.4.7 1 1.2 1.5.7.6 1.4 1 1.9 1.2.2.1.4 0 .5-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.8c.2.1.3.2.3.4 0 .4-.2.9-.5 1.2-.4.4-1.2.7-1.8.7-.5 0-1.5-.2-2.7-.8-2.3-1.1-3.8-3.2-3.9-3.4-.1-.2-.9-1.2-.9-2.3 0-1 .5-1.5.7-1.8Z" fill="#25D366" />
      </svg>
    </span>
  ),
  inbox: (
    <IconBadge className="bg-purple-600 text-white">
      <NavIcon>
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="m5.5 4-3 8v6a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2v-6l-3-8z" />
      </NavIcon>
    </IconBadge>
  ),
  dashboard: (
    <IconBadge className="bg-purple-600 text-white">
      <NavIcon>
        <rect x="3" y="3" width="7" height="8" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="15" width="7" height="6" rx="1" />
      </NavIcon>
    </IconBadge>
  ),
  insights: (
    <IconBadge className="bg-purple-600 text-white">
      <NavIcon>
        <path d="M4 19V5" />
        <path d="M4 19h18" />
        <path d="M8 16v-5" />
        <path d="M13 16V8" />
        <path d="M18 16v-3" />
      </NavIcon>
    </IconBadge>
  ),
  user: (
    <NavIcon className="text-emerald-700">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </NavIcon>
  ),
  logout: (
    <NavIcon className="text-white">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </NavIcon>
  ),
}

const navButtonBase =
  'inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border-2 border-purple-300 bg-purple-50 px-3 text-sm font-bold text-purple-700 shadow-[0_2px_0_rgba(126,34,206,0.24)] transition hover:-translate-y-0.5 hover:border-purple-400 hover:bg-purple-100 focus:outline-none focus:ring-4 focus:ring-purple-100'

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate()

  function handleLogout() {
    onLogout()
    navigate('/')
  }

  return (
    <nav className="border-b border-emerald-200 bg-gradient-to-r from-emerald-100 via-violet-100 to-purple-200 px-3 py-3 shadow-sm">
      <div className="mx-auto flex w-full max-w-[1800px] flex-wrap items-center justify-between gap-2 xl:flex-nowrap">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 xl:flex-nowrap">
          <Link
            to="/"
            className="mr-1 inline-flex h-10 shrink-0 items-center gap-2 rounded-full border-2 border-emerald-700 bg-emerald-50 px-3 text-lg font-bold tracking-tight text-emerald-700 shadow-[0_3px_0_rgba(4,120,87,0.25)] transition hover:bg-emerald-100 hover:text-emerald-800"
          >
            {icons.brand}
            AI Health Assistant
          </Link>

          {user && (
            <>
              <Link
                to="/chat"
                className={navButtonBase}
              >
                {icons.chat}
                Symptom Chat
              </Link>
              <Link
                to="/whatsapp-chat"
                className={navButtonBase}
              >
                {icons.whatsapp}
                WhatsApp Chat
              </Link>
              <Link
                to="/whatsapp-inbox"
                className={navButtonBase}
              >
                {icons.whatsapp}
                WhatsApp Inbox
              </Link>
              <Link
                to="/dashboard"
                className={navButtonBase}
              >
                {icons.dashboard}
                Dashboard
              </Link>
            </>
          )}

          <Link
            to="/insights"
            className={navButtonBase}
          >
            {icons.insights}
            Insights
          </Link>
        </div>

        <div className="ml-auto flex w-[155px] shrink-0 flex-col items-end gap-1.5">
          {user ? (
            <>
              <div className="flex h-8 w-full items-center justify-center gap-1.5 overflow-hidden rounded-full bg-purple-50 px-2 text-xs text-purple-700">
                {icons.user}
                <span className="min-w-0 truncate font-medium leading-none">{user.name || user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex h-8 w-[105px] items-center justify-center gap-1.5 rounded-full bg-red-600 px-3 text-sm font-semibold leading-none text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-100"
              >
                {icons.logout}
                <span className="leading-none">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-green-600 px-4 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-100"
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
