const hospitals = [
  {
    name: 'City Medical Center',
    address: '45 Oak Street, Downtown',
    phone: '+1 555-0101',
    hours: 'Open 24/7',
  },
  {
    name: 'Riverfront Hospital',
    address: '120 River Rd, Midtown',
    phone: '+1 555-0144',
    hours: '8 AM – 10 PM',
  },
  {
    name: 'Green Valley Clinic',
    address: '210 Park Ave, Uptown',
    phone: '+1 555-0188',
    hours: '9 AM – 8 PM',
  },
  {
    name: 'Lakeside Health Hub',
    address: '18 Lakeview Blvd',
    phone: '+1 555-0222',
    hours: '7 AM – 11 PM',
  },
]

export default function Dashboard({ user }) {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Healthcare Dashboard</h1>
        {user && (
          <p className="text-slate-600">
            Dashboard for <span className="font-semibold">{user.name || user.email}</span>
          </p>
        )}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Nearby Hospitals</h2>
          <p className="text-slate-600 mb-4">
            Use the symptom chat to get instant recommendations and nearby provider suggestions based on your symptoms.
          </p>
          <div className="grid gap-4">
            {hospitals.map((hospital) => (
              <div key={hospital.name} className="rounded-2xl border p-4 bg-slate-50">
                <h3 className="text-lg font-semibold">{hospital.name}</h3>
                <p className="text-sm text-slate-600">{hospital.address}</p>
                <p className="text-sm text-slate-600 mt-2">Phone: {hospital.phone}</p>
                <p className="text-sm text-slate-500 mt-1">Hours: {hospital.hours}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Your Care Summary</h2>
          <p className="text-slate-600 mb-4">
            This dashboard highlights nearby care options and links you directly to support channels like WhatsApp for quick follow-up.
          </p>
          <div className="space-y-4">
            <div className="rounded-2xl border p-4 bg-slate-50">
              <h3 className="font-semibold">Language support</h3>
              <p className="text-sm text-slate-600 mt-1">
                Select your preferred language in the symptom chat to get guidance in English, Español, हिन्दी or தமிழ்.
              </p>
            </div>
            <div className="rounded-2xl border p-4 bg-slate-50">
              <h3 className="font-semibold">WhatsApp access</h3>
              <p className="text-sm text-slate-600 mt-1">
                Use the WhatsApp chat button in the symptom page to connect with support using your symptom summary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
