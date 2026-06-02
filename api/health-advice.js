const languageNames = {
  en: 'English',
  hi: 'Hindi',
  te: 'Telugu',
  kn: 'Kannada',
  ta: 'Tamil',
}

function extractGeminiText(data) {
  const parts = data.candidates?.[0]?.content?.parts || []
  return parts.map((part) => part.text || '').join('\n')
}

async function readJsonBody(request) {
  if (request.body && typeof request.body === 'object') return request.body
  if (typeof request.body === 'string') return JSON.parse(request.body)

  const chunks = []
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const rawBody = Buffer.concat(chunks).toString('utf8')
  return rawBody ? JSON.parse(rawBody) : {}
}

function parseGuidanceJson(outputText) {
  const cleaned = outputText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim()

  try {
    return JSON.parse(cleaned)
  } catch {
    const firstBrace = cleaned.indexOf('{')
    const lastBrace = cleaned.lastIndexOf('}')
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1))
    }
    throw new Error('AI response was not valid JSON')
  }
}

function normalizeGuidance(value, language) {
  return {
    title: value.title || 'Recommended next steps',
    summary: value.summary || 'Please consult a qualified health worker for personalized guidance.',
    severity: value.severity || 'unknown',
    tablets: Array.isArray(value.tablets) ? value.tablets.slice(0, 4) : [],
    treatment: value.treatment || '',
    precautions: Array.isArray(value.precautions) ? value.precautions.slice(0, 5) : [],
    note:
      value.note ||
      'This guidance is informational only. It is not a diagnosis. If symptoms are severe or change quickly, seek medical care immediately.',
    labels: {
      tablets: value.labels?.tablets || 'Suggested tablets',
      treatment: value.labels?.treatment || 'Treatment',
      precautions: value.labels?.precautions || 'Precautions',
      play: value.labels?.play || 'Play Voice Response',
      stop: value.labels?.stop || 'Stop Voice Response',
    },
    source: 'ai',
    language,
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    response.status(503).json({ error: 'GEMINI_API_KEY is not configured' })
    return
  }

  try {
    const { symptoms = '', language = 'en', user = {} } = await readJsonBody(request)
    const cleanSymptoms = String(symptoms).trim()

    if (!cleanSymptoms) {
      response.status(400).json({ error: 'Symptoms are required' })
      return
    }

    const selectedLanguage = languageNames[language] || 'English'
    const prompt = `
You are a cautious AI health assistant for India. Read the patient's symptoms and return safe, plain-language health guidance.

Important safety rules:
- Do not provide a definitive diagnosis.
- Do not claim to replace a doctor.
- Do not give exact prescription dosing.
- Mention emergency care immediately for red-flag symptoms such as chest pain, severe breathing trouble, fainting, stroke symptoms, heavy bleeding, severe dehydration, pregnancy complications, or rapidly worsening symptoms.
- OTC medicine suggestions must be conservative and include a doctor/pharmacist check for children, pregnancy, liver/kidney disease, allergies, or existing medication.
- Respond only in ${selectedLanguage}.

Patient:
- Name/email: ${user.name || user.email || 'Unknown'}
- Selected language: ${selectedLanguage}
- Symptoms: ${cleanSymptoms}

Return only valid JSON with this exact shape:
{
  "title": "string",
  "summary": "string",
  "severity": "low | medium | high | emergency",
  "tablets": ["string"],
  "treatment": "string",
  "precautions": ["string"],
  "note": "string",
  "labels": {
    "tablets": "string",
    "treatment": "string",
    "precautions": "string",
    "play": "string",
    "stop": "string"
  }
}
`

    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash'
    const aiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 900,
          responseMimeType: 'application/json',
        },
      }),
    })

    const data = await aiResponse.json()
    if (!aiResponse.ok) {
      response.status(aiResponse.status).json({ error: data.error?.message || 'Gemini request failed' })
      return
    }

    const outputText = extractGeminiText(data)
    if (!outputText) {
      throw new Error('Gemini returned an empty response')
    }
    const guidance = normalizeGuidance(parseGuidanceJson(outputText), language)

    response.status(200).json(guidance)
  } catch (error) {
    response.status(500).json({ error: error.message || 'Unable to generate AI guidance' })
  }
}
