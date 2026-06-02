import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Voice-first symptom capture',
    description: 'Speak in your local language and get health guidance without typing.',
    cardClass: 'border-amber-200 bg-amber-50',
    titleClass: 'text-amber-900',
    textClass: 'text-amber-950',
  },
  {
    title: 'Trusted recommendations',
    description: 'We suggest safe tablets, treatment, and precautions based on your symptoms.',
    cardClass: 'border-emerald-200 bg-emerald-50',
    titleClass: 'text-emerald-900',
    textClass: 'text-emerald-950',
  },
  {
    title: 'Local clinic and hospital guidance',
    description: 'Get nearby care provider suggestions using location-aware recommendations.',
    cardClass: 'border-blue-200 bg-blue-50',
    titleClass: 'text-blue-900',
    textClass: 'text-blue-950',
  },
  {
    title: 'Multilingual support',
    description: 'Supports English, Hindi, Telugu, Kannada, Tamil and local dialects.',
    cardClass: 'border-purple-200 bg-purple-50',
    titleClass: 'text-purple-900',
    textClass: 'text-purple-950',
  },
]

export default function Home({ user }) {
  return (
    <div className="min-h-screen bg-emerald-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-10 grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-800">
              Designed for underserved communities
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Health guidance that understands your language and context.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Voice- and text-based AI that helps users in India get reliable health suggestions, safe tablet guidance, and nearby clinic referrals without English barriers.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {user ? (
                <>
                  <Link
                    to="/chat"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                  >
                    Start symptom chat
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                  >
                    View dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-green-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-100"
                  >
                    Register now
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-100"
                  >
                    Log in
                  </Link>
                </>
              )}
              <Link
                to="/insights"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
              >
                View insights
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-emerald-950 p-6 text-white shadow-xl shadow-emerald-950/15 sm:p-8">
            <div className="space-y-6">
              <div className="rounded-xl bg-white/10 p-5 ring-1 ring-white/10">
                <h2 className="text-xl font-semibold">Why this matters</h2>
                <p className="mt-3 text-emerald-50">
                  Many users are connected but still cut off from trustworthy health advice because most systems are English-first and text-heavy.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-xl bg-white/10 p-5 ring-1 ring-white/10">
                  <p className="font-semibold">Speak in your language</p>
                  <p className="mt-2 text-sm text-emerald-50">Voice-first guidance for low-literacy and regional language users.</p>
                </div>
                <div className="rounded-xl bg-white/10 p-5 ring-1 ring-white/10">
                  <p className="font-semibold">Health advice you can trust</p>
                  <p className="mt-2 text-sm text-emerald-50">Clear precautions, treatment ideas, and care escalation help people act safely.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${feature.cardClass}`}
            >
              <h3 className={`mb-3 text-lg font-bold ${feature.titleClass}`}>{feature.title}</h3>
              <p className={`leading-7 ${feature.textClass}`}>{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-sky-900 mb-4">How it helps users</h2>
            <ul className="space-y-4 text-sky-950">
              <li>Non-English speakers get local-language AI health guidance.</li>
              <li>Low-literacy users can use voice and simple text flows.</li>
              <li>Users receive safe tablet suggestions and self-care precautions.</li>
              <li>Nearby hospital recommendations make care easier to find.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-violet-900 mb-4">What makes this different</h2>
            <ul className="space-y-4 text-violet-950">
              <li>Voice-first experience for regional languages and dialects.</li>
              <li>Simple triage logic built around early-stage symptom support.</li>
              <li>WhatsApp connectivity for follow-up and trusted channels.</li>
              <li>Designed for PHC kiosks, community centers, and on-the-go mobile users.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
