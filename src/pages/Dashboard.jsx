const hospitals = [
  {
    name: 'City Medical Center',
    address: '45 Oak Street, Downtown, Pune',
    phone: '+91 20 4000 0101',
    hours: 'Open 24/7',
    type: 'Emergency care',
  },
  {
    name: 'Riverfront Hospital',
    address: '120 River Rd, Vizag',
    phone: '+91 891 400 0144',
    hours: '8 AM - 10 PM',
    type: 'General hospital',
  },
  {
    name: 'Green Valley Clinic',
    address: '210 Park Ave, Chennai',
    phone: '+91 44 4000 0188',
    hours: '9 AM - 8 PM',
    type: 'Primary clinic',
  },
  {
    name: 'Lakeside Health Hub',
    address: '18 Lakeview Blvd, Kolkata',
    phone: '+91 33 4000 0222',
    hours: '7 AM - 11 PM',
    type: 'Community health',
  },
]

const summaryCards = [
  { label: 'Supported languages', value: '5', helper: 'English, Hindi, Telugu, Kannada, Tamil' },
  { label: 'Care escalation', value: '108', helper: 'Emergency helpline reminder' },
  { label: 'Support channels', value: '3', helper: 'Chat, voice, and WhatsApp' },
]

export default function Dashboard({ user }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Care overview
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Healthcare Dashboard
          </h1>
          {user && (
            <p className="mt-2 text-slate-600">
              Dashboard for <span className="font-semibold">{user.name || user.email}</span>
            </p>
          )}
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          Severe symptoms: call 108 or visit the nearest hospital.
        </div>
      </div>

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">{card.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.helper}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950">Nearby Hospitals</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Use symptom chat for location-aware provider suggestions and next steps.
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              India network
            </span>
          </div>

          <div className="grid gap-4">
            {hospitals.map((hospital) => (
              <div key={hospital.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">{hospital.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{hospital.address}</p>
                  </div>
                  <span className="w-fit rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                    {hospital.type}
                  </span>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                  <p>Phone: {hospital.phone}</p>
                  <p>Hours: {hospital.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-semibold text-slate-950">Your Care Summary</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This dashboard connects symptom guidance, nearby care options, and WhatsApp support in one place.
            </p>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <h3 className="font-semibold text-slate-950">Language support</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Select a preferred language in symptom chat for English, Hindi, Telugu, Kannada, or Tamil voice input.
                </p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <h3 className="font-semibold text-slate-950">WhatsApp access</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  The symptom page can open WhatsApp with your symptom summary for quick follow-up.
                </p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                <h3 className="font-semibold text-slate-950">Safety note</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  AI guidance is informational and should not replace a qualified doctor or health worker.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
