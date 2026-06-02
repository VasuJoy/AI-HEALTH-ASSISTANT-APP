const languageNames = {
  en: 'English',
  hi: 'Hindi',
  te: 'Telugu',
  kn: 'Kannada',
  ta: 'Tamil',
}

function extractOutputText(data) {
  if (typeof data.output_text === 'string') return data.output_text

  const textParts = []
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === 'string') textParts.push(content.text)
    }
  }
  return textParts.join('\n')
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

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    response.status(503).json({ error: 'OPENAI_API_KEY is not configured' })
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

    const aiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
        input: prompt,
        text: {
          format: {
            type: 'json_object',
          },
        },
        temperature: 0.2,
        max_output_tokens: 900,
      }),
    })

    const data = await aiResponse.json()
    if (!aiResponse.ok) {
      response.status(aiResponse.status).json({ error: data.error?.message || 'AI request failed' })
      return
    }

    const outputText = extractOutputText(data)
    const guidance = normalizeGuidance(parseGuidanceJson(outputText), language)

    response.status(200).json(guidance)
  } catch (error) {
    response.status(500).json({ error: error.message || 'Unable to generate AI guidance' })
  }
}
