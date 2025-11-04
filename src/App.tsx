import React, { useEffect, useRef, useState } from "react";

// Simple, single-file React prototype for a digital health consulting service
// - Clean, minimal UI using Tailwind classes
// - In-page navigation to Home, About, Contact
// - Multiple "Get in touch" CTAs
// - Platform visualization (inline SVG diagram)
// - Digital Twin teaser (coming soon)
// - Contact form with light validation and mock submission

export default function App() {
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : "#home");
  const homeRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null); 
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#home");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const map = {
      "#home": homeRef,
      "#about": aboutRef,
      "#contact": contactRef,
    } as const;
    const target = map[hash as keyof typeof map];
    if (target && target.current) {
      target.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <Main homeRef={homeRef} aboutRef={aboutRef} contactRef={contactRef} />
      <Footer />
    </div>
  );
}

function Header() {
  const linkClass = "px-3 py-2 rounded-lg hover:bg-gray-100 transition";
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gray-900" />
          <span className="font-semibold tracking-tight">Paneo Health</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          <a className={linkClass} href="#home">Home</a>
          <a className={linkClass} href="#about">About</a>
          <a className={linkClass + " font-medium bg-gray-900 text-white hover:bg-gray-800"} href="#contact">Get in touch</a>
        </nav>
      </div>
    </header>
  );
}

function Main({ homeRef, aboutRef, contactRef }: { homeRef: any; aboutRef: any; contactRef: any }) {
  return (
    <main>
      <section ref={homeRef} id="home" className="pt-12 md:pt-20">
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <DigitalTwinTeaser />
        <CTASection />
      </section>
      <section ref={aboutRef} id="about" className="border-t border-gray-100">
        <About />
      </section>
      <section ref={contactRef} id="contact" className="border-t border-gray-100">
        <Contact />
      </section>
    </main>
  );
}

function Hero() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
          Evidence-first consulting for hospital innovation
        </h1>
        <p className="mt-4 text-gray-600 text-lg">
          We help private hospitals discover, evaluate, and adopt digital health solutions with confidence. Our
          expert-led process benchmarks vendors against <span className="font-medium text-gray-900">your</span> workflows and KPIs.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="#contact" className="px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition font-medium">
            Get in touch
          </a>
          <a href="#about" className="px-5 py-3 rounded-xl border border-gray-300 hover:border-gray-400 transition font-medium">
            How we work
          </a>
        </div>
      </div>
      <div className="relative">
        <div className="aspect-[4/3] w-full rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
          <Diagram />
        </div>
        <p className="text-sm text-gray-500 mt-2">A simple view of how we assess solutions against your operations.</p>
      </div>
    </div>
  );
}

function TrustStrip() {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          "Workflow modeling",
          "Clinician-aligned KPIs",
          "Procurement-ready specs",
          "Faster pilots",
        ].map((item) => (
          <div key={item} className="rounded-xl border border-gray-200 p-4 text-sm text-gray-700 bg-white">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">How the platform works</h2>
      <p className="mt-3 text-gray-600 max-w-3xl">
        We start with a focused value stream (e.g., ED→Imaging→Ward or OR utilization). Using de-identified event logs
        and capacity calendars, we construct a baseline model of your operations, then run vendor scenarios to forecast
        impact, risk, and ROI.
      </p>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {[
          {
            title: "Baseline",
            desc: "We reconstruct current flows and KPIs from your event data and rosters.",
          },
          {
            title: "Scenarios",
            desc: "We simulate candidate solutions, stress-test assumptions, and compare outcomes.",
          },
          {
            title: "Decision",
            desc: "You get a procurement-ready spec and an implementation playbook.",
          },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl border border-gray-200 p-5 bg-white">
            <h3 className="font-medium">{c.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
            <a href="#contact" className="inline-block mt-4 text-sm font-medium hover:underline">Get in touch →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function DigitalTwinTeaser() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-2xl border border-gray-200 p-6 bg-gradient-to-br from-white to-gray-50">
        <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Digital Twin — <span className="text-gray-500">coming soon…</span></h2>
            <p className="mt-3 text-gray-600">
              A risk-free sandbox of your hospital operations. Test new workflows, staffing templates, and partner
              technologies before you buy — with confidence bands, fair vendor comparisons, and clear ROI.
            </p>
          </div>
          <a href="#contact" className="shrink-0 px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition font-medium">
            Join the pilot list
          </a>
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="rounded-2xl border border-gray-200 p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-semibold">Have a bottleneck to fix this quarter?</h3>
          <p className="text-gray-600 mt-1">Start with a focused assessment — we’ll deliver an action plan in weeks, not months.</p>
        </div>
        <a href="#contact" className="px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition font-medium">Get in touch</a>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">About us</h2>
          <p className="mt-3 text-gray-600">
            We are an anonymized team of digital health specialists who cut our teeth evaluating hundreds of startups as
            investors and operators. Across Europe, we saw the same pattern: hospitals urged to innovate, vendors eager
            to help — and a wide gap between promise and outcomes.
          </p>
          <p className="mt-3 text-gray-600">
            The breakthrough was simple: align choices with operational reality. We built a way to reconstruct current
            flows from de-identified data, simulate interventions, and make decisions based on evidence, not hype.
          </p>
          <p className="mt-3 text-gray-600">
            Today, we offer expert-led assessments that translate this approach into faster pilots, smarter tenders,
            and smoother implementations. The Digital Twin brings it all together — and it’s coming soon.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#contact" className="px-5 py-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition font-medium">Get in touch</a>
            <a href="#home" className="px-5 py-3 rounded-xl border border-gray-300 hover:border-gray-400 transition font-medium">Back to Home</a>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h3 className="font-medium">Our story</h3>
          <ul className="mt-3 space-y-3 text-sm text-gray-700 list-disc list-inside">
            <li>Reviewed 300+ digital health solutions across workflow, AI, and patient engagement.</li>
            <li>Observed long sales cycles, unclear ROI, and pilots that failed to scale.</li>
            <li>Built a playbook to tie decisions to operational data and real constraints.</li>
            <li>Now, we deliver procurement-ready evidence and implementation plans.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h2>
          <p className="mt-3 text-gray-600">
            Tell us about your bottleneck or initiative. We’ll respond with a short plan to scope a focused assessment.
          </p>
          <ContactForm />
        </div>
        <div className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h3 className="font-medium">What to expect</h3>
          <ul className="mt-3 space-y-3 text-sm text-gray-700 list-disc list-inside">
            <li>15–20 minute intro call to align on goals and constraints.</li>
            <li>Data-light starter: de-identified event logs and capacity calendars.</li>
            <li>Actionable findings in 2–3 weeks for a single value stream.</li>
          </ul>
          <a href="#contact" className="inline-block mt-4 text-sm font-medium hover:underline">Prefer email? Get in touch →</a>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [state, setState] = useState({ name: "", email: "", org: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const emailOk = /.+@.+\..+/.test(state.email);
  const canSubmit = state.name && emailOk && state.message && status !== "sending";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    try {
      // Mock submit: in a real app, POST to your backend or form service
      await new Promise((r) => setTimeout(r, 800));
      console.log("Contact request", state);
      setStatus("success");
      setState({ name: "", email: "", org: "", message: "" });
    } catch (e) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Name" required>
          <input
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Email" required>
          <input
            className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            placeholder="jane@hospital.org"
            type="email"
          />
          {!emailOk && state.email && (
            <p className="text-xs text-red-600 mt-1">Please enter a valid email.</p>
          )}
        </Field>
      </div>
      <Field label="Organization">
        <input
          className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
          value={state.org}
          onChange={(e) => setState({ ...state, org: e.target.value })}
          placeholder="Your hospital or group"
        />
      </Field>
      <Field label="How can we help?" required>
        <textarea
          className="w-full rounded-xl border border-gray-300 px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gray-900"
          value={state.message}
          onChange={(e) => setState({ ...state, message: e.target.value })}
          placeholder="Tell us about your bottleneck, goals, and timeline..."
        />
      </Field>
      <div className="flex items-center gap-3">
        <button
          disabled={!canSubmit}
          className={`px-5 py-3 rounded-xl font-medium text-white transition ${
            canSubmit ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "success" && <span className="text-sm text-green-700">Thanks — we’ll be in touch shortly.</span>}
        {status === "error" && <span className="text-sm text-red-700">Something went wrong. Please try again.</span>}
      </div>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-800">{label}{required && <span className="text-red-600"> *</span>}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} Paneo Health — Evidence-first hospital innovation</p>
        <div className="flex items-center gap-3">
          <a href="#contact" className="px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 text-sm font-medium">Get in touch</a>
          <a href="#about" className="px-4 py-2 rounded-lg text-sm hover:underline">About</a>
        </div>
      </div>
    </footer>
  );
}

function Diagram() {
  // Simple inline SVG to illustrate the platform flow
  return (
    <svg viewBox="0 0 900 520" className="w-full h-full">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
        </filter>
      </defs>
      {/* Nodes */}
      <g filter="url(#shadow)">
        <rect x="40" y="60" width="230" height="100" rx="16" fill="#111827" />
        <text x="155" y="120" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="600">Hospital Data</text>
      </g>
      <g filter="url(#shadow)">
        <rect x="330" y="60" width="240" height="100" rx="16" fill="#ffffff" stroke="#E5E7EB" />
        <text x="450" y="100" textAnchor="middle" fill="#111827" fontSize="16" fontWeight="600">Baseline Model</text>
        <text x="450" y="126" textAnchor="middle" fill="#6B7280" fontSize="13">Flows • Capacity • KPIs</text>
      </g>
      <g filter="url(#shadow)">
        <rect x="640" y="60" width="220" height="100" rx="16" fill="#ffffff" stroke="#E5E7EB" />
        <text x="750" y="100" textAnchor="middle" fill="#111827" fontSize="16" fontWeight="600">Scenario Engine</text>
        <text x="750" y="126" textAnchor="middle" fill="#6B7280" fontSize="13">Simulate vendors</text>
      </g>

      {/* Arrows */}
      <Arrow x1={270} y1={110} x2={330} y2={110} />
      <Arrow x1={570} y1={110} x2={640} y2={110} />

      {/* Bottom row */}
      <g filter="url(#shadow)">
        <rect x="180" y="280" width="240" height="110" rx="16" fill="#ffffff" stroke="#E5E7EB" />
        <text x="300" y="320" textAnchor="middle" fill="#111827" fontSize="16" fontWeight="600">Vendor Library</text>
        <text x="300" y="346" textAnchor="middle" fill="#6B7280" fontSize="13">Impact signatures</text>
      </g>
      <g filter="url(#shadow)">
        <rect x="480" y="280" width="240" height="110" rx="16" fill="#ffffff" stroke="#E5E7EB" />
        <text x="600" y="320" textAnchor="middle" fill="#111827" fontSize="16" fontWeight="600">Results & ROI</text>
        <text x="600" y="346" textAnchor="middle" fill="#6B7280" fontSize="13">KPIs • Confidence bands</text>
      </g>

      <Arrow x1={300} y1={220} x2={300} y2={280} vertical />
      <Arrow x1={600} y1={220} x2={600} y2={280} vertical />

      {/* Callouts */}
      <text x="155" y="185" textAnchor="middle" fill="#6B7280" fontSize="12">De-identified events</text>
      <text x="450" y="185" textAnchor="middle" fill="#6B7280" fontSize="12">Calibrate to history</text>
      <text x="750" y="185" textAnchor="middle" fill="#6B7280" fontSize="12">Compare options</text>
    </svg>
  );
}

function Arrow({ x1, y1, x2, y2, vertical = false }: { x1: number; y1: number; x2: number; y2: number; vertical?: boolean }) {
  const markerEnd = (
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L6,3 z" fill="#9CA3AF" />
    </marker>
  );
  return (
    <svg>
      <defs>{markerEnd}</defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arrow)" />
      {vertical ? (
        <circle cx={x2} cy={y2} r="0" />
      ) : null}
    </svg>
  );
}
