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

const languageDisplayNames = {
  en: 'English',
  hi: 'Hindi',
  te: 'Telugu',
  kn: 'Kannada',
  ta: 'Tamil',
}

const nativeDisplayNames = {
  en: 'English',
  hi: 'हिन्दी',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
  ta: 'தமிழ்',
}

const nativeText = {
  en: {
    title: 'Recommended next steps',
    tablets: 'Suggested tablets',
    treatment: 'Treatment',
    precautions: 'Precautions',
    note: 'Note: This guidance is informational only. If symptoms are severe or change quickly, seek care immediately.',
    general: 'Your symptoms need a closer look. Please stay hydrated, rest, and consult a health worker if symptoms continue or worsen.',
    generalTreatment: 'Rest, drink plenty of fluids, and monitor your symptoms. Seek medical care if symptoms worsen.',
    generalPrecautions: ['Avoid self-medicating too much', 'Stay hydrated', 'Get help if symptoms worsen'],
    play: 'Play Voice Response',
    stop: 'Stop Voice Response',
    selected: 'Selected language',
    voiceHelp: 'Voice input supports English, Hindi, Telugu, Kannada, and Tamil.',
  },
  hi: {
    title: 'सुझाए गए अगले कदम',
    tablets: 'सुझाई गई दवाइयाँ',
    treatment: 'उपचार',
    precautions: 'सावधानियाँ',
    note: 'नोट: यह मार्गदर्शन केवल जानकारी के लिए है। लक्षण गंभीर हों या जल्दी बदलें तो तुरंत चिकित्सा सहायता लें।',
    general: 'आपके लक्षणों को ध्यान से देखने की जरूरत है। पानी पिएँ, आराम करें, और लक्षण बने रहें या बिगड़ें तो स्वास्थ्यकर्मी से सलाह लें।',
    generalTreatment: 'आराम करें, पर्याप्त तरल लें, और अपने लक्षणों पर नजर रखें। लक्षण बिगड़ें तो डॉक्टर से मिलें।',
    generalPrecautions: ['बहुत अधिक स्वयं दवा न लें', 'पानी पीते रहें', 'लक्षण बिगड़ें तो मदद लें'],
    play: 'आवाज़ में उत्तर सुनें',
    stop: 'आवाज़ रोकें',
    selected: 'चुनी गई भाषा',
    voiceHelp: 'वॉइस इनपुट अंग्रेज़ी, हिन्दी, तेलुगु, कन्नड़ और तमिल में उपलब्ध है।',
  },
  te: {
    title: 'సిఫార్సు చేసిన తదుపరి చర్యలు',
    tablets: 'సూచించిన మందులు',
    treatment: 'చికిత్స',
    precautions: 'జాగ్రత్తలు',
    note: 'గమనిక: ఈ మార్గదర్శకం సమాచారానికి మాత్రమే. లక్షణాలు తీవ్రంగా ఉంటే లేదా త్వరగా మారితే వెంటనే వైద్య సహాయం పొందండి.',
    general: 'మీ లక్షణాలను మరింత జాగ్రత్తగా చూడాలి. నీరు తాగండి, విశ్రాంతి తీసుకోండి, లక్షణాలు కొనసాగితే లేదా పెరిగితే ఆరోగ్య కార్యకర్తను సంప్రదించండి.',
    generalTreatment: 'విశ్రాంతి తీసుకోండి, తగినంత ద్రవాలు తాగండి, లక్షణాలను గమనించండి. లక్షణాలు పెరిగితే వైద్యుడిని సంప్రదించండి.',
    generalPrecautions: ['అధికంగా స్వయంగా మందులు తీసుకోవద్దు', 'నీరు తాగుతూ ఉండండి', 'లక్షణాలు పెరిగితే సహాయం పొందండి'],
    play: 'వాయిస్ సమాధానం వినండి',
    stop: 'వాయిస్ ఆపండి',
    selected: 'ఎంచుకున్న భాష',
    voiceHelp: 'వాయిస్ ఇన్‌పుట్ ఇంగ్లీష్, హిందీ, తెలుగు, కన్నడ మరియు తమిళ్‌కు మద్దతు ఇస్తుంది.',
  },
  kn: {
    title: 'ಶಿಫಾರಸು ಮಾಡಿದ ಮುಂದಿನ ಹಂತಗಳು',
    tablets: 'ಸೂಚಿಸಿದ ಔಷಧಿಗಳು',
    treatment: 'ಚಿಕಿತ್ಸೆ',
    precautions: 'ಎಚ್ಚರಿಕೆಗಳು',
    note: 'ಸೂಚನೆ: ಈ ಮಾರ್ಗದರ್ಶನ ಮಾಹಿತಿ ಉದ್ದೇಶಕ್ಕೆ ಮಾತ್ರ. ಲಕ್ಷಣಗಳು ಗಂಭೀರವಾಗಿದ್ದರೆ ಅಥವಾ ಬೇಗ ಬದಲಾಗಿದರೆ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ.',
    general: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಇನ್ನಷ್ಟು ಗಮನದಿಂದ ನೋಡಬೇಕು. ನೀರು ಕುಡಿಯಿರಿ, ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ, ಲಕ್ಷಣಗಳು ಮುಂದುವರಿದರೆ ಅಥವಾ ಹೆಚ್ಚಾದರೆ ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    generalTreatment: 'ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ, ಸಾಕಷ್ಟು ದ್ರವಗಳನ್ನು ಕುಡಿಯಿರಿ, ಮತ್ತು ಲಕ್ಷಣಗಳನ್ನು ಗಮನಿಸಿ. ಲಕ್ಷಣಗಳು ಹೆಚ್ಚಾದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    generalPrecautions: ['ಅಧಿಕವಾಗಿ ಸ್ವಯಂ ಔಷಧಿ ತೆಗೆದುಕೊಳ್ಳಬೇಡಿ', 'ನೀರನ್ನು ಕುಡಿಯುತ್ತಿರಿ', 'ಲಕ್ಷಣಗಳು ಹೆಚ್ಚಾದರೆ ಸಹಾಯ ಪಡೆಯಿರಿ'],
    play: 'ಧ್ವನಿ ಉತ್ತರವನ್ನು ಕೇಳಿ',
    stop: 'ಧ್ವನಿಯನ್ನು ನಿಲ್ಲಿಸಿ',
    selected: 'ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಷೆ',
    voiceHelp: 'ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ, ತೆಲುಗು, ಕನ್ನಡ ಮತ್ತು ತಮಿಳು ಭಾಷೆಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ.',
  },
  ta: {
    title: 'பரிந்துரைக்கப்பட்ட அடுத்த படிகள்',
    tablets: 'பரிந்துரைக்கப்பட்ட மருந்துகள்',
    treatment: 'சிகிச்சை',
    precautions: 'எச்சரிக்கைகள்',
    note: 'குறிப்பு: இந்த வழிகாட்டுதல் தகவலுக்காக மட்டுமே. அறிகுறிகள் தீவிரமாக இருந்தால் அல்லது விரைவாக மாறினால் உடனே மருத்துவ உதவி பெறுங்கள்.',
    general: 'உங்கள் அறிகுறிகளை மேலும் கவனமாக பார்க்க வேண்டும். தண்ணீர் குடிக்கவும், ஓய்வு எடுக்கவும், அறிகுறிகள் தொடர்ந்தால் அல்லது மோசமாயின் சுகாதார பணியாளரை அணுகவும்.',
    generalTreatment: 'ஓய்வு எடுக்கவும், போதுமான திரவங்கள் குடிக்கவும், அறிகுறிகளை கவனிக்கவும். அறிகுறிகள் மோசமாயின் மருத்துவரை அணுகவும்.',
    generalPrecautions: ['அதிகமாக சுயமாக மருந்து எடுக்க வேண்டாம்', 'தண்ணீர் குடிக்கவும்', 'அறிகுறிகள் மோசமாயின் உதவி பெறவும்'],
    play: 'குரல் பதிலை கேளுங்கள்',
    stop: 'குரலை நிறுத்து',
    selected: 'தேர்ந்தெடுத்த மொழி',
    voiceHelp: 'குரல் உள்ளீடு ஆங்கிலம், இந்தி, தெலுங்கு, கன்னடம் மற்றும் தமிழ் மொழிகளை ஆதரிக்கிறது.',
  },
}

const nativeConditionResponses = {
  hi: {
    'Fever / Infection': {
      summary: 'आपके लक्षण बुखार या हल्के संक्रमण जैसे लग रहे हैं। आराम करें, पानी पिएँ, और तापमान पर नजर रखें।',
      treatment: 'गर्म तरल और हल्का भोजन लें। तेज बुखार हो तो ठंडी पट्टी लगाएँ। बुखार 48 घंटे से अधिक रहे या कमजोरी लगे तो डॉक्टर से मिलें।',
      precautions: ['खूब पानी पिएँ', 'ठंडी चीज़ें और शराब से बचें', 'आराम करें और भीड़ से दूर रहें'],
    },
    'Cough / Throat Infection': {
      summary: 'यह खांसी या गले के संक्रमण जैसा लग रहा है। गले को नम रखें और धूल या धुएँ से बचें।',
      treatment: 'शहद के साथ गर्म चाय लें, आवाज को आराम दें, और भाप लें। खांसी गंभीर हो या सांस में दिक्कत हो तो डॉक्टर से मिलें।',
      precautions: ['मसालेदार भोजन से बचें', 'पानी पीते रहें', 'नमक पानी से गरारे करें'],
    },
    'Headache / Migraine': {
      summary: 'आपके लक्षण सिरदर्द या माइग्रेन ट्रिगर जैसे लग रहे हैं। शांत और अंधेरे कमरे में आराम करें।',
      treatment: 'स्क्रीन समय कम करें, पानी पिएँ, और ठंडी पट्टी लगाएँ। सिरदर्द गंभीर या बार-बार हो तो डॉक्टर से मिलें।',
      precautions: ['तेज आवाज से बचें', 'पानी पीते रहें', 'भोजन न छोड़ें'],
    },
  },
  te: {
    'Fever / Infection': {
      summary: 'మీ లక్షణాలు జ్వరం లేదా తేలికపాటి ఇన్ఫెక్షన్‌లా కనిపిస్తున్నాయి. విశ్రాంతి తీసుకోండి, నీరు తాగండి, ఉష్ణోగ్రతను గమనించండి.',
      treatment: 'వెచ్చని ద్రవాలు మరియు తేలికపాటి ఆహారం తీసుకోండి. జ్వరం ఎక్కువైతే చల్లని కట్టు పెట్టండి. 48 గంటలకంటే ఎక్కువగా ఉంటే వైద్యుడిని సంప్రదించండి.',
      precautions: ['చాలా నీరు తాగండి', 'చల్లని ఆహారం మరియు మద్యం నివారించండి', 'విశ్రాంతి తీసుకొని జనసందోహాన్ని నివారించండి'],
    },
    'Cough / Throat Infection': {
      summary: 'ఇది దగ్గు లేదా గొంతు ఇన్ఫెక్షన్‌లా కనిపిస్తోంది. గొంతును తడిగా ఉంచండి, పొగ మరియు దుమ్ము దూరంగా ఉంచండి.',
      treatment: 'తేనెతో వెచ్చని టీ తాగండి, గొంతుకు విశ్రాంతి ఇవ్వండి, ఆవిరి పీల్చండి. శ్వాసలో ఇబ్బంది ఉంటే వైద్యుడిని సంప్రదించండి.',
      precautions: ['మసాలా ఆహారం నివారించండి', 'నీరు తాగుతూ ఉండండి', 'ఉప్పు నీటితో గార్గిల్ చేయండి'],
    },
    'Headache / Migraine': {
      summary: 'మీ లక్షణాలు తలనొప్పి లేదా మైగ్రేన్ ట్రిగ్గర్‌లా ఉన్నాయి. ప్రశాంతమైన చీకటి గదిలో విశ్రాంతి తీసుకోండి.',
      treatment: 'స్క్రీన్ సమయం తగ్గించండి, నీరు తాగండి, చల్లని కట్టు పెట్టండి. తలనొప్పి తీవ్రమైతే వైద్యుడిని సంప్రదించండి.',
      precautions: ['పెద్ద శబ్దం నివారించండి', 'నీరు తాగుతూ ఉండండి', 'భోజనం మానవద్దు'],
    },
  },
  kn: {
    'Fever / Infection': {
      summary: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳು ಜ್ವರ ಅಥವಾ ಸಣ್ಣ ಸೋಂಕಿನಂತೆ ಕಾಣುತ್ತಿವೆ. ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ, ನೀರು ಕುಡಿಯಿರಿ, ತಾಪಮಾನ ಗಮನಿಸಿ.',
      treatment: 'ಬೆಚ್ಚಗಿನ ದ್ರವಗಳು ಮತ್ತು ಲಘು ಆಹಾರ ತೆಗೆದುಕೊಳ್ಳಿ. ಜ್ವರ ಹೆಚ್ಚು ಇದ್ದರೆ ತಣ್ಣನೆಯ ಕಟ್ಟು ಹಾಕಿ. 48 ಗಂಟೆಗಳಿಗಿಂತ ಹೆಚ್ಚು ಇದ್ದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      precautions: ['ಹೆಚ್ಚು ನೀರು ಕುಡಿಯಿರಿ', 'ತಣ್ಣನೆಯ ಆಹಾರ ಮತ್ತು ಮದ್ಯವನ್ನು ತಪ್ಪಿಸಿ', 'ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಂಡು ಜನಸಂದಣಿ ತಪ್ಪಿಸಿ'],
    },
    'Cough / Throat Infection': {
      summary: 'ಇದು ಕೆಮ್ಮು ಅಥವಾ ಗಂಟಲು ಸೋಂಕಿನಂತೆ ಕಾಣುತ್ತದೆ. ಗಂಟಲನ್ನು ತೇವವಾಗಿರಿಸಿ, ಧೂಳು ಮತ್ತು ಹೊಗೆಯಿಂದ ದೂರಿರಿ.',
      treatment: 'ಜೇನುತುಪ್ಪದೊಂದಿಗೆ ಬೆಚ್ಚಗಿನ ಚಹಾ ಕುಡಿಯಿರಿ, ಧ್ವನಿಗೆ ವಿಶ್ರಾಂತಿ ನೀಡಿ, ಆವಿ ತೆಗೆದುಕೊಳ್ಳಿ. ಉಸಿರಾಟ ಕಷ್ಟವಾದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      precautions: ['ಖಾರದ ಆಹಾರ ತಪ್ಪಿಸಿ', 'ನೀರು ಕುಡಿಯುತ್ತಿರಿ', 'ಉಪ್ಪು ನೀರಿನಿಂದ ಗಾರ್ಗಲ್ ಮಾಡಿ'],
    },
    'Headache / Migraine': {
      summary: 'ನಿಮ್ಮ ಲಕ್ಷಣಗಳು ತಲೆನೋವು ಅಥವಾ ಮೈಗ್ರೇನ್ ಕಾರಣದಂತೆ ಕಾಣುತ್ತಿವೆ. ಶಾಂತವಾದ ಕತ್ತಲೆ ಕೋಣೆಯಲ್ಲಿ ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ.',
      treatment: 'ಸ್ಕ್ರೀನ್ ಸಮಯ ಕಡಿಮೆ ಮಾಡಿ, ನೀರು ಕುಡಿಯಿರಿ, ತಣ್ಣನೆಯ ಕಟ್ಟು ಹಾಕಿ. ತಲೆನೋವು ತೀವ್ರವಾಗಿದ್ದರೆ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
      precautions: ['ಜೋರಾದ ಶಬ್ದ ತಪ್ಪಿಸಿ', 'ನೀರು ಕುಡಿಯುತ್ತಿರಿ', 'ಊಟ ಬಿಡಬೇಡಿ'],
    },
  },
  ta: {
    'Fever / Infection': {
      summary: 'உங்கள் அறிகுறிகள் காய்ச்சல் அல்லது லேசான தொற்று போல தெரிகின்றன. ஓய்வு எடுக்கவும், தண்ணீர் குடிக்கவும், வெப்பநிலையை கவனிக்கவும்.',
      treatment: 'சூடான திரவங்கள் மற்றும் லேசான உணவு எடுத்துக்கொள்ளவும். காய்ச்சல் அதிகமாக இருந்தால் குளிர்ந்த துணி வைத்துக்கொள்ளவும். 48 மணி நேரத்திற்கும் மேலாக இருந்தால் மருத்துவரை அணுகவும்.',
      precautions: ['நிறைய தண்ணீர் குடிக்கவும்', 'குளிர்ந்த உணவு மற்றும் மது தவிர்க்கவும்', 'ஓய்வு எடுத்து கூட்டம் தவிர்க்கவும்'],
    },
    'Cough / Throat Infection': {
      summary: 'இது இருமல் அல்லது தொண்டை தொற்று போல இருக்கிறது. தொண்டையை ஈரமாக வைத்துக்கொள்ளவும், புகை மற்றும் தூசியை தவிர்க்கவும்.',
      treatment: 'தேன் சேர்த்த சூடான தேநீர் குடிக்கவும், குரலுக்கு ஓய்வு கொடுக்கவும், நீராவி பிடிக்கவும். சுவாசத்தில் சிரமம் இருந்தால் மருத்துவரை அணுகவும்.',
      precautions: ['காரமான உணவை தவிர்க்கவும்', 'தண்ணீர் குடிக்கவும்', 'உப்பு நீரால் கொப்பளிக்கவும்'],
    },
    'Headache / Migraine': {
      summary: 'உங்கள் அறிகுறிகள் தலைவலி அல்லது மைக்ரேன் தூண்டுதல் போல இருக்கின்றன. அமைதியான இருண்ட அறையில் ஓய்வு எடுக்கவும்.',
      treatment: 'திரை நேரத்தை குறைக்கவும், தண்ணீர் குடிக்கவும், குளிர்ந்த துணி வைத்துக்கொள்ளவும். தலைவலி கடுமையாக இருந்தால் மருத்துவரை அணுகவும்.',
      precautions: ['அதிக சத்தத்தை தவிர்க்கவும்', 'தண்ணீர் குடிக்கவும்', 'உணவை தவிர்க்க வேண்டாம்'],
    },
  },
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

function cleanLocalizeResponse(response, language) {
  const labels = nativeText[language] || nativeText.en
  if (!response) return null

  if (response.title === 'General guidance') {
    return {
      title: labels.title,
      summary: labels.general,
      tablets: ['Paracetamol', 'ORS'],
      treatment: labels.generalTreatment,
      precautions: labels.generalPrecautions,
      note: labels.note,
      labels,
    }
  }

  const nativeCondition = nativeConditionResponses[language]?.[response.conditionTitle]
  return {
    title: labels.title,
    summary: nativeCondition?.summary || labels.general,
    tablets: response.tablets,
    treatment: nativeCondition?.treatment || labels.generalTreatment,
    precautions: nativeCondition?.precautions || labels.generalPrecautions,
    note: labels.note,
    labels,
  }
}

function analyzeSymptoms(text, language = 'en') {
  const normalized = text.toLowerCase()
  const match = conditionRules.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword))
  )

  if (!match) {
    return cleanLocalizeResponse({ title: 'General guidance' }, language)
  }

  return cleanLocalizeResponse({ ...match, conditionTitle: match.title }, language)
}

function splitSpeechText(text) {
  const sentences = text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
  const chunks = []
  let current = ''

  sentences.forEach((sentence) => {
    if ((current + ' ' + sentence).trim().length > 180) {
      if (current) chunks.push(current)
      current = sentence
    } else {
      current = (current + ' ' + sentence).trim()
    }
  })

  if (current) chunks.push(current)
  return chunks.length ? chunks : [text]
}

function speakText(text, language = 'en', handlers = {}) {
  if (!window.speechSynthesis) {
    handlers.onError?.('Voice playback is not supported in this browser.')
    return false
  }
  const cleanText = text.replace(/\s+/g, ' ').trim()
  if (!cleanText) {
    handlers.onError?.('There is no response text to play.')
    return false
  }

  let hasStarted = false
  const play = () => {
    if (hasStarted) {
      return
    }
    hasStarted = true
    const locale = voiceLocales[language] || 'en-IN'
    const voices = window.speechSynthesis.getVoices()
    const defaultVoice = voices.find((voice) => voice.default) || null
    const matchingVoice =
      voices.find((voice) => voice.lang === locale) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith(language)) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith('en')) ||
      defaultVoice
    const spokenLocale = matchingVoice?.lang || (language === 'en' ? 'en-US' : locale)
    const chunks = splitSpeechText(cleanText)
    let chunkIndex = 0

    window.speechSynthesis.cancel()
    window.speechSynthesis.resume()

    const finishOrNext = () => {
      chunkIndex += 1
      if (chunkIndex < chunks.length) {
        setTimeout(() => speakChunk(false), 100)
        return
      }
      handlers.onEnd?.()
    }

    const speakChunk = (useDefaultVoice) => {
      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex])
      utterance.lang = useDefaultVoice ? 'en-US' : spokenLocale
      utterance.rate = 0.88
      utterance.pitch = 1
      if (!useDefaultVoice && matchingVoice) {
        utterance.voice = matchingVoice
      }
      utterance.onstart = () => {
        if (chunkIndex === 0) handlers.onStart?.()
      }
      utterance.onend = finishOrNext
      utterance.onerror = (event) => {
        if (event.error === 'canceled' || event.error === 'interrupted') {
          return
        }
        if (!useDefaultVoice) {
          setTimeout(() => speakChunk(true), 120)
          return
        }
        finishOrNext()
      }
      window.speechSynthesis.speak(utterance)
    }

    setTimeout(() => speakChunk(false), 120)
  }

  if (window.speechSynthesis.getVoices().length === 0) {
    handlers.onLoading?.()
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null
      play()
    }
    setTimeout(play, 300)
    return true
  }

  play()
  return true
}

export default function Chat({ user }) {
  const [symptoms, setSymptoms] = useState('')
  const [language, setLanguage] = useState('en')
  const [response, setResponse] = useState(null)
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [location, setLocation] = useState(null)
  const [geoError, setGeoError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceStatus, setVoiceStatus] = useState('')
  const [voiceError, setVoiceError] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechStatus, setSpeechStatus] = useState('')
  const [speechError, setSpeechError] = useState('')
  const recognitionRef = useRef(null)
  const voiceTranscriptRef = useRef('')
  const voiceFinalizedRef = useRef(false)
  const voiceHadErrorRef = useRef(false)
  const voiceRetryCountRef = useRef(0)
  const maxVoiceRetries = 3

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
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
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
    recognition.interimResults = true
    recognition.maxAlternatives = 1
    recognition.lang = voiceLocales[language] || 'en-IN'

    recognition.onstart = () => {
      setIsListening(true)
      voiceTranscriptRef.current = ''
      voiceFinalizedRef.current = false
      voiceHadErrorRef.current = false
      setVoiceStatus('Listening... speak clearly and keep the microphone close.')
      setVoiceError('')
    }

    recognition.onresult = (event) => {
      let finalTranscript = ''
      let interimTranscript = ''

      Array.from(event.results).forEach((result) => {
        const transcript = result[0]?.transcript || ''
        if (result.isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      })

      if (interimTranscript.trim()) {
        const cleanInterim = interimTranscript.trim()
        voiceTranscriptRef.current = cleanInterim
        setVoiceStatus(`Listening: ${cleanInterim}`)
      }

      if (finalTranscript.trim()) {
        const cleanTranscript = finalTranscript.trim()
        voiceTranscriptRef.current = cleanTranscript
        voiceFinalizedRef.current = true
        setSymptoms((current) => (current ? `${current} ${cleanTranscript}` : cleanTranscript))
        setVoiceStatus('Voice captured. You can submit now or continue typing.')
        setIsListening(false)
      }
    }

    recognition.onerror = (event) => {
      voiceHadErrorRef.current = true
      const errorMessage = event.error
      
      // Retry logic for network and service unavailable errors
      if ((errorMessage === 'network' || errorMessage === 'service_not_allowed') && 
          voiceRetryCountRef.current < maxVoiceRetries) {
        voiceRetryCountRef.current += 1
        setVoiceError(`Network error. Retrying... (${voiceRetryCountRef.current}/${maxVoiceRetries})`)
        setVoiceStatus('Retrying in 2 seconds...')
        setTimeout(() => {
          if (recognitionRef.current) {
            try {
              recognitionRef.current.start()
            } catch (error) {
              setVoiceStatus('')
              setVoiceError('Voice input is still busy. Please try again in a moment.')
              setIsListening(false)
            }
          }
        }, 2000)
      } else {
        voiceRetryCountRef.current = 0
        const userFriendlyError = 
          errorMessage === 'network' ? 'Network error. Check your internet connection and try again.' :
          errorMessage === 'no-speech' ? 'No speech detected. Please speak clearly and try again.' :
          errorMessage === 'audio-capture' ? 'Microphone access denied. Please allow microphone access in browser settings.' :
          errorMessage === 'service_not_allowed' ? 'Voice service temporarily unavailable. Please try again in a moment.' :
          'Voice recognition error: ' + errorMessage
        
        setVoiceError(userFriendlyError)
        setVoiceStatus('')
        setIsListening(false)
      }
    }

    recognition.onend = () => {
      setIsListening(false)
      if (voiceTranscriptRef.current && !voiceFinalizedRef.current && !voiceHadErrorRef.current) {
        setSymptoms((current) =>
          current ? `${current} ${voiceTranscriptRef.current}` : voiceTranscriptRef.current
        )
        setVoiceStatus('Voice captured. You can submit now or continue typing.')
        voiceFinalizedRef.current = true
        return
      }
      if (!voiceTranscriptRef.current && !voiceHadErrorRef.current) {
        setVoiceStatus('Voice input stopped. If nothing appeared, try again a little closer to the microphone.')
      }
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

  const selectedLanguageLabel =
    nativeDisplayNames[language] || languageOptions.find((opt) => opt.value === language)?.label
  const whatsappText = encodeURIComponent(
    `Hello, I need help with my symptoms: ${symptoms || '...'} (Language: ${selectedLanguageLabel}) - from AI Health Assistant app`
  )
  const whatsappLink = `https://wa.me/9160360091?text=${whatsappText}`

  async function handleSubmit() {
    setSubmitted(true)
    setAiError('')
    if (!symptoms.trim()) {
      const labels = nativeText[language] || nativeText.en
      setResponse({
        title: labels.title,
        summary: language === 'en'
          ? 'Please describe what you are feeling so we can suggest next steps.'
          : labels.general,
        tablets: [],
        treatment: '',
        precautions: [],
        note: labels.note,
        labels,
      })
      return
    }

    const fallbackResponse = analyzeSymptoms(symptoms, language)
    setIsAiLoading(true)

    try {
      const aiResponse = await fetch('/api/health-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symptoms,
          language,
          user: {
            name: user?.name,
            email: user?.email,
          },
        }),
      })

      const data = await aiResponse.json()

      if (!aiResponse.ok) {
        throw new Error(data.error || 'AI guidance is unavailable right now.')
      }

      setResponse(data)
    } catch (error) {
      setResponse(fallbackResponse)
      setAiError('AI guidance is unavailable right now. Showing local guidance instead.')
    } finally {
      setIsAiLoading(false)
    }
  }

  function handlePlayResponse() {
    if (isSpeaking) {
      window.speechSynthesis?.cancel()
      setIsSpeaking(false)
      setSpeechStatus('Voice response stopped.')
      return
    }

    if (!response) {
      return
    }

    const responseText = [
      response.title,
      response.summary,
      response.tablets?.length ? `${response.labels?.tablets || 'Suggested tablets'}: ${response.tablets.join(', ')}` : '',
      response.treatment ? `${response.labels?.treatment || 'Treatment'}: ${response.treatment}` : '',
      response.precautions?.length ? `${response.labels?.precautions || 'Precautions'}: ${response.precautions.join(', ')}` : '',
      response.note || 'This guidance is informational only.',
    ]
      .filter(Boolean)
      .join('. ')

    setSpeechError('')
    setSpeechStatus('Preparing voice response...')
    speakText(responseText, language, {
      onLoading: () => setSpeechStatus('Loading browser voices...'),
      onStart: () => {
        setIsSpeaking(true)
        setSpeechStatus('Playing voice response...')
      },
      onEnd: () => {
        setIsSpeaking(false)
        setSpeechStatus('Voice response finished.')
      },
      onError: (message) => {
        setIsSpeaking(false)
        setSpeechStatus('')
        setSpeechError(message)
      },
    })
  }

  function toggleVoiceInput() {
    if (!recognitionRef.current) {
      setVoiceError('Voice input is not available in your browser.')
      return
    }
    if (isListening) {
      recognitionRef.current.stop()
      return
    }
    recognitionRef.current.lang = voiceLocales[language] || 'en-IN'
    voiceRetryCountRef.current = 0
    setVoiceError('')
    setVoiceStatus('Starting voice input...')
    try {
      recognitionRef.current.start()
    } catch (error) {
      setIsListening(false)
      setVoiceStatus('')
      setVoiceError('Voice input is already starting. Please wait a moment and try again.')
    }
  }

  function clearText() {
    setSymptoms('')
    setVoiceError('')
    setVoiceStatus('')
    setSubmitted(false)
    setResponse(null)
    setAiError('')
    setIsAiLoading(false)
    setSpeechStatus('')
    setSpeechError('')
    setIsSpeaking(false)
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5">
        <div className="mb-3 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Voice and text support
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-700 sm:text-4xl">Symptom Chat Interface</h1>
        {user && (
          <p className="mt-2 max-w-3xl text-base text-slate-600">
            Welcome, <span className="rounded-full bg-orange-50 px-2 py-0.5 font-semibold text-orange-700 ring-1 ring-orange-200">{user.name || user.email}</span>! 
            Describe your symptoms and get personalized health guidance.
          </p>
        )}
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_260px]">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Choose language
            </label>
            <select
              className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-medium text-blue-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {nativeDisplayNames[option.value] || option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-700">
              {(nativeText[language] || nativeText.en).selected}
            </p>
            <p className="mt-1 text-lg font-semibold text-blue-700">{selectedLanguageLabel}</p>
            <p className="mt-1 text-sm leading-5 text-slate-600">
              {(nativeText[language] || nativeText.en).voiceHelp}
            </p>
          </div>
        </div>

        <label className="block text-sm font-medium text-slate-700 mb-2">
          Describe your symptoms
        </label>
        <textarea
          className="min-h-[150px] w-full resize-y rounded-xl border border-slate-300 p-4 text-base leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:min-h-[170px]"
          placeholder="For example: headache, fever, sore throat, nausea"
          value={symptoms}
          onChange={(event) => setSymptoms(event.target.value)}
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            className="inline-flex h-12 items-center justify-center rounded-xl bg-green-600 px-6 font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed disabled:bg-green-300"
            type="button"
            onClick={handleSubmit}
            disabled={isAiLoading}
          >
            {isAiLoading ? 'Analyzing...' : 'Submit'}
          </button>
          <button
            className={`inline-flex h-12 items-center justify-center rounded-xl px-6 font-semibold text-white shadow-sm transition focus:outline-none focus:ring-4 ${isListening ? 'bg-red-600 hover:bg-red-700 focus:ring-red-100' : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-100'}`}
            type="button"
            onClick={toggleVoiceInput}
          >
            {isListening ? 'Stop Voice' : 'Start Voice'}
          </button>
          <button
            className="inline-flex h-12 items-center justify-center rounded-xl border border-orange-200 bg-orange-50 px-6 font-semibold text-orange-700 transition hover:bg-orange-100 focus:outline-none focus:ring-4 focus:ring-orange-100"
            type="button"
            onClick={clearText}
          >
            Clear Text
          </button>
        </div>

        {voiceStatus && (
          <p className="mt-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">{voiceStatus}</p>
        )}
        {voiceError && (
          <p className="mt-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{voiceError}</p>
        )}
        {isAiLoading && (
          <p className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            AI is reading the symptoms and preparing safe guidance...
          </p>
        )}
        {aiError && (
          <p className="mt-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-800">{aiError}</p>
        )}

        <div className="mt-8 space-y-6">
          {submitted && response && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <h2 className="text-xl font-semibold mb-3">{response.title}</h2>
              <p className="text-slate-700 mb-4">{response.summary}</p>
              {response.tablets?.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">{response.labels?.tablets || 'Suggested tablets'}</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-700">
                    {response.tablets.map((item, index) => (
                      <li key={`tablet-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {response.treatment && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">{response.labels?.treatment || 'Treatment'}</h3>
                  <p className="text-slate-700">{response.treatment}</p>
                </div>
              )}
              {response.precautions?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">{response.labels?.precautions || 'Precautions'}</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-700">
                    {response.precautions.map((item, index) => (
                      <li key={`precaution-${index}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  type="button"
                  onClick={handlePlayResponse}
                >
                  {isSpeaking ? (response.labels?.stop || 'Stop Voice Response') : (response.labels?.play || 'Play Voice Response')}
                </button>
                <button
                  className="hidden"
                  type="button"
                  onClick={handlePlayResponse}
                >
                  🔊 Play Voice Response
                </button>
                <p className="text-sm leading-6 text-slate-500 md:mt-0">
                  {response.note || 'Note: This guidance is informational only. If symptoms are severe or change quickly, seek care immediately.'}
                </p>
              </div>
              {speechStatus && (
                <p className="mt-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                  {speechStatus}
                </p>
              )}
              {speechError && (
                <p className="mt-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {speechError}
                </p>
              )}
            </div>
          )}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
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
                <div key={hospital.name} className="rounded-xl border border-slate-200 bg-white p-4">
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
        <aside className="space-y-4">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-950">
            <h2 className="text-base font-semibold">Before you submit</h2>
            <p className="mt-2 text-sm leading-6">
              Share age, symptom duration, fever level, and any medicines already taken when possible.
            </p>
          </div>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-950">
            <h2 className="text-base font-semibold">Emergency care</h2>
            <p className="mt-2 text-sm leading-6">
              For chest pain, severe breathing trouble, fainting, heavy bleeding, or rapidly worsening symptoms, call 108 or visit the nearest hospital.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-950">Health guidance note</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              AI suggestions are informational and should not replace advice from a qualified doctor or health worker.
            </p>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-4 right-4 z-20 sm:bottom-5 sm:right-5">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-4 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-emerald-100 sm:h-14 sm:px-5"
        >
          <span className="text-2xl">💬</span>
          WhatsApp Chat
        </a>
      </div>
    </div>
  )
}
