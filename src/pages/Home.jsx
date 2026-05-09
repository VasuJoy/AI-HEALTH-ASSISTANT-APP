import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Voice-first symptom capture',
    description: 'Speak in your local language and get health guidance without typing.',
  },
  {
    title: 'Trusted recommendations',
    description: 'We suggest safe tablets, treatment, and precautions based on your symptoms.',
  },
  {
    title: 'Local clinic and hospital guidance',
    description: 'Get nearby care provider suggestions using location-aware recommendations.',
  },
  {
    title: 'Multilingual support',
    description: 'Supports English, Hindi, Telugu, Kannada, Tamil and local dialects.',
  },
]

export default function Home({ user }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl p-8">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] items-center mb-10">
          <div>
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-800">
              Designed for underserved communities
            </span>
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900">
              Health guidance that understands your language and context.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Voice- and text-based AI that helps users in India get reliable health suggestions, safe tablet guidance, and nearby clinic referrals without English barriers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {user ? (
                <>
                  <Link
                    to="/chat"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                  >
                    Start symptom chat
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                  >
                    View dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
                  >
                    Register now
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                  >
                    Log in
                  </Link>
                </>
              )}
              <Link
                to="/insights"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Review product insight
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-10 text-white shadow-2xl">
            <div className="space-y-6">
              <div className="rounded-3xl bg-white/10 p-6">
                <h2 className="text-xl font-semibold">Why this matters</h2>
                <p className="mt-3 text-slate-200">
                  Many users are connected but still cut off from trustworthy health advice because most systems are English-first and text-heavy.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="font-semibold">Speak in your language</p>
                  <p className="mt-2 text-sm text-slate-200">Voice-first guidance for low-literacy and regional language users.</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="font-semibold">Health advice you can trust</p>
                  <p className="mt-2 text-sm text-slate-200">Clear precautions, treatment ideas, and care escalation help people act safely.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-4 mb-10">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-3xl bg-white p-6 shadow-sm hover:-translate-y-1 transition-transform">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-7">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">How it helps users</h2>
            <ul className="space-y-4 text-slate-700">
              <li>Non-English speakers get local-language AI health guidance.</li>
              <li>Low-literacy users can use voice and simple text flows.</li>
              <li>Users receive safe tablet suggestions and self-care precautions.</li>
              <li>Nearby hospital recommendations make care easier to find.</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">What makes this different</h2>
            <ul className="space-y-4 text-slate-700">
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
