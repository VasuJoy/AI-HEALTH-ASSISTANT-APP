import { useEffect, useMemo, useState } from 'react'

const languageOptions = ['English', 'Hindi', 'Telugu', 'Kannada', 'Tamil']

const sampleWhatsAppMessages = [
  {
    id: 1,
    from: '+91 98765 43210',
    whatsappNumber: '919876543210',
    message: 'Hello, I need help with my symptoms: fever, headache.',
    timestamp: '2026-06-02 14:30',
    status: 'received',
    symptoms: 'fever, headache',
    language: 'English',
  },
  {
    id: 2,
    from: '+91 87654 32109',
    whatsappNumber: '918765432109',
    message: 'Hi, I need health guidance for cough and sore throat.',
    timestamp: '2026-06-02 15:45',
    status: 'received',
    symptoms: 'cough, sore throat',
    language: 'English',
  },
  {
    id: 3,
    from: '+91 76543 21098',
    whatsappNumber: '917654321098',
    message: 'I have severe chest pain, what should I do?',
    timestamp: '2026-06-02 16:20',
    status: 'received',
    symptoms: 'chest pain',
    language: 'English',
  },
]

const guidanceMap = {
  fever: {
    tablets: 'Paracetamol 500mg only if suitable for the patient, plus ORS for hydration.',
    treatment: 'Rest, drink fluids, and monitor temperature every 4 hours.',
    precautions: 'Seek medical help if fever is above 103 F, lasts more than 3 days, or comes with weakness.',
  },
  cough: {
    tablets: 'Cough syrup or throat lozenges if suitable. Paracetamol may help if fever is present.',
    treatment: 'Steam inhalation, warm fluids, and rest the voice.',
    precautions: 'Seek care for breathing difficulty, blood in cough, or persistent high fever.',
  },
  headache: {
    tablets: 'Paracetamol 500mg if suitable and not already taking conflicting medicines.',
    treatment: 'Rest in a quiet room, hydrate, and reduce screen exposure.',
    precautions: 'Urgent care is needed for sudden severe headache, fainting, or vision changes.',
  },
  chest: {
    tablets: 'Do not self-medicate for chest pain.',
    treatment: 'Sit calmly and avoid exertion while arranging urgent care.',
    precautions: 'Call 108 or visit the nearest hospital immediately.',
  },
  general: {
    tablets: 'Avoid self-medication unless advised by a qualified health worker.',
    treatment: 'Stay hydrated, rest, and track symptom duration and severity.',
    precautions: 'Consult a health worker if symptoms continue, worsen, or feel unusual.',
  },
}

function getGuidanceKey(message) {
  const normalized = message.toLowerCase()
  if (normalized.includes('chest')) return 'chest'
  if (normalized.includes('fever')) return 'fever'
  if (normalized.includes('cough') || normalized.includes('sore throat')) return 'cough'
  if (normalized.includes('headache')) return 'headache'
  return 'general'
}

function generateAIResponse(message) {
  const guidance = guidanceMap[getGuidanceKey(message)]
  return [
    'AI Health Assistant Guidance:',
    '',
    `Suggested tablets: ${guidance.tablets}`,
    '',
    `Treatment: ${guidance.treatment}`,
    '',
    `Precautions: ${guidance.precautions}`,
    '',
    'Emergency: Call 108 or visit the nearest hospital if symptoms worsen.',
  ].join('\n')
}

function speakText(text) {
  if (!window.speechSynthesis || !text.trim()) return
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-IN'
  utterance.rate = 0.92
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

export default function WhatsAppInbox({ user }) {
  const [messages, setMessages] = useState(sampleWhatsAppMessages)
  const [selectedMessage, setSelectedMessage] = useState(sampleWhatsAppMessages[0])
  const [response, setResponse] = useState('')
  const [responses, setResponses] = useState({})
  const [customMessage, setCustomMessage] = useState('')
  const [customPhone, setCustomPhone] = useState('+91 90000 00000')
  const [customLanguage, setCustomLanguage] = useState('English')

  const unreadCount = useMemo(
    () => messages.filter((message) => message.status === 'received').length,
    [messages]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const symptom = ['fever', 'cough', 'headache', 'stomach pain'][Math.floor(Math.random() * 4)]
      const newMessage = {
        id: Date.now(),
        from: '+91 ' + Math.floor(Math.random() * 9000000000 + 1000000000),
        whatsappNumber: '',
        message: `Hello, I need help with my symptoms: ${symptom}.`,
        timestamp: new Date().toLocaleString(),
        status: 'received',
        symptoms: symptom,
        language: 'English',
      }
      setMessages((prev) => [newMessage, ...prev])
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  function handleSendResponse(messageId) {
    const cleanResponse = response.trim()
    if (!cleanResponse) return

    setResponses((prev) => ({
      ...prev,
      [messageId]: cleanResponse,
    }))
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, status: 'responded' } : message
      )
    )
    setResponse('')
  }

  function handleAddCustomMessage() {
    const cleanMessage = customMessage.trim()
    const phoneDigits = customPhone.replace(/\D/g, '')
    if (!cleanMessage || phoneDigits.length < 10) return

    const newMessage = {
      id: Date.now(),
      from: customPhone,
      whatsappNumber: phoneDigits,
      message: cleanMessage,
      timestamp: new Date().toLocaleString(),
      status: 'received',
      symptoms: cleanMessage,
      language: customLanguage,
    }

    setMessages((prev) => [newMessage, ...prev])
    setCustomMessage('')
    setSelectedMessage(newMessage)
    setResponse('')
  }

  function openWhatsApp(message) {
    const text = encodeURIComponent(response || generateAIResponse(message.message))
    window.open(`https://wa.me/${message.whatsappNumber || message.from.replace(/\D/g, '')}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            WhatsApp support
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            WhatsApp Inbox
          </h1>
          {user && (
            <p className="mt-2 text-slate-600">
              Manage incoming WhatsApp messages from AI Health Assistant users.
            </p>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)_360px]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Test Message</h2>
            <div className="mt-4 space-y-3">
              <input
                type="text"
                value={customPhone}
                onChange={(event) => setCustomPhone(event.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <select
                value={customLanguage}
                onChange={(event) => setCustomLanguage(event.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {languageOptions.map((language) => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
              <textarea
                value={customMessage}
                onChange={(event) => setCustomMessage(event.target.value)}
                placeholder="Type a patient question..."
                className="h-24 w-full resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={handleAddCustomMessage}
                disabled={!customMessage.trim() || customPhone.replace(/\D/g, '').length < 10}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-slate-400"
              >
                Add to Inbox
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-950">Messages</h2>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                {unreadCount} open
              </span>
            </div>
            <div className="max-h-[640px] space-y-2 overflow-y-auto">
              {messages.map((message) => (
                <button
                  key={message.id}
                  type="button"
                  onClick={() => {
                    setSelectedMessage(message)
                    setResponse(responses[message.id] || '')
                  }}
                  className={`w-full rounded-xl p-3 text-left text-sm transition ${
                    selectedMessage?.id === message.id
                      ? 'border-2 border-green-200 bg-green-50'
                      : 'border border-transparent bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-slate-950">{message.from}</p>
                    <span className="text-xs text-slate-500">{message.timestamp.split(' ')[1] || ''}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">{message.message}</p>
                  <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    message.status === 'responded'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {message.status}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Response</h2>
            {selectedMessage ? (
              <div className="mt-4 space-y-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium text-slate-950">{selectedMessage.from}</p>
                    <p className="text-xs text-slate-500">{selectedMessage.language}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{selectedMessage.message}</p>
                </div>

                <textarea
                  value={response}
                  onChange={(event) => setResponse(event.target.value)}
                  placeholder="Type or generate a response..."
                  className="h-40 w-full resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
                />

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setResponse(generateAIResponse(selectedMessage.message))}
                    className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    AI Response
                  </button>
                  <button
                    type="button"
                    onClick={() => speakText(response || generateAIResponse(selectedMessage.message))}
                    className="rounded-xl bg-purple-600 px-3 py-2 text-xs font-semibold text-white hover:bg-purple-700"
                  >
                    Speak
                  </button>
                  <button
                    type="button"
                    onClick={() => openWhatsApp(selectedMessage)}
                    className="rounded-xl bg-[#25D366] px-3 py-2 text-xs font-semibold text-white hover:bg-[#1ebe5d]"
                  >
                    Open WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSendResponse(selectedMessage.id)}
                    disabled={!response.trim()}
                    className="rounded-xl bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-700 disabled:bg-slate-400"
                  >
                    Mark Sent
                  </button>
                </div>

                {responses[selectedMessage.id] && (
                  <div className="rounded-xl border border-green-200 bg-green-50 p-3">
                    <h3 className="text-sm font-semibold text-green-800">Sent response</h3>
                    <p className="mt-1 line-clamp-5 whitespace-pre-wrap text-xs leading-5 text-green-700">
                      {responses[selectedMessage.id]}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-8 rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">
                Select a message to respond.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
