import { Link } from 'react-router-dom'

const sectionClass = 'mb-8'

export default function Insights() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="bg-white rounded-3xl shadow p-8">
        <h1 className="text-4xl font-bold mb-4">Team Insight Engineers Pro</h1>
        <p className="text-slate-600 mb-4">
          Phase 1: Problem Discovery & Concept Definition for reliable health access to non-English-speaking and underserved communities.
        </p>
        <Link
          to="/"
          className="inline-block text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to home
        </Link>
      </div>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">1. Problem Overview</h2>
        <p className="text-slate-700 mb-3">
          Non-English-speaking and underserved communities in India face barriers to reliable, understandable, and timely healthcare information. These barriers are driven by language constraints, low health literacy, misinformation, and limited access to early-stage medical guidance.
        </p>
        <ul className="list-disc pl-6 text-slate-700 space-y-2">
          <li>Language constraints from English-heavy digital health systems.</li>
          <li>Low literacy and difficulty reading prescriptions or instructions.</li>
          <li>Heavy dependence on unverified advice through WhatsApp and social media.</li>
          <li>Limited access to doctors for early, non-critical health queries.</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">2. Problem Context & Scope</h2>
        <p className="text-slate-700 mb-3">
          Digitization of healthcare is growing, but many users remain excluded because access does not equal usability. India has hundreds of languages and dialects, yet most health apps are English-first.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Why this matters</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>Smartphones exist, but usability is low for non-English speakers.</li>
              <li>Semi-literate users struggle with text-heavy health flows.</li>
              <li>Health decisions are often urgent, stressful, and emotional.</li>
              <li>Informal channels are trusted more than formal systems.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Context factors</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>Majority of health apps focus on English/Hindi only.</li>
              <li>Regional dialects and code-mixed speech are common.</li>
              <li>Misinformation spreads through WhatsApp and social media.</li>
              <li>Early-care guidance is often unavailable or inaccessible.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">3. Evidence & Validation</h2>
        <p className="text-slate-700 mb-3">
          We validated this problem using 10 raw signals from LinkedIn, app reviews, Reddit, blogs, and customer forums. These signals consistently highlight language barriers, low-literacy failure points, and over-reliance on WhatsApp for health advice.
        </p>
        <ul className="list-disc pl-6 text-slate-700 space-y-2">
          <li>Language barriers in support systems and health chatbots.</li>
          <li>Text-based English interfaces fail low-literacy users.</li>
          <li>WhatsApp groups spread unverified medical advice.</li>
          <li>Poor regional language performance reduces trust.</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">4. Target Users</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Primary users</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>Rural populations</li>
              <li>Migrant and gig workers</li>
              <li>Elderly users</li>
              <li>Low-literacy and non-English speakers</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Secondary users</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>Community health workers (ASHAs)</li>
              <li>NGOs and public health departments</li>
              <li>Government health programs</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">5. Exploration Frameworks</h2>
        <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">SCAMPER</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>Substitute text with voice and English with local languages.</li>
              <li>Combine AI with verified medical sources and familiar channels.</li>
              <li>Adapt telemedicine and IVR helpline workflows.</li>
              <li>Modify tone for empathy and low-bandwidth UX.</li>
              <li>Eliminate jargon and complex flows.</li>
              <li>Reverse to AI-first guidance with doctor escalation.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Brainstorming & pattern analysis</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>Reviewed common daily health questions online.</li>
              <li>Observed misinformation patterns on WhatsApp, Reddit, Twitter.</li>
              <li>Reviewed app complaints across non-health and health apps.</li>
              <li>Identified repeated confusion about symptoms, medicines, and vaccination.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">6. Concept Definition</h2>
        <p className="text-slate-700 mb-3">
          Product concept: A multilingual voice and text AI health assistant for underserved communities. It supports natural local-language speech, simple symptom explanations, care guidance, audio instructions, and escalation when needed.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Key features</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>Text and voice input in local languages.</li>
              <li>Simple symptom triage and recommendations.</li>
              <li>Audio self-care and red-flag advice.</li>
              <li>Escalation to doctors or helplines.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Deployment approach</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>Cloud-hosted services with GitHub repository workflows.</li>
              <li>CI/CD via GitHub Actions across Dev, QA, Staging, Production.</li>
              <li>Containerized backend microservices with REST AI APIs.</li>
              <li>Voice integration through services like Twilio.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">7. Core Use Cases</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Primary care guidance</h3>
            <p className="text-slate-700">Symptom listening, clarification, and serious/not-serious decision support.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Low-literacy education</h3>
            <p className="text-slate-700">Audio explanations for common conditions and medication guidance.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Community health worker support</h3>
            <p className="text-slate-700">Structured assessments and playable patient education content.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Language bridging</h3>
            <p className="text-slate-700">Assist patient-doctor communication and summarize for both sides.</p>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">8. Customer Value Proposition</h2>
        <p className="text-slate-700">
          “Instant, trustworthy health guidance in your own language — without needing literacy, appointments, or constant internet.”
        </p>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">9. Competitive landscape</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Direct competitors</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>Practo, mfine — appointment-based, costly, limited language support.</li>
              <li>Government helplines — capacity and wait-time issues.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-semibold mb-2">Indirect competitors</h3>
            <ul className="list-disc pl-5 text-slate-700 space-y-2">
              <li>Google Search/WebMD — text-heavy and English-dominant.</li>
              <li>WhatsApp groups/social media — high misinformation.</li>
              <li>Human translators — not scalable and not medically trained.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">10. Why users will switch</h2>
        <ul className="list-disc pl-6 text-slate-700 space-y-2">
          <li>Local language and voice-first design.</li>
          <li>Faster triage than visiting a doctor for minor concerns.</li>
          <li>More trustworthy than WhatsApp forwards.</li>
          <li>Accessible at PHCs, medical stores and community kiosks.</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">11. Success metrics</h2>
        <ul className="list-disc pl-6 text-slate-700 space-y-2">
          <li>Daily interactions per kiosk.</li>
          <li>Language recognition accuracy.</li>
          <li>Query resolution rate.</li>
          <li>Repeat usage.</li>
          <li>Escalation-to-doctor rate.</li>
          <li>User trust and satisfaction feedback.</li>
        </ul>
      </section>

      <section className={sectionClass}>
        <h2 className="text-2xl font-semibold mb-3">12. Team contributors</h2>
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3">Sr. No.</th>
                <th className="px-4 py-3">First name</th>
                <th className="px-4 py-3">Last name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Contribution</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Sunaina</td>
                <td className="px-4 py-3">Khatkar</td>
                <td className="px-4 py-3">skhatkar3267@gmail.com</td>
                <td className="px-4 py-3">9996108764</td>
                <td className="px-4 py-3">Experimental tasks, app reviews, data support</td>
              </tr>
              <tr className="border-t border-slate-200 bg-slate-50">
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">Sana</td>
                <td className="px-4 py-3">Rahman</td>
                <td className="px-4 py-3">sanarahman1999@gmail.com</td>
                <td className="px-4 py-3">9901399232</td>
                <td className="px-4 py-3">Experimental tasks, app reviews, data support</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3">3</td>
                <td className="px-4 py-3">Srinivas</td>
                <td className="px-4 py-3">Godugula</td>
                <td className="px-4 py-3">srinivasgwk1234@gmail.com</td>
                <td className="px-4 py-3">9908838830</td>
                <td className="px-4 py-3">Framework design, product ideas, development</td>
              </tr>
              <tr className="border-t border-slate-200 bg-slate-50">
                <td className="px-4 py-3">4</td>
                <td className="px-4 py-3">Dishant</td>
                <td className="px-4 py-3">Dangi</td>
                <td className="px-4 py-3">dishantdangi19@gmail.com</td>
                <td className="px-4 py-3">9888684169</td>
                <td className="px-4 py-3">Competition research, product idea research</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3">5</td>
                <td className="px-4 py-3">Praful</td>
                <td className="px-4 py-3">NA</td>
                <td className="px-4 py-3">NA</td>
                <td className="px-4 py-3">NA</td>
                <td className="px-4 py-3">NA</td>
              </tr>
              <tr className="border-t border-slate-200 bg-slate-50">
                <td className="px-4 py-3">6</td>
                <td className="px-4 py-3">Parag</td>
                <td className="px-4 py-3">Joshi</td>
                <td className="px-4 py-3">iamparagjoshi@gmail.com</td>
                <td className="px-4 py-3">9890524648</td>
                <td className="px-4 py-3">Product ideas and research</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3">7</td>
                <td className="px-4 py-3">Esha</td>
                <td className="px-4 py-3">NA</td>
                <td className="px-4 py-3">NA</td>
                <td className="px-4 py-3">NA</td>
                <td className="px-4 py-3">Product ideas, implementation design</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
