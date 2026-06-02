import { useEffect, useRef, useState } from 'react'

const symptomRules = [
  {
    keywords: ['fever', 'temperature', 'chills', 'bukhar', 'taap'],
    summary: 'Your symptoms look like a fever or mild infection. Rest, hydrate, and monitor your temperature carefully.',
    tablets: ['Paracetamol 500mg', 'ORS sachet', 'Ibuprofen if needed for pain'],
    treatment: 'Take warm fluids and light meals. Apply a cool compress if fever is high. Seek medical care if fever persists beyond 48 hours.',
    precautions: ['Drink plenty of water', 'Avoid cold foods and alcohol', 'Rest and avoid crowded places'],
  },
  {
    keywords: ['cough', 'sore throat', 'throat pain', 'khansi', 'gala'],
    summary: 'This appears to be a cough or throat infection. Keep your throat moist and avoid smoke or dust.',
    tablets: ['Cough syrup with dextromethorphan', 'Throat lozenges', 'Paracetamol for pain'],
    treatment: 'Drink warm ginger tea with honey, rest your voice, and use steam inhalation.',
    precautions: ['Avoid spicy foods', 'Stay hydrated', 'Gargle with salt water regularly'],
  },
  {
    keywords: ['headache', 'migraine', 'sar dard', 'thala vedu', 'mane'],
    summary: 'Your symptoms point to a headache. Rest in a quiet, dark room.',
    tablets: ['Paracetamol', 'Ibuprofen', 'Aspirin if not contraindicated'],
    treatment: 'Reduce screen time, drink water, and apply a cool compress.',
    precautions: ['Avoid loud noise', 'Keep hydrated', 'Do not skip meals'],
  },
]

function analyzeSymptoms(text) {
  const normalized = text.toLowerCase()
  const match = symptomRules.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword))
  )

  if (!match) {
    return {
      summary: 'Your symptoms need a closer look. Please stay hydrated, rest, and consult a health worker if symptoms continue.',
      tablets: ['Paracetamol for pain or fever', 'ORS for dehydration'],
      treatment: 'Rest, drink plenty of fluids, and monitor your symptoms.',
      precautions: ['Avoid self-medicating too much', 'Stay hydrated', 'Get help if symptoms worsen'],
    }
  }

  return match
}

function formatBotMessage(analysis) {
  return [
    analysis.summary,
    '',
    'Suggested tablets:',
    ...analysis.tablets.map((tablet) => `- ${tablet}`),
    '',
    'Treatment:',
    analysis.treatment,
    '',
    'Precautions:',
    ...analysis.precautions.map((item) => `- ${item}`),
    '',
    'Emergency: Call 108 or visit the nearest hospital if symptoms worsen.',
  ].join('\n')
}

export default function WhatsAppChat({ user }) {
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      type: 'bot',
      text: 'Hello! Welcome to AI Health Assistant. Please describe your symptoms.',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSendMessage() {
    const messageText = input.trim()
    if (!messageText || loading) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'user',
        text: messageText,
        timestamp: new Date(),
      },
    ])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const analysis = analyzeSymptoms(messageText)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: 'bot',
          text: formatBotMessage(analysis),
          timestamp: new Date(),
        },
      ])
      setLoading(false)
    }, 700)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  function openWhatsAppChat() {
    const symptomsList = messages
      .filter((message) => message.type === 'user')
      .map((message) => message.text)
      .join(', ')
    const whatsappText = encodeURIComponent(
      `Hi, I need health guidance for: ${symptomsList || 'general health query'} (from AI Health Assistant app)`
    )
    window.open(`https://wa.me/9160360091?text=${whatsappText}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-3xl flex-col px-4 py-6 sm:px-6">
        <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-slate-950">WhatsApp Health Chat</h1>
              {user && (
                <p className="mt-1 truncate text-sm text-slate-600">
                  Chat with {user.name || user.email}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={openWhatsAppChat}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#25D366] px-4 text-sm font-semibold text-white transition hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-emerald-100"
            >
              Open in WhatsApp
            </button>
          </div>
        </div>

        <div className="mb-4 flex-1 space-y-4 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'rounded-br-md bg-green-600 text-white'
                    : 'rounded-bl-md bg-slate-100 text-slate-900'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
                <p className={`mt-2 text-xs ${message.type === 'user' ? 'text-green-100' : 'text-slate-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-sm text-slate-600">
                Preparing guidance...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your symptoms, for example fever, cough, headache..."
              className="min-h-[92px] flex-1 resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-100"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-green-600 px-6 font-semibold text-white transition hover:bg-green-700 disabled:bg-slate-400 sm:h-auto"
            >
              Send
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">
            Tip: Click "Open in WhatsApp" to continue this conversation on WhatsApp.
          </p>
        </div>
      </div>
    </div>
  )
}
