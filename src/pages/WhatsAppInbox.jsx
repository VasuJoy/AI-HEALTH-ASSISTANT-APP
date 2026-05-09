import { useState, useEffect } from 'react'

const languageOptions = ['English', 'हिन्दी', 'తెలుగు', 'ಕನ್ನಡ', 'தமிழ்']
const languageCodeMap = {
  English: 'en',
  हिन्दी: 'hi',
  తెలుగు: 'te',
  ಕನ್ನಡ: 'kn',
  தமிழ்: 'ta',
}

const labelTranslations = {
  en: {
    guidance: 'AI Health Assistant Guidance:',
    suggested: 'Suggested tablets:',
    treatment: 'Treatment:',
    precautions: 'Precautions:',
    hospitals: 'Recommended Hospitals:',
    emergency: 'Emergency: Call 108 or visit nearest hospital if symptoms worsen.',
    generic: 'Your symptoms need a closer look. Please stay hydrated, rest, and consult a health worker if symptoms continue.',
  },
  hi: {
    guidance: 'एआई हेल्थ असिस्टेंट मार्गदर्शन:',
    suggested: 'सुझाए गए टैबलेट:',
    treatment: 'उपचार:',
    precautions: 'एहतियात:',
    hospitals: 'अनुशंसित अस्पताल:',
    emergency: 'आपातकालीन: लक्षण बिगड़ने पर 108 पर कॉल करें या निकटतम अस्पताल जाएँ।',
    generic: 'आपके लक्षणों को अधिक ध्यान से देखने की आवश्यकता है। कृपया हाइड्रेटेड रहें, आराम करें, और लक्षण बने रहने पर स्वास्थ्य कार्यकर्ता से संपर्क करें।',
  },
  te: {
    guidance: 'ఏఐ ఆరోగ్య సహాయక మార్గదర్శనం:',
    suggested: 'సూచించిన మాత్రలు:',
    treatment: 'చికిత్స:',
    precautions: 'జాగ్రత్తలు:',
    hospitals: 'సిఫార్సు చేసిన ఆసుపత్రులు:',
    emergency: 'అత్యవసర: లక్షణాలు తీవ్రత పడితే 108కి కాల్ చేయండి లేదా సమీప ఆసుపత్రికి వెళ్లండి.',
    generic: 'మీ లక్షణాలను మరింతగా పరిశీలించాలి. దయచేసి నీరు తాగండి, విశ్రాంతి తీసుకోండి, మరియు లక్షణాలు కొనసాగితే ఆరోగ్యవాణి worker ను సంప్రదించండి.',
  },
  kn: {
    guidance: 'ಏಐ ಆರೋಗ್ಯ ಸಹಾಯಕ ಮಾರ್ಗದರ್ಶನ:',
    suggested: 'ಸೂಚಿಸಿದ ಗಾಳಿ:',
    treatment: 'ಚಿಕಿತ್ಸೆ:',
    precautions: 'ಎಚ್ಚರಿಕೆಗಳು:',
    hospitals: 'ಶಿಫಾರಸು ಮಾಡಲಾದ ಆಸ್ಪತ್ರೆಗಳು:',
    emergency: 'ತೀವ್ರ ಲಕ್ಷಣಗಳಿದ್ದರೆ 108ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ಸಮೀಪದ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ.',
    generic: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಹೆಚ್ಚು ಗಮನದಿಂದ ನೋಡಬೇಕಾಗಿದೆ. ದಯವಿಟ್ಟು ಹೈಡ್ರೆಟ್ ಆಗಿ, ವಿಶ್ರಾಂತಿ ಮಾಡಿ, ಮತ್ತು ಲಕ್ಷಣಗಳು ಮುಂದುವರೆದರೆ ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
  },
  ta: {
    guidance: 'ஏஐ சுகாதார உதவியின் வழிகாட்டல்:',
    suggested: 'பரிந்துரைக்கப்பட்ட மாத்திரைகள்:',
    treatment: 'சிகிச்சை:',
    precautions: 'எச்சரிக்கைகள்:',
    hospitals: 'பரிந்துரைக்கப்பட்ட மருத்துவமனைகள்:',
    emergency: 'அவசர நிலை: அறிகுறிகள் மோசமாயின் 108-ஐ அழைக்கவும் அல்லது அருகிலுள்ள மருத்துவமனைக்கு செல்லவும்.',
    generic: 'உங்கள் அறிகுறிகளை நன்றாக பார்க்க வேண்டும். தயவுசெய்து நீர் குடித்து, ஓய்வெடுக்கவும், அறிகுறிகள் தொடர்ந்தால் பயன்பாட்டு மருத்துவரை அணுகவும்.',
  },
}

const sampleWhatsAppMessages = [
  {
    id: 1,
    from: '+91 98765 43210',
    whatsappNumber: '919876543210',
    message: 'Hello, I need help with my symptoms: fever, headache (Language: English) - from AI Health Assistant app',
    timestamp: '2024-01-15 14:30:22',
    status: 'received',
    symptoms: 'fever, headache',
    language: 'English',
  },
  {
    id: 2,
    from: '+91 87654 32109',
    whatsappNumber: '918765432109',
    message: 'Hi, I need health guidance for: cough, sore throat (from AI Health Assistant app)',
    timestamp: '2024-01-15 15:45:10',
    status: 'received',
    symptoms: 'cough, sore throat',
    language: 'English',
  },
  {
    id: 3,
    from: '+91 76543 21098',
    whatsappNumber: '917654321098',
    message: 'Hello, I need help with my symptoms: stomach pain, nausea (Language: हिन्दी) - from AI Health Assistant app',
    timestamp: '2024-01-15 16:20:05',
    status: 'received',
    symptoms: 'stomach pain, nausea',
    language: 'हिन्दी',
  },
  {
    id: 4,
    from: '+91 65432 10987',
    whatsappNumber: '916543210987',
    message: 'What medicine should I take for this cold?',
    timestamp: '2024-01-15 16:50:33',
    status: 'received',
    symptoms: 'cold',
    language: 'English',
  },
  {
    id: 5,
    from: '+91 54321 09876',
    whatsappNumber: '915432109876',
    message: 'I have severe chest pain, what should I do?',
    timestamp: '2024-01-15 17:15:44',
    status: 'received',
    symptoms: 'chest pain',
    language: 'English',
  },
  {
    id: 6,
    from: '+91 43210 98765',
    whatsappNumber: '914321098765',
    message: 'Can you recommend a good hospital near me?',
    timestamp: '2024-01-15 17:40:22',
    status: 'received',
    symptoms: 'general',
    language: 'English',
  },
  {
    id: 7,
    from: '+91 32109 87654',
    whatsappNumber: '913210987654',
    message: 'I got my COVID vaccine today, any precautions?',
    timestamp: '2024-01-15 18:05:15',
    status: 'received',
    symptoms: 'vaccination',
    language: 'English',
  },
  {
    id: 8,
    from: '+91 21098 76543',
    whatsappNumber: '912109876543',
    message: 'What should I eat to stay healthy?',
    timestamp: '2024-01-15 18:30:50',
    status: 'received',
    symptoms: 'diet',
    language: 'English',
  },
]

export default function WhatsAppInbox({ user }) {
  const [messages, setMessages] = useState(sampleWhatsAppMessages)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [response, setResponse] = useState('')
  const [responses, setResponses] = useState({})
  const [customMessage, setCustomMessage] = useState('')
  const [customPhone, setCustomPhone] = useState('+91 90000 00000')
  const [customLanguage, setCustomLanguage] = useState('English')

  useEffect(() => {
    // Simulate receiving new messages
    const interval = setInterval(() => {
      const newMessage = {
        id: messages.length + 1,
        from: '+91 ' + Math.floor(Math.random() * 9000000000 + 1000000000),
        message: 'Hello, I need help with my symptoms: ' + ['fever', 'cough', 'headache', 'stomach pain'][Math.floor(Math.random() * 4)] + ' - from AI Health Assistant app',
        timestamp: new Date().toLocaleString(),
        status: 'received',
      }
      setMessages(prev => [newMessage, ...prev])
    }, 30000) // New message every 30 seconds

    return () => clearInterval(interval)
  }, [messages.length])

  function handleSendResponse(messageId) {
    if (!response.trim()) return

    setResponses(prev => ({
      ...prev,
      [messageId]: response
    }))

    // Update message status
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, status: 'responded' }
          : msg
      )
    )

    setResponse('')
    setSelectedMessage(null)
  }

  function handleAddCustomMessage() {
    if (!customMessage.trim()) return

    const newMessage = {
      id: Math.max(...messages.map(m => m.id), 0) + 1,
      from: customPhone,
      whatsappNumber: customPhone.replace(/\D/g, ''),
      message: customMessage,
      timestamp: new Date().toLocaleString(),
      status: 'received',
      symptoms: 'custom',
      language: customLanguage,
    }

    setMessages(prev => [newMessage, ...prev])
    setCustomMessage('')
    setSelectedMessage(newMessage)
  }

  function getLanguageCode(languageLabel) {
    return languageCodeMap[languageLabel] || 'en'
  }

  function translateTemplate(text, languageLabel) {
    const code = getLanguageCode(languageLabel)
    const labels = labelTranslations[code] || labelTranslations.en
    return text
      .replace('AI Health Assistant Guidance:', labels.guidance)
      .replace('Suggested tablets:', labels.suggested)
      .replace('Treatment:', labels.treatment)
      .replace('Precautions:', labels.precautions)
      .replace('Recommended Hospitals:', labels.hospitals)
      .replace('Emergency: Call 108 or visit nearest hospital if symptoms worsen.', labels.emergency)
      .replace('Your symptoms need a closer look. Please stay hydrated, rest, and consult a health worker if symptoms continue.', labels.generic)
  }

  function speakText(text, languageLabel = 'English') {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = languageCodeMap[languageLabel] ? `${languageCodeMap[languageLabel]}-IN` : 'en-IN'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  function generateGuidance(symptoms, languageLabel) {
    const guidance = {
      fever: {
        tablets: 'Paracetamol 500mg - 1 tablet every 6 hours',
        treatment: 'Rest in bed, drink plenty of fluids (water, coconut water, ORS)',
        precautions: 'Monitor temperature every 4 hours. Seek medical help if fever >103°F or persists >3 days',
        hospitals: 'Apollo Hospital, Max Healthcare, Fortis Hospital',
      },
      headache: {
        tablets: 'Paracetamol 500mg - 1 tablet every 6 hours',
        treatment: 'Rest in dark room, apply cold compress on forehead',
        precautions: 'Avoid bright screens, loud noise. Stay hydrated. Consult doctor if severe or frequent',
        hospitals: 'Neurology Clinic, City Hospital, Medical Center',
      },
      cough: {
        tablets: 'Cough syrup with dextromethorphan - 10ml every 6 hours',
        treatment: 'Drink warm water with honey and lemon, steam inhalation',
        precautions: 'Rest voice, avoid smoke/cold drinks. Seek help if cough with blood or breathing difficulty',
        hospitals: 'Chest Clinic, Respiratory Center, General Hospital',
      },
      'stomach pain': {
        tablets: 'Antacid (if acidity) or ORS packets',
        treatment: 'Eat light foods, avoid spicy/oily foods, drink electrolyte water',
        precautions: 'Rest, avoid heavy meals. Seek immediate help if severe pain, vomiting blood, or dehydration',
        hospitals: 'Gastroenterology Center, Emergency Hospital, Medical Institute',
      },
      'sore throat': {
        tablets: 'Throat lozenges, Paracetamol if fever',
        treatment: 'Gargle with warm salt water, drink warm fluids',
        precautions: 'Rest voice, avoid cold drinks. Consult ENT if persists >5 days',
        hospitals: 'ENT Clinic, Throat Specialist, General Hospital',
      },
      diabetes: {
        tablets: 'Diabetes medication as prescribed, Metformin, Insulin if already prescribed',
        treatment: 'Eat small frequent meals, avoid excess sugar, and monitor blood glucose closely',
        precautions: 'Do not skip medications, avoid sugary foods, stay hydrated',
        hospitals: 'Diabetes Care Center, Endocrinology Department',
      },
      hypertension: {
        tablets: 'Amlodipine or Telmisartan if already prescribed',
        treatment: 'Reduce salt intake, exercise gently, and monitor blood pressure daily',
        precautions: 'Avoid too much caffeine, manage stress, and keep calm',
        hospitals: 'Cardiac Care Unit, General Hospital',
      },
      vitamin: {
        tablets: 'Iron supplement, Vitamin D drops, Calcium tablet',
        treatment: 'Eat leafy greens, dairy, and get sunlight for vitamin D',
        precautions: 'Avoid tea with meals, take supplements with food, watch energy levels',
        hospitals: 'Nutrition Clinic, Wellness Center',
      },
    }

    const symptom = symptoms.toLowerCase()
    for (const [key, value] of Object.entries(guidance)) {
      if (symptom.includes(key)) {
        const message = `AI Health Assistant Guidance:

Suggested tablets:
• ${value.tablets}

Treatment:
${value.treatment}

Precautions:
• ${value.precautions}

Recommended Hospitals:
${value.hospitals}

Emergency: Call 108 or visit nearest hospital if symptoms worsen.

For voice guidance, reply "VOICE" to this message.`
        return translateTemplate(message, languageLabel)
      }
    }

    const generic = `AI Health Assistant:

Your symptoms need a closer look. Please stay hydrated, rest, and consult a health worker if symptoms continue.

For voice assistance, reply "VOICE" to this message.`
    return translateTemplate(generic, languageLabel)
  }

  function generateAIResponse(userMessage, languageLabel = 'English') {
    const msg = userMessage.toLowerCase()
    const guidanceKeywords = ['fever', 'cough', 'headache', 'stomach pain', 'nausea', 'sore throat', 'cold', 'flu', 'infection', 'diabetic', 'diabetes', 'pregnancy', 'pregnant', 'bp', 'blood pressure', 'vitamin', 'deficiency', 'nutrition', 'asthma', 'dengue', 'malaria', 'chest pain', 'urine', 'depress', 'anxiety']
    const foundKeyword = guidanceKeywords.find((keyword) => msg.includes(keyword))

    if (foundKeyword) {
      return generateGuidance(foundKeyword, languageLabel)
    }

    if (msg.includes('doctor') || msg.includes('hospital') || msg.includes('appointment')) {
      const doctorText = `AI Health Assistant:\n\nNeed to see a doctor?\n\nRecommended Hospitals:\n- Apollo Hospital (Multi-specialty)\n- Max Healthcare (Emergency + General)\n- Fortis Hospital (24/7 Services)\n- City Medical Center (General Practice)\n\nEmergency: Call 108 or your nearest emergency number\n\nPlease describe your symptoms if you need specific department recommendations. 📞`
      return translateTemplate(doctorText, languageLabel)
    }

    if (msg.includes('emergency') || msg.includes('urgent') || msg.includes('critical')) {
      const emergencyText = `AI Health Assistant - URGENT:\n\nCALL 108 IMMEDIATELY if experiencing:\n- Severe chest pain\n- Difficulty breathing\n- Unconsciousness\n- Severe bleeding\n- Severe allergic reaction\n\nNearby Hospitals (24/7 Emergency):\n- Emergency Ward: +91-XXX-XXXX-XXXX\n- Ambulance Service: 108\n- Police/Rescue: 100\n\nYour safety is our priority! 🚑`
      return translateTemplate(emergencyText, languageLabel)
    }

    const defaultText = `AI Health Assistant:\n\nThank you for reaching out! I can help with:\n✅ Symptom diagnosis and guidance\n✅ Medicine recommendations\n✅ Hospital and doctor recommendations\n✅ Health tips and preventive care\n✅ Emergency medical advice\n\nPlease tell me:\n- What symptoms are you experiencing?\n- How long have you had them?\n- Any other health concerns?\n\nI'm here to help! 💚`
    return translateTemplate(defaultText, languageLabel)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <span className="text-green-600">📱</span> WhatsApp Inbox
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
              +91 6036 000 091
            </span>
          </h1>
          {user && (
            <p className="text-slate-600">
              Manage incoming WhatsApp messages from AI Health Assistant users
            </p>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Test Message Input */}
          <div className="bg-white rounded-3xl shadow-lg p-6 lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>➕</span> Test Message
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Language
                </label>
                <select
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languageOptions.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Type any question..."
                  className="w-full border border-slate-300 rounded-lg p-2 h-20 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleAddCustomMessage}
                disabled={!customMessage.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-3 py-2 rounded-lg font-medium text-sm"
              >
                ➕ Add to Inbox
              </button>

              <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                Test AI responses with custom messages
              </p>
            </div>
          </div>
          {/* Messages List */}
          <div className="bg-white rounded-3xl shadow-lg p-6 lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>💬</span> Messages
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {messages.filter(m => m.status === 'received').length}
              </span>
            </h2>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-3 rounded-xl cursor-pointer transition text-sm ${
                    selectedMessage?.id === message.id
                      ? 'bg-green-50 border-2 border-green-200'
                      : 'bg-slate-50 hover:bg-slate-100'
                  } ${message.status === 'responded' ? 'opacity-70' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium text-slate-900 text-xs">{message.from}</div>
                    <div className="text-xs text-slate-500">{message.timestamp.split(' ')[1]}</div>
                  </div>
                  <p className="text-xs text-slate-700 line-clamp-2">{message.message}</p>
                  <div className="mt-1 flex items-center gap-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      message.status === 'received'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {message.status}
                    </span>
                    {responses[message.id] && (
                      <span className="text-xs text-slate-500">✓</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Panel */}
          <div className="bg-white rounded-3xl shadow-lg p-6 lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>📝</span> Response
            </h2>

            {selectedMessage ? (
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium text-slate-900 text-sm">{selectedMessage.from}</div>
                    <div className="text-xs text-slate-500">{selectedMessage.timestamp}</div>
                  </div>
                  <p className="text-sm text-slate-700">{selectedMessage.message}</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Your Response
                  </label>
                  <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response..."
                    className="w-full border border-slate-300 rounded-lg p-2 h-24 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => setResponse(generateAIResponse(selectedMessage.message, selectedMessage.language || 'English'))}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs font-medium"
                    >
                      🤖 AI Response
                    </button>
                    <button
                      onClick={() => setResponse(generateGuidance(selectedMessage.symptoms || 'general', selectedMessage.language || 'English'))}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-xs font-medium"
                    >
                      💊 Medical
                    </button>
                    <button
                      onClick={() => speakText(response || generateAIResponse(selectedMessage.message, selectedMessage.language || 'English'), selectedMessage.language || 'English')}
                      type="button"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-xs font-medium"
                    >
                      🔊 Speak
                    </button>
                    <button
                      onClick={() => handleSendResponse(selectedMessage.id)}
                      disabled={!response.trim()}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white px-3 py-1 rounded-lg text-xs font-medium"
                    >
                      Send
                    </button>
                  </div>
                </div>

                {responses[selectedMessage.id] && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <h3 className="font-medium text-green-800 text-sm mb-1">✓ Sent</h3>
                    <p className="text-xs text-green-700 whitespace-pre-wrap line-clamp-4">
                      {responses[selectedMessage.id]}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <div className="text-3xl mb-2">👆</div>
                <p className="text-sm">Select a message</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span>ℹ️</span> How It Works
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-slate-900 mb-2">🤖 AI Response</h3>
              <p className="text-sm text-slate-600">Automatically generates intelligent responses based on patient messages using AI.</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-slate-900 mb-2">💊 Medical Guidance</h3>
              <p className="text-sm text-slate-600">Provides structured medical guidance with medicines, treatment, precautions, and hospitals.</p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <h3 className="font-medium text-slate-900 mb-2">📱 Multi-Chat Support</h3>
              <p className="text-sm text-slate-600">Handle multiple patient conversations simultaneously with custom test messages.</p>
            </div>
          </div>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              💡 <strong>Tip:</strong> Use the "Test Message" section to add custom patient queries and see how the AI responds to any health-related question!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
