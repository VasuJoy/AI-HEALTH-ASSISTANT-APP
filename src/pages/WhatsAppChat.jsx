import { useState, useRef, useEffect } from 'react'

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
      title: 'General guidance',
      summary: 'Your symptoms need a closer look. Please stay hydrated, rest, and consult a health worker if symptoms continue.',
      tablets: ['Paracetamol for pain or fever', 'ORS for dehydration'],
      treatment: 'Rest, drink plenty of fluids, and monitor your symptoms.',
      precautions: ['Avoid self-medicating too much', 'Stay hydrated', 'Get help if symptoms worsen'],
    }
  }

  return {
    title: 'Recommended next steps',
    summary: match.summary,
    tablets: match.tablets,
    treatment: match.treatment,
    precautions: match.precautions,
  }
}

export default function WhatsAppChat({ user }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! 👋 Welcome to AI Health Assistant. How can I help you today? Please describe your symptoms.',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  function handleSendMessage() {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulate bot response delay
    setTimeout(() => {
      const analysis = analyzeSymptoms(input)
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: `${analysis.summary}\n\n💊 Suggested tablets:\n${analysis.tablets.map((t) => `• ${t}`).join('\n')}\n\n🏥 Treatment:\n${analysis.treatment}\n\n⚠️ Precautions:\n${analysis.precautions.map((p) => `• ${p}`).join('\n')}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setLoading(false)
    }, 1000)
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  function openWhatsAppChat() {
    const symptomsList = messages
      .filter((m) => m.type === 'user')
      .map((m) => m.text)
      .join(', ')

    const whatsappText = encodeURIComponent(
      `Hi, I need health guidance for: ${symptomsList || 'general health query'} (from AI Health Assistant app)`
    )
    const whatsappLink = `https://wa.me/9160360091?text=${whatsappText}`
    window.open(whatsappLink, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <div className="max-w-2xl mx-auto p-4 h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white rounded-t-3xl shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-green-600">💬</span> WhatsApp Health Chat
              </h1>
              {user && (
                <p className="text-sm text-slate-600 mt-1">
                  Chat with {user.name || user.email}
                </p>
              )}
            </div>
            <button
              onClick={openWhatsAppChat}
              className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-4 py-2 rounded-full flex items-center gap-2"
            >
              <span>📱</span> Open in WhatsApp
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-6 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-3xl ${
                  message.type === 'user'
                    ? 'bg-green-600 text-white rounded-br-none'
                    : 'bg-slate-100 text-slate-900 rounded-bl-none'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.text}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    message.type === 'user'
                      ? 'text-green-100'
                      : 'text-slate-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-900 px-4 py-3 rounded-3xl rounded-bl-none">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-3xl shadow-sm p-4 flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe your symptoms... (e.g., fever, cough, headache)"
            className="flex-1 border border-slate-300 rounded-2xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            rows="3"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white px-6 py-3 rounded-2xl font-medium flex items-center justify-center transition h-fit"
          >
            <span className="text-xl">📤</span>
          </button>
        </div>

        {/* Info Footer */}
        <div className="text-center mt-4 text-xs text-slate-500">
          <p>💡 Tip: Click "Open in WhatsApp" to continue this conversation on WhatsApp</p>
        </div>
      </div>
    </div>
  )
}
