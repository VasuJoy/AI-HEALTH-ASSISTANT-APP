import { useEffect, useMemo, useRef, useState } from 'react'

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'te', label: 'తెలుగు' },
  { value: 'kn', label: 'ಕನ್ನಡ' },
  { value: 'ta', label: 'தமிழ்' },
]

const voiceLocales = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  ta: 'ta-IN',
}

const hospitalList = [
  {
    name: 'City Medical Center',
    address: '45 Oak Street, Downtown, Pune',
    phone: '+91 20 4000 0101',
    lat: 18.5204,
    lon: 73.8567,
  },
  {
    name: 'Riverfront Hospital',
    address: '120 River Rd, Vizag',
    phone: '+91 891 400 0144',
    lat: 17.6868,
    lon: 83.2185,
  },
  {
    name: 'Green Valley Clinic',
    address: '210 Park Ave, Chennai',
    phone: '+91 44 4000 0188',
    lat: 13.0827,
    lon: 80.2707,
  },
  {
    name: 'Lakeside Health Hub',
    address: '18 Lakeview Blvd, Kolkata',
    phone: '+91 33 4000 0222',
    lat: 22.5726,
    lon: 88.3639,
  },
  {
    name: 'Capital Care Hospital',
    address: '50 Central Rd, New Delhi',
    phone: '+91 11 4000 0450',
    lat: 28.6139,
    lon: 77.2090,
  },
  {
    name: 'Bayview Health Centre',
    address: '33 Sea View Lane, Vizag',
    phone: '+91 891 400 0333',
    lat: 17.6868,
    lon: 83.2185,
  },
]

const conditionRules = [
  {
    keywords: ['fever', 'temperature', 'chills', 'bukhar', 'taap', 'taapmaan', 'bukhar ho raha hai'],
    title: 'Fever / Infection',
    summary:
      'Your symptoms look like a fever or mild infection. Rest, hydrate, and monitor your temperature carefully.',
    tablets: ['Paracetamol 500mg', 'ORS sachet', 'Ibuprofen if needed for pain'],
    treatment:
      'Take warm fluids and light meals. Apply a cool compress if fever is high. Seek medical care if fever persists beyond 48 hours or if you feel weak.',
    precautions: ['Drink plenty of water', 'Avoid cold foods and alcohol', 'Rest and avoid crowded places'],
  },
  {
    keywords: ['cough', 'sore throat', 'throat pain', 'khansi', 'gala', 'gala dard'],
    title: 'Cough / Throat Infection',
    summary:
      'This appears to be a cough or throat infection. Keep your throat moist and avoid smoke or dust.',
    tablets: ['Cough syrup with dextromethorphan', 'Throat lozenges', 'Paracetamol for pain'],
    treatment:
      'Drink warm ginger tea with honey, rest your voice, and use steam inhalation. Visit a doctor if the cough is severe or breathing becomes difficult.',
    precautions: ['Avoid spicy foods', 'Stay hydrated', 'Gargle with salt water regularly'],
  },
  {
    keywords: ['headache', 'migraine', 'pain behind eyes', 'sar dard', 'thala vedu', 'mane', 'mugu'],
    title: 'Headache / Migraine',
    summary:
      'Your symptoms point to a headache or migraine trigger. Rest in a quiet, dark room.',
    tablets: ['Paracetamol', 'Ibuprofen', 'Aspirin if not contraindicated'],
    treatment:
      'Reduce screen time, drink water, and apply a cool compress. If headache is severe or recurring, consult a physician.',
    precautions: ['Avoid loud noise', 'Keep hydrated', 'Do not skip meals'],
  },
  {
    keywords: ['pregnancy', 'pregnant', 'pregnant woman', 'baby bump', 'gusta', 'garbhadharan', 'hamil', 'garbha'],
    title: 'Pregnancy Care',
    summary:
      'These symptoms may be related to pregnancy. Focus on gentle care, nutrition, and regular checkups.',
    tablets: ['Iron folic acid tablet', 'Calcium supplement', 'Multivitamin with folate'],
    treatment:
      'Eat balanced meals with lentils, green vegetables, fruits, and dairy. Keep regular antenatal visits and rest well.',
    precautions: ['Avoid heavy lifting', 'Stay hydrated', 'Report any bleeding or severe pain to a doctor'],
  },
  {
    keywords: ['diabet', 'blood sugar', 'sugar level', 'insulin', 'diabetic', 'type 2 diabetes', 'type 1 diabetes'],
    title: 'Diabetes Management',
    summary:
      'This looks like diabetes-related symptoms. Keep your blood sugar under control and follow dietary guidance.',
    tablets: ['Metformin (as prescribed)', 'Glimepiride (as prescribed)', 'Insulin if already prescribed'],
    treatment:
      'Eat small frequent meals, avoid high-sugar foods, and monitor your glucose regularly. Stay active and consult your doctor for a personalized plan.',
    precautions: ['Avoid sweets and high-carb drinks', 'Stay hydrated', 'Do not skip medications'],
  },
  {
    keywords: ['bp', 'blood pressure', 'hypertension', 'hypertensive'],
    title: 'Hypertension / BP',
    summary:
      'These symptoms may be linked to high blood pressure. Monitor your pressure and reduce stress.',
    tablets: ['Amlodipine (as prescribed)', 'Telmisartan (as prescribed)', 'Low-dose aspirin if advised'],
    treatment:
      'Reduce salt in your diet, eat more vegetables, and take regular walks. Keep calm and see a doctor if pressure remains high.',
    precautions: ['Avoid processed foods', 'Limit caffeine', 'Check your BP regularly'],
  },
  {
    keywords: ['vitamin', 'deficiency', 'iron', 'calcium', 'vit d', 'vitamin d', 'anemia', 'lack of energy', 'weakness'],
    title: 'Vitamin / Mineral Deficiency',
    summary:
      'These symptoms may be connected to vitamin or mineral deficiency. Good diet and supplements can help.',
    tablets: ['Iron supplement', 'Vitamin D drops', 'Calcium tablet'],
    treatment:
      'Eat leafy greens, beans, dairy, and get sunlight exposure for vitamin D. Consider supplements after consulting a health worker.',
    precautions: ['Avoid too much tea or coffee with meals', 'Take supplements with meals', 'Monitor energy levels and appetite'],
  },
  {
    keywords: ['asthma', 'wheezing', 'shortness of breath', 'breathing difficulty', 'breathless'],
    title: 'Asthma / Respiratory',
    summary:
      'Your symptoms look like a respiratory issue, such as asthma. Avoid triggers and keep inhalers ready.',
    tablets: ['Salbutamol inhaler', 'Steroid inhaler (as prescribed)', 'Antihistamine if allergy is present'],
    treatment:
      'Stay away from dust, smoke and cold air. Use your inhaler as directed and seek urgent care if breathing worsens.',
    precautions: ['Avoid smoke and pollution', 'Keep calm while breathing slowly', 'Seek help if wheezing increases'],
  },
  {
    keywords: ['covid', 'corona', 'coronavirus', 'loss of smell', 'loss of taste', 'sore throat'],
    title: 'COVID-19 / Viral Infection',
    summary:
      'These symptoms may indicate a viral infection like COVID-19. Isolate and monitor your health closely.',
    tablets: ['Paracetamol for fever', 'Cough syrup if needed', 'Vitamin C supplement'],
    treatment:
      'Rest, hydrate, and isolate from others. Get tested if symptoms persist or worsen, and seek care if breathing difficulty occurs.',
    precautions: ['Wear a mask around others', 'Wash hands frequently', 'Avoid crowded places'],
  },
  {
    keywords: ['dengue', 'malaria', 'platelets', 'rash', 'joint pain', 'body ache', 'fever with chills'],
    title: 'Dengue / Malaria',
    summary:
      'This could be a mosquito-borne illness such as dengue or malaria. Seek medical testing and supportive care.',
    tablets: ['Paracetamol for fever', 'ORS for hydration', 'Avoid NSAIDs for dengue unless doctor advises'],
    treatment:
      'Drink plenty of fluids, get blood tests, and rest. Report any bleeding, severe headache, or abdominal pain immediately.',
    precautions: ['Avoid aspirin if dengue is suspected', 'Stay hydrated', 'Seek prompt medical attention'],
  },
  {
    keywords: ['depress', 'anxiety', 'sad', 'low mood', 'mental health', 'stress', 'tension'],
    title: 'Mental Health Support',
    summary:
      'These symptoms may be related to stress or emotional health. Seek support and practice calming routines.',
    tablets: ['Consult a mental health professional before taking medicines'],
    treatment:
      'Practice deep breathing, gentle exercise, and talk to a trusted person. If feelings persist, seek professional counseling.',
    precautions: ['Avoid alcohol and drugs', 'Talk about your feelings', 'Reach out if thoughts worsen'],
  },
  {
    keywords: ['stomach', 'nausea', 'vomit', 'abdominal', 'pet', 'pet dard', 'ulzi', 'ulti'],
    title: 'Digestive Upset',
    summary:
      'This may be digestive upset. Stick to light foods and fluids until symptoms ease.',
    tablets: ['Antacid if you have heartburn', 'Ondansetron for nausea', 'ORS to stay hydrated'],
    treatment:
      'Eat bland foods such as khichdi or toast, and drink small sips of water often. Avoid oily and spicy meals until the stomach settles.',
    precautions: ['Avoid dairy and spicy foods', 'Rest and avoid overeating', 'Sip clear liquids frequently'],
  },
  {
    keywords: ['chest', 'pain', 'pressure', 'tightness', 'chaati', 'chaati dard'],
    title: 'Chest Pain Warning',
    summary:
      'Chest pain can be serious. Seek medical attention immediately if the pain is sudden or gets worse.',
    tablets: ['Do not self-medicate for chest pain'],
    treatment:
      'Sit calmly and seek help right away. Avoid physical activity until a doctor evaluates you.',
    precautions: ['Do not ignore chest pain', 'Call an emergency contact or clinic', 'Avoid exertion'],
  },
]

const localizationLabels = {
  en: {
    title: 'Recommended next steps',
    summary: 'Summary',
    tablets: 'Suggested tablets',
    treatment: 'Treatment',
    precautions: 'Precautions',
    note: 'Note: This guidance is informational only. If symptoms are severe or change quickly, seek care immediately.',
    emergency: 'Emergency: Call 108 or visit nearest hospital if symptoms worsen.',
    general: 'Your symptoms need a closer look. Please stay hydrated, rest, and consult a health worker if symptoms continue or worsen.',
  },
  hi: {
    title: 'सिफारिश की अगली कार्रवाई',
    summary: 'सारांश',
    tablets: 'सुझाए गए टेबलेट',
    treatment: 'उपचार',
    precautions: 'एहतियात',
    note: 'नोट: यह मार्गदर्शन केवल जानकारी के लिए है। यदि लक्षण गंभीर हों या जल्दी बदलें, तो तुरंत चिकित्सीय सहायता लें।',
    emergency: 'आपातकालीन: लक्षण बिगड़ने पर 108 पर कॉल करें या निकटतम अस्पताल जाएं।',
    general: 'आपके लक्षणों को अधिक ध्यान से देखने की आवश्यकता है। कृपया हाइड्रेटेड रहें, आराम करें, और लक्षण बने रहने पर स्वास्थ्य कार्यकर्ता से सलाह लें।',
  },
  te: {
    title: 'సిఫార్సు క్రమం',
    summary: 'సారాంశం',
    tablets: 'సూచించిన మాత్రలు',
    treatment: 'చికిత్స',
    precautions: 'జాగ్రత్తలు',
    note: 'గమనిక: ఇది సమాచారానికి మాత్రమే. లక్షణాలు తీవ్రమైనవైతే లేదా త్వరగా మారితే, వెంటనే వైద్యానికి వెళ్లండి.',
    emergency: 'అత్యవసర: లక్షణాలు తీవ్రమయితే 108కు కాల్ చేయండి లేదా సమీప ఆసుపత్రికి వెళ్ళండి.',
    general: 'మీ లక్షణాలను మరింత సమగ్రంగా చూడాల్సి ఉంటుంది. దయచేసి నీరు తాగండి, విశ్రాంతి తీసుకోండి, మరియు లక్షణాలు కొనసాగితే ఆరోగ్య సేవలు పొందండి.',
  },
  kn: {
    title: 'ಶಿಫಾರಸ್ಸು ಮಾಡಿದ ಮುಂದಿನ ಹೆಜ್ಜೆಗಳು',
    summary: 'ಸಾರಾಂಶ',
    tablets: 'ಸೂಚಿತ ಗಾಳಿ',
    treatment: 'ಚಿಕಿತ್ಸೆ',
    precautions: 'ಎಚ್ಚರಿಕೆಗಳು',
    note: 'ಗುರುತಿಸಿ: ಈ ಮಾರ್ಗದರ್ಶನವನ್ನು ಮಾಹಿತಿ ಉದ್ದೇಶಕ್ಕೆ ಮಾತ್ರ. ಲಕ್ಷಣಗಳು ಗಂಭೀರವಾಗಿದ್ದರೆ ಅಥವಾ ವೇಗವಾಗಿ ಬದಲಾಗಿದ್ರೆ, ತಕ್ಷಣದ ವೈದ್ಯಕೀಯ ಸಹಾಯವನ್ನು ಪಡೆದುಕೊಳ್ಳಿ.',
    emergency: 'ತುರ್ತು: ಲಕ್ಷಣಗಳು ಗಂಭೀರವಾಗಿದ್ರೆ 108ಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ಸಮೀಪದ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ.',
    general: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಅತ್ಯಂತ ಪಟ್ಟಿ ಮಾಡಬೇಕಿದೆ. ದಯವಿಟ್ಟು ನೀರು ಕುಡಿಯಿರಿ, ವಿಶ್ರಾಂತಿ ಮಾಡಿರಿ ಮತ್ತು ಲಕ್ಷಣಗಳು ಮುಂದುವರೆದರೆ ಆರೋಗ್ಯ ವರ್ಕರ್ ಅನ್ನು ಸಂಪರ್ಕಿಸಿ.',
  },
  ta: {
    title: 'பரிந்துரைக்கப்படும் அடுத்த படிகள்',
    summary: 'சுருக்கம்',
    tablets: 'சிபாரிசு செய்யப்பட்ட மாத்திரைகள்',
    treatment: 'சிகிச்சை',
    precautions: 'எச்சரிக்கைகள்',
    note: 'குறிப்பு: இந்த வழிகாட்டி தகவலுக்காக மட்டுமே. அறிகுறிகள் தீவிரமாக இருந்தால் அல்லது விரைவாக மாறினால், உடனடியாக மருத்துவ உதவி பெறவும்.',
    emergency: 'அவசர நிலை: அறிகுறிகள் மோசமாவின் போது 108-ஐ அழைக்கவும் அல்லது அருகிலுள்ள மருத்துவமனைக்கு செல்லவும்.',
    general: 'உங்கள் அறிகுறிகளை மிக நெருக்கமாக காண வேண்டியுள்ளது. தயவுசெய்து நீர் குடித்து, ஓய்வெடுக்கவும், அறிகுறிகள் பொறுத்தவரை தொடர்ந்தால் மருத்துவ உதவியை அணுகவும்.',
  },
}

function getDistanceInKm(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function localizeResponse(response, language) {
  const labels = localizationLabels[language] || localizationLabels.en
  if (!response) return null

  if (response.title === 'General guidance') {
    return {
      title: labels.title,
      summary: labels.general,
      tablets: ['Paracetamol for pain or fever', 'ORS for dehydration'],
      treatment:
        language === 'hi'
          ? 'आराम करें, पर्याप्त तरल पदार्थ लें, और अपनी लक्षणों की निगरानी करें। यदि लक्षण बने रहें या बिगड़ें तो डॉक्टर से मिलें।'
          : language === 'te'
          ? 'విశ్రాంతి తీసుకోండి, చాల నీరు తాగండి, లక్షణాలపై శ్రద్ధ వహించండి. లక్షణాలు కొనసాగితే లేదా తీవ్రంగా మారితే వైద్యుడిని సంప్రదించండి.'
          : language === 'kn'
          ? 'ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ, ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಗಮನಿಸಿ. ಲಕ್ಷಣಗಳು ಮುಂದುವರಿದರೆ ಅಥವಾ ಕೆಡಿದುಹೋಯ್ದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.'
          : language === 'ta'
          ? 'இடைசேர்ந்திருங்கள், போதுமான நீரை குடிக்கவும், அறிகுறிகளை கவனியுங்கள். அறிகுறிகள் நீடித்தால் அல்லது மோசமாக இருந்தால் மருத்துவரை அணுகவும்.'
          : 'Rest, drink plenty of fluids, and monitor your symptoms. Seek medical care if symptoms worsen.',
      precautions:
        language === 'hi'
          ? ['अत्यधिक सेल्फ़-मेडिकेशन से बचें', 'हाइड्रेटेड रहें', 'लक्षण बिगड़ें तो मदद लें']
          : language === 'te'
          ? ['అత్యధిక స్వయం మెడికేషన్ వద్దండి', 'నీటి తాగండి', 'లక్షణాలు తీవ్రమైతే సహాయం కోరండి']
          : language === 'kn'
          ? ['ತೀವ್ರ ಸ್ವಯಂ ಔಷಧಿ ಸೇವನೆಯಿಂದ ಬಿಡಿ', 'ಹೈಡ್ರೇಟ್ ಆಗಿರಿ', 'ಲಕ್ಷಣಗಳು ಹೆಚ್ಚಾದರೆ ನೆರವು ಪಡೆಯಿರಿ']
          : language === 'ta'
          ? ['சுயமாக மருந்துகளை அதிகம் எடுத்துக்கொள்ளாதீர்கள்', 'நீரை பருகுங்கள்', 'அறிகுறிகள் மோசமாயின் உதவி பெறுங்கள்']
          : ['Avoid self-medicating too much', 'Stay hydrated', 'Get help if symptoms worsen'],
      note: labels.note,
    }
  }

  return {
    title: labels.title,
    summary: response.summary,
    tablets: response.tablets,
    treatment: response.treatment,
    precautions: response.precautions,
    note: labels.note,
  }
}

function analyzeSymptoms(text, language = 'en') {
  const normalized = text.toLowerCase()
  const match = conditionRules.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword))
  )

  if (!match) {
    return localizeResponse({ title: 'General guidance' }, language)
  }

  return localizeResponse({ ...match, title: 'Recommended next steps' }, language)
}

function speakText(text, language = 'en') {
  if (!window.speechSynthesis) {
    return
  }
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = voiceLocales[language] || 'en-IN'
  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}

export default function Chat({ user }) {
  const [symptoms, setSymptoms] = useState('')
  const [language, setLanguage] = useState('en')
  const [response, setResponse] = useState(null)
  const [location, setLocation] = useState(null)
  const [geoError, setGeoError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceStatus, setVoiceStatus] = useState('')
  const [voiceError, setVoiceError] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => setLocation(position.coords),
      (error) => setGeoError('Location access denied or unavailable.'),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition || null
    if (!SpeechRecognition) {
      setVoiceError('Voice recognition is not supported in this browser.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.lang = voiceLocales[language] || 'en-IN'

    recognition.onstart = () => {
      setIsListening(true)
      setVoiceStatus('Listening... speak clearly in your selected language.')
      setVoiceError('')
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setSymptoms((current) => (current ? `${current} ${transcript}` : transcript))
      setVoiceStatus('Voice captured. You can submit now or continue typing.')
      setIsListening(false)
    }

    recognition.onerror = (event) => {
      setVoiceError('Voice recognition error: ' + event.error)
      setVoiceStatus('')
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [language])

  const nearbyHospitals = useMemo(() => {
    if (!location) {
      return hospitalList.map((hospital) => ({ ...hospital, distance: null }))
    }
    return hospitalList
      .map((hospital) => ({
        ...hospital,
        distance: getDistanceInKm(location.latitude, location.longitude, hospital.lat, hospital.lon),
      }))
      .sort((a, b) => a.distance - b.distance)
  }, [location])

  const selectedLanguageLabel = languageOptions.find((opt) => opt.value === language)?.label
  const whatsappText = encodeURIComponent(
    `Hello, I need help with my symptoms: ${symptoms || '...'} (Language: ${selectedLanguageLabel}) - from AI Health Assistant app`
  )
  const whatsappLink = `https://wa.me/9160360091?text=${whatsappText}`

  function handleSubmit() {
    setSubmitted(true)
    if (!symptoms.trim()) {
      setResponse({
        title: 'Enter your symptoms',
        summary: 'Please describe what you are feeling so we can suggest next steps.',
        tablets: [],
        treatment: '',
        precautions: [],
      })
      return
    }

    setResponse(analyzeSymptoms(symptoms, language))
  }

  function toggleVoiceInput() {
    if (voiceError) {
      return
    }
    if (!recognitionRef.current) {
      setVoiceError('Voice input is not available in your browser.')
      return
    }
    if (isListening) {
      recognitionRef.current.stop()
      return
    }
    recognitionRef.current.lang = voiceLocales[language] || 'en-IN'
    recognitionRef.current.start()
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Symptom Chat Interface</h1>
        {user && (
          <p className="text-slate-600">
            Welcome, <span className="font-semibold">{user.name || user.email}</span>! 
            Describe your symptoms and get personalized health guidance.
          </p>
        )}
      </div>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_200px] mb-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Choose language
            </label>
            <select
              className="w-full border rounded-lg p-3"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
            <p className="text-sm text-slate-600">
              Selected language: <strong>{selectedLanguageLabel}</strong>
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Voice input supports English, Hindi, Telugu, Kannada, and Tamil.
            </p>
          </div>
        </div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Describe your symptoms
        </label>
        <textarea
          className="w-full border rounded-lg p-3 min-h-[140px] resize-none"
          placeholder="For example: headache, fever, sore throat, nausea"
          value={symptoms}
          onChange={(event) => setSymptoms(event.target.value)}
        />

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className={`px-5 py-3 rounded-lg text-white ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'}`}
            type="button"
            onClick={toggleVoiceInput}
          >
            {isListening ? 'Stop Voice' : 'Start Voice'}
          </button>
        </div>

        {voiceStatus && (
          <p className="mt-3 text-sm text-slate-600">{voiceStatus}</p>
        )}
        {voiceError && (
          <p className="mt-3 text-sm text-red-600">{voiceError}</p>
        )}

        <div className="mt-8 space-y-6">
          {submitted && response && (
            <div className="p-6 border rounded-2xl bg-slate-50">
              <h2 className="text-xl font-semibold mb-3">{response.title}</h2>
              <p className="text-slate-700 mb-4">{response.summary}</p>
              {response.tablets?.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Suggested tablets</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-700">
                    {response.tablets.map((item, index) => (
                      <li key={`tablet-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {response.treatment && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Treatment</h3>
                  <p className="text-slate-700">{response.treatment}</p>
                </div>
              )}
              {response.precautions?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Precautions</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-700">
                    {response.precautions.map((item, index) => (
                      <li key={`precaution-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  type="button"
                  onClick={() => speakText(`${response.title}. ${response.summary}. ${response.treatment}. ${response.precautions?.join('. ')}`, language)}
                >
                  🔊 Play Voice Response
                </button>
                <p className="text-sm text-slate-500 mt-2 md:mt-0">
                  {response.note || 'Note: This guidance is informational only. If symptoms are severe or change quickly, seek care immediately.'}
                </p>
              </div>
            </div>
          )}

          <div className="p-6 border rounded-2xl bg-slate-50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold">Nearby Hospitals</h2>
                <p className="text-sm text-slate-600 mt-1">
                  {location
                    ? 'Showing hospitals near your current location.'
                    : 'Location not available yet. Showing representative nearby providers.'}
                </p>
              </div>
              <div className="text-sm text-slate-500">
                {geoError || (location ? 'Location access granted.' : 'Waiting for location...')}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {nearbyHospitals.slice(0, 4).map((hospital) => (
                <div key={hospital.name} className="rounded-2xl border p-4 bg-white">
                  <h3 className="text-lg font-semibold mb-1">{hospital.name}</h3>
                  <p className="text-sm text-slate-600">{hospital.address}</p>
                  <p className="text-sm text-slate-600 mt-2">Phone: {hospital.phone}</p>
                  {hospital.distance !== null && (
                    <p className="text-sm text-slate-500 mt-1">
                      {hospital.distance.toFixed(1)} km away
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed right-5 bottom-5">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-4 rounded-full shadow-lg"
        >
          <span className="text-2xl">💬</span>
          WhatsApp Chat
        </a>
      </div>
    </div>
  )
}
