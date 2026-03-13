import { useEffect, useRef, useState, createContext, useContext } from 'react'
import {
  MapPin, Bell, Star, Moon, Zap, Bus, Navigation,
  LogOut, Home, Clock, User, Search, X, ChevronDown,
  Vibrate, Volume2, AlertCircle, CheckCircle,
  Sun, Smartphone, Shield, Battery,
  Play, Square, Menu, XCircle
} from 'lucide-react'
import './index.css'

const ThemeCtx = createContext<{ dark: boolean; toggle: () => void }>({ dark: true, toggle: () => {} })
const useTheme = () => useContext(ThemeCtx)

const darkTheme = {
  bg: '#0F1B2D', card: '#1a2d45', border: 'rgba(255,255,255,0.08)',
  borderStrong: 'rgba(245,166,35,0.3)', textPrimary: '#e8f0f8',
  textSecondary: '#8BA4BE', textMuted: '#4A6A8A', inputBg: '#162437',
  navBg: 'rgba(15,27,45,0.95)', amber: '#F5A623', amberDim: 'rgba(245,166,35,0.15)',
  danger: '#FF4757', success: '#2ED573', circle1: '#1E3A5C',
}
const lightTheme = {
  bg: '#F0F4F8', card: '#FFFFFF', border: 'rgba(15,27,45,0.1)',
  borderStrong: 'rgba(245,166,35,0.5)', textPrimary: '#0F1B2D',
  textSecondary: '#2A4D73', textMuted: '#8BA4BE', inputBg: '#E8F0F8',
  navBg: 'rgba(240,244,248,0.95)', amber: '#F5A623', amberDim: 'rgba(245,166,35,0.12)',
  danger: '#FF4757', success: '#2ED573', circle1: '#C8DCF0',
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

// ─── Phone Mockup ─────────────────────────────────────────────────────────────
function PhoneMockup() {
  const { dark } = useTheme()
  const t = dark ? darkTheme : lightTheme
  const [activeRadius, setActiveRadius] = useState(2)
  const [activeAlarm, setActiveAlarm] = useState(2)

  return (
    <div className="relative mx-auto select-none" style={{ width: 260, height: 520 }}>
      <div className="absolute inset-0 rounded-[44px] animate-pulse-glow pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(245,166,35,0.2) 0%, transparent 70%)', filter: 'blur(24px)' }} />
      <div className="relative overflow-hidden border animate-float"
        style={{
          width: 260, height: 520, borderRadius: 40,
          borderColor: t.borderStrong, background: t.bg,
          boxShadow: dark ? '0 40px 80px rgba(0,0,0,0.6)' : '0 40px 80px rgba(15,27,45,0.2)',
        }}>
        <div className="absolute rounded-full pointer-events-none"
          style={{ width: 200, height: 200, top: -55, right: -55, opacity: 0.4, backgroundColor: t.circle1, borderRadius: '50%' }} />
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span style={{ fontFamily: 'monospace', fontSize: 9, color: t.textSecondary }}>9:41</span>
          <div style={{ width: 52, height: 12, backgroundColor: t.bg, borderRadius: 6 }} />
          <Battery size={11} color={t.textMuted} />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between px-3 pt-1 pb-2">
          <div>
            <div className="inline-flex items-center px-1.5 py-0.5 rounded-md mb-0.5" style={{ backgroundColor: t.amberDim }}>
              <span style={{ fontSize: 7, fontWeight: 700, color: t.amber, letterSpacing: 1 }}>BETA</span>
            </div>
            <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 18, color: t.textPrimary, lineHeight: 1 }}>
              Nap<span style={{ color: t.amber }}>Stop</span>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-xl border"
            style={{ borderColor: t.danger + '44', backgroundColor: t.danger + '11' }}>
            <LogOut size={9} color={t.danger} />
            <span style={{ fontSize: 7, color: t.danger, fontWeight: 600 }}>Logout</span>
          </div>
        </div>
        {/* Destination */}
        <div className="mx-3 mb-1.5 rounded-2xl border px-3 py-2" style={{ backgroundColor: t.card, borderColor: t.border }}>
          <div className="flex items-center gap-1 mb-1">
            <Navigation size={8} color={t.textSecondary} />
            <span style={{ fontSize: 7, color: t.textSecondary, fontWeight: 600 }}>DESTINATION</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 11, fontWeight: 700, color: t.textPrimary, fontFamily: 'Syne,sans-serif' }}>SM City Sorsogon</span>
            <X size={12} color={t.textMuted} />
          </div>
        </div>
        {/* Alert radius */}
        <div className="mx-3 mb-1.5 rounded-2xl border px-3 py-2" style={{ backgroundColor: t.card, borderColor: t.border }}>
          <div className="flex items-center gap-1 mb-1.5">
            <Bell size={8} color={t.textSecondary} />
            <span style={{ fontSize: 7, color: t.textSecondary, fontWeight: 600 }}>ALERT ME WHEN</span>
          </div>
          <div className="flex justify-between gap-1">
            {['200m', '500m', '1km', '2km'].map((r, i) => (
              <button key={r} onClick={() => setActiveRadius(i)}
                className="flex-1 rounded-xl py-1 text-center transition-all"
                style={{ fontSize: 8, fontWeight: 700, backgroundColor: activeRadius === i ? t.amber : t.inputBg, color: activeRadius === i ? '#0F1B2D' : t.textSecondary, border: activeRadius !== i ? `1px solid ${t.border}` : 'none' }}>
                {r}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 7, color: t.textMuted, marginTop: 5 }}>
            Wake me {['200m','500m','1km','2km'][activeRadius]} before my stop
          </div>
        </div>
        {/* Alarm type */}
        <div className="mx-3 mb-2.5 rounded-2xl border px-3 py-2" style={{ backgroundColor: t.card, borderColor: t.border }}>
          <div className="flex items-center gap-1 mb-1.5">
            <Zap size={8} color={t.textSecondary} />
            <span style={{ fontSize: 7, color: t.textSecondary, fontWeight: 600 }}>ALARM TYPE</span>
          </div>
          <div className="flex gap-1">
            {[{ label: 'Vibrate', Icon: Vibrate }, { label: 'Sound', Icon: Volume2 }, { label: 'Both', Icon: AlertCircle }].map(({ label, Icon }, i) => (
              <button key={label} onClick={() => setActiveAlarm(i)}
                className="flex-1 rounded-xl py-2 flex flex-col items-center gap-0.5 transition-all"
                style={{ backgroundColor: activeAlarm === i ? t.amber : t.inputBg, border: activeAlarm !== i ? `1px solid ${t.border}` : 'none' }}>
                <Icon size={13} color={activeAlarm === i ? '#0F1B2D' : t.textSecondary} />
                <span style={{ fontSize: 7, fontWeight: 600, color: activeAlarm === i ? '#0F1B2D' : t.textSecondary }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Start Trip */}
        <div className="mx-3 rounded-2xl py-2.5 flex flex-col items-center" style={{ backgroundColor: t.amber }}>
          <div className="flex items-center gap-1.5">
            <Bus size={13} color="#0F1B2D" />
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 12, color: '#0F1B2D' }}>Start Trip</span>
          </div>
          <span style={{ fontSize: 7, color: '#0F1B2D', opacity: 0.7, marginTop: 1 }}>GPS monitoring will begin</span>
        </div>
        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center px-2 py-2 border-t"
          style={{ backgroundColor: t.navBg, borderColor: t.border, backdropFilter: 'blur(12px)' }}>
          {[{ Icon: Home, label: 'Home', active: true }, { Icon: Star, label: 'Favorites', active: false }, { Icon: Clock, label: 'History', active: false }, { Icon: User, label: 'Profile', active: false }].map(({ Icon, label, active }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <Icon size={15} color={active ? t.amber : t.textMuted} />
              <span style={{ fontSize: 7, color: active ? t.amber : t.textMuted, fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute rounded-r-sm" style={{ right: -3, top: 95, width: 3, height: 44, backgroundColor: t.card }} />
      <div className="absolute rounded-l-sm" style={{ left: -3, top: 80, width: 3, height: 28, backgroundColor: t.card }} />
      <div className="absolute rounded-l-sm" style={{ left: -3, top: 118, width: 3, height: 28, backgroundColor: t.card }} />
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const { dark, toggle } = useTheme()
  const t = dark ? darkTheme : lightTheme
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = ['Features', 'How It Works', 'Screenshots', 'Download']

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? t.navBg : 'transparent', borderBottom: scrolled ? `1px solid ${t.border}` : 'none', backdropFilter: scrolled ? 'blur(16px)' : 'none' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 20, color: t.textPrimary }}>
          Nap<span style={{ color: t.amber }}>Stop</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`}
              style={{ fontSize: 13, color: t.textSecondary, textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = t.amber)}
              onMouseLeave={e => (e.currentTarget.style.color = t.textSecondary)}>
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggle} className="rounded-xl p-2 border transition-all"
            style={{ backgroundColor: t.card, borderColor: t.border }}>
            {dark ? <Sun size={15} color={t.amber} /> : <Moon size={15} color={t.textSecondary} />}
          </button>
          <a href="#download" className="hidden md:flex btn-amber items-center gap-1.5 font-bold text-sm px-4 py-2 rounded-xl"
            style={{ color: '#0F1B2D', textDecoration: 'none', fontSize: 13 }}>
            <Smartphone size={14} color="#0F1B2D" /> Get the App
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl"
            style={{ color: t.textSecondary }}>
            {menuOpen ? <XCircle size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-3 animate-fade-in"
          style={{ backgroundColor: t.navBg, borderColor: t.border, backdropFilter: 'blur(16px)' }}>
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`}
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 14, color: t.textSecondary, textDecoration: 'none', fontWeight: 500, padding: '6px 0' }}>
              {link}
            </a>
          ))}
          <a href="#download" className="btn-amber font-bold text-sm px-5 py-3 rounded-xl text-center mt-1"
            style={{ color: '#0F1B2D', textDecoration: 'none' }}>
            Get the App
          </a>
        </div>
      )}
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const { dark } = useTheme()
  const t = dark ? darkTheme : lightTheme

  return (
    <section className={`relative min-h-screen flex items-center overflow-hidden ${dark ? 'mesh-bg-dark grid-lines-dark' : 'mesh-bg-light grid-lines-light'}`}>
      <div className="absolute top-20 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full pointer-events-none animate-pulse-glow"
        style={{ background: `radial-gradient(circle, ${t.amber}22 0%, transparent 70%)`, filter: 'blur(60px)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 w-full">
        {/* Mobile: stack vertically. Desktop: side by side */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Copy */}
          <div className="text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-5 border animate-slide-up"
              style={{ borderColor: t.borderStrong, backgroundColor: t.amberDim, opacity: 0, animationFillMode: 'forwards' }}>
              <div className="relative flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.amber }} />
                <div className="absolute inset-0 rounded-full animate-ping-slow" style={{ backgroundColor: t.amber }} />
              </div>
              <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono,monospace', color: t.amber, letterSpacing: 2 }}>AVAILABLE ON ANDROID</span>
            </div>

            {/* Headline — responsive sizes */}
            <h1 className="font-display font-extrabold leading-tight mb-4 animate-slide-up delay-100"
              style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem, 8vw, 3.2rem)', opacity: 0, animationFillMode: 'forwards', color: t.textPrimary, lineHeight: 1.1 }}>
              Sleep on the{' '}
              <span style={{ color: t.amber }} className="text-glow">bus.</span>{' '}
              <span style={{ color: t.textMuted }}>Wake</span>{' '}
              at your stop.
            </h1>

            <p className="leading-relaxed mb-6 animate-slide-up delay-200"
              style={{ fontWeight: 300, color: t.textSecondary, opacity: 0, animationFillMode: 'forwards', fontSize: 'clamp(13px, 3.5vw, 16px)', maxWidth: 440, margin: '0 auto 24px' }}>
              NapStop is a GPS alarm app built for Filipino commuters. Set your destination, close your eyes, and wake up exactly where you need to be.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start animate-slide-up delay-300 mb-8"
              style={{ opacity: 0, animationFillMode: 'forwards' }}>
              <a href="#download" className="btn-amber font-bold px-6 py-3 rounded-2xl flex items-center justify-center gap-2"
                style={{ color: '#0F1B2D', textDecoration: 'none', fontSize: 14 }}>
                <Bus size={16} color="#0F1B2D" /> Download Free
              </a>
              <a href="#how-it-works" className="border font-semibold px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-colors"
                style={{ borderColor: t.borderStrong, color: t.amber, textDecoration: 'none', backgroundColor: t.amberDim, fontSize: 14 }}>
                How It Works <ChevronDown size={15} />
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-6 sm:gap-8 justify-center md:justify-start animate-slide-up delay-400"
              style={{ opacity: 0, animationFillMode: 'forwards' }}>
              {[{ val: '4', label: 'Alert Radii' }, { val: '3', label: 'Alarm Modes' }, { val: '100%', label: 'Free' }].map(s => (
                <div key={s.label} className="text-center md:text-left">
                  <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 22, color: t.amber }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: t.textMuted, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup — hidden on very small, shown centered on mobile md+ */}
          <div className="flex justify-center animate-slide-up delay-500 mt-4 md:mt-0"
            style={{ opacity: 0, animationFillMode: 'forwards' }}>
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
function TickerBanner() {
  const { dark } = useTheme()
  const t = dark ? darkTheme : lightTheme
  const items = ['Never Miss Your Stop', 'GPS Powered', 'Dark Mode', 'Free to Use', 'Philippines Made', 'Smart Alerts', 'Trip History', 'Save Favorites']
  const all = [...items, ...items, ...items, ...items]
  return (
    <div className="border-y py-2.5 overflow-hidden" style={{ borderColor: t.border, backgroundColor: t.amberDim }}>
      <div className="flex animate-ticker whitespace-nowrap">
        {all.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-5"
            style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', color: t.amber, letterSpacing: 2, textTransform: 'uppercase' }}>
            {item} <MapPin size={7} color={t.amber} style={{ opacity: 0.4 }} />
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  { Icon: Navigation, title: 'Live GPS Tracking', desc: 'Real-time location monitoring watches your position against your destination with pinpoint accuracy.', tag: 'Core' },
  { Icon: Bell, title: 'Smart Wake Alerts', desc: 'Choose vibrate, sound, or both. Wake gently within 200m to 2km from your stop.', tag: 'Alerts' },
  { Icon: MapPin, title: 'Map & Search', desc: 'Tap anywhere on the full-screen Google Map or search any place in the Philippines instantly.', tag: 'Navigation' },
  { Icon: Star, title: 'Favorites & History', desc: 'Save frequent stops, track distance and duration, and get auto-suggestions for repeat destinations.', tag: 'Smart' },
  { Icon: Moon, title: 'Dark Mode First', desc: 'Deep navy UI designed for nighttime commutes — easy on the eyes riding in the dark.', tag: 'Design' },
  { Icon: Zap, title: 'Instant Setup', desc: 'Pick a destination, set your alert radius, choose alarm — three taps to complete peace of mind.', tag: 'Simple' },
]

function FeaturesSection() {
  const { dark } = useTheme()
  const t = dark ? darkTheme : lightTheme
  const { ref, inView } = useInView()

  return (
    <section id="features" className="py-16 sm:py-24 relative" style={{ backgroundColor: t.bg }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div ref={ref} className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 border"
            style={{ borderColor: t.borderStrong, backgroundColor: t.amberDim }}>
            <Zap size={11} color={t.amber} />
            <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono,monospace', color: t.amber, letterSpacing: 2 }}>FEATURES</span>
          </div>
          <h2 className="mb-3" style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: t.textPrimary }}>
            Everything you need to<br />
            <span style={{ color: t.amber }}>commute with confidence</span>
          </h2>
          <p style={{ color: t.textSecondary, maxWidth: 420, margin: '0 auto', fontWeight: 300, fontSize: 'clamp(12px, 3vw, 14px)' }}>
            Built for jeepneys, buses, and UV Express across the Philippines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {FEATURES.map(({ Icon, title, desc, tag }, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { ref: fRef, inView: fInView } = useInView()
            return (
              <div key={title} ref={fRef}
                className={`feature-card rounded-2xl border p-5 transition-all duration-700 ${fInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ backgroundColor: t.card, borderColor: t.border, transitionDelay: `${i * 80}ms`, boxShadow: dark ? '0 4px 24px rgba(0,0,0,0.2)' : '0 4px 24px rgba(15,27,45,0.08)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-xl" style={{ backgroundColor: t.amberDim }}>
                    <Icon size={18} color={t.amber} />
                  </div>
                  <span className="rounded-full px-2 py-0.5 border"
                    style={{ fontSize: 8, fontFamily: 'JetBrains Mono,monospace', color: t.textMuted, borderColor: t.border, letterSpacing: 1 }}>
                    {tag}
                  </span>
                </div>
                <h3 className="mb-1.5" style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 16, color: t.textPrimary }}>{title}</h3>
                <p style={{ color: t.textSecondary, fontSize: 14, lineHeight: 1.7, fontWeight: 300, maxWidth: 200, margin: '0 auto' }}>{desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
const STEPS = [
  { Icon: Search, num: '01', title: 'Set Your Stop', desc: 'Search a destination or tap on the map. Google Places covers the entire Philippines.' },
  { Icon: Bell, num: '02', title: 'Choose Your Alert', desc: 'Set how close to be woken — 200m to 2km — and pick vibrate, sound, or both.' },
  { Icon: Moon, num: '03', title: 'Sleep Soundly', desc: 'Tap Start Trip and drift off. NapStop monitors GPS silently in the background.' },
  { Icon: CheckCircle, num: '04', title: 'Wake Up On Time', desc: 'Your phone alerts you before your stop. Never ride past your destination again.' },
]

function HowItWorksSection() {
  const { dark } = useTheme()
  const t = dark ? darkTheme : lightTheme
  const { ref, inView } = useInView()

  return (
    <section id="how-it-works" className="relative overflow-hidden" style={{ minHeight: "100vh", display: "flex", alignItems: "center", backgroundColor: dark ? '#08111e' : '#E8F0F8' }}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${t.amber}22, transparent)`, filter: 'blur(80px)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div ref={ref} className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 border"
            style={{ borderColor: t.borderStrong, backgroundColor: t.amberDim }}>
            <Play size={11} color={t.amber} />
            <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono,monospace', color: t.amber, letterSpacing: 2 }}>HOW IT WORKS</span>
          </div>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: t.textPrimary }}>
            Four taps to <span style={{ color: t.amber }}>peace of mind</span>
          </h2>
        </div>

        {/* Mobile: vertical list. Desktop: 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${t.amber}, ${t.amber}, transparent)`, opacity: 0.35 }} />

          {STEPS.map(({ Icon, num, title, desc }, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { ref: sRef, inView: sInView } = useInView(0.1)
            return (
              <div key={num} ref={sRef}
                className={`relative flex flex-col items-center text-center sm:text-center transition-all duration-700 ${sInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                {/* Mobile: horizontal layout */}
                <div className="flex flex-col items-center">
                  <div className="mb-3 flex items-center justify-center rounded-full border-2 glow-amber"
                    style={{ width: 80, height: 80, borderColor: t.amber, backgroundColor: t.amberDim, flexShrink: 0 }}>
                    <Icon size={32} color={t.amber} />
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 9, color: t.amber, letterSpacing: 2, marginBottom: 4 }}>{num}</div>
                  <h3 className="mb-1.5" style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 16, color: t.textPrimary }}>{title}</h3>
                  <p style={{ color: t.textSecondary, fontSize: 14, lineHeight: 1.7, fontWeight: 300, maxWidth: 200, margin: '0 auto' }}>{desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Screenshots ──────────────────────────────────────────────────────────────
function MiniScreen({ children, label }: { children: React.ReactNode; label: string }) {
  const { dark } = useTheme()
  const t = dark ? darkTheme : lightTheme
  return (
    <div>
      <div className="overflow-hidden border"
        style={{ height: 420, borderRadius: 28, backgroundColor: t.bg, borderColor: t.borderStrong, boxShadow: dark ? '0 16px 48px rgba(0,0,0,0.5)' : '0 16px 48px rgba(15,27,45,0.15)' }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-3 pt-2 pb-1" style={{ backgroundColor: t.bg }}>
          <span style={{ fontSize: 7, fontFamily: 'monospace', color: t.textMuted }}>9:41</span>
          <div className="flex items-center gap-1">
            <div style={{ width: 10, height: 5, borderRadius: 2, border: `1px solid ${t.textMuted}`, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 1, right: 2, backgroundColor: t.success, borderRadius: 1 }} />
            </div>
          </div>
        </div>
        <div style={{ height: 'calc(100% - 24px)', overflow: 'hidden' }}>{children}</div>
      </div>
      <p className="text-center mt-2.5" style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', color: t.textMuted, letterSpacing: 1 }}>{label}</p>
    </div>
  )
}

function ScreenshotsSection() {
  const { dark } = useTheme()
  const t = dark ? darkTheme : lightTheme
  const { ref, inView } = useInView()

  // ── Home Screen — mirrors HomeScreen.tsx exactly ──
  const HomeScreen = () => (
    <div className="relative overflow-hidden h-full flex flex-col" style={{ backgroundColor: t.bg }}>
      {/* Decorative circle top-right */}
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 110, height: 110, top: -30, right: -30, opacity: 0.35, backgroundColor: t.circle1 }} />

      <div className="flex-1 overflow-hidden px-2.5 pt-2 pb-1 space-y-1.5">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex px-1.5 py-0.5 rounded mb-0.5" style={{ backgroundColor: t.amberDim }}>
              <span style={{ fontSize: 5, fontWeight: 700, color: t.amber, letterSpacing: 1 }}>BETA</span>
            </div>
            <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 14, color: t.textPrimary, lineHeight: 1 }}>
              Nap<span style={{ color: t.amber }}>Stop</span>
            </div>
          </div>
          <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg border" style={{ borderColor: t.danger + '55', backgroundColor: t.danger + '11' }}>
            <LogOut size={7} color={t.danger} />
            <span style={{ fontSize: 6, color: t.danger, fontWeight: 600 }}>Logout</span>
          </div>
        </div>

        {/* Destination card */}
        <div className="rounded-2xl border p-2" style={{ backgroundColor: t.card, borderColor: t.border }}>
          <div className="flex items-center gap-1 mb-1">
            <Navigation size={7} color={t.textSecondary} />
            <span style={{ fontSize: 6, color: t.textSecondary, fontWeight: 600, letterSpacing: 0.5 }}>DESTINATION</span>
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 11, fontWeight: 700, color: t.textPrimary, fontFamily: 'Syne,sans-serif' }}>SM City Sorsogon</span>
            <X size={10} color={t.textMuted} />
          </div>
        </div>

        {/* Alert radius card */}
        <div className="rounded-2xl border p-2" style={{ backgroundColor: t.card, borderColor: t.border }}>
          <div className="flex items-center gap-1 mb-1.5">
            <Bell size={7} color={t.textSecondary} />
            <span style={{ fontSize: 6, color: t.textSecondary, fontWeight: 600, letterSpacing: 0.5 }}>ALERT ME WHEN</span>
          </div>
          <div className="flex gap-1">
            {['200m','500m','1km','2km'].map((r,i)=>(
              <div key={r} className="flex-1 rounded-xl py-1 text-center"
                style={{ fontSize: 7, fontWeight: 700, backgroundColor: i===2 ? t.amber : t.inputBg, color: i===2 ? '#0F1B2D' : t.textSecondary, border: i!==2 ? `1px solid ${t.border}` : 'none' }}>
                {r}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 6, color: t.textMuted, marginTop: 4 }}>Wake me 1km before my stop</div>
        </div>

        {/* Alarm type card */}
        <div className="rounded-2xl border p-2" style={{ backgroundColor: t.card, borderColor: t.border }}>
          <div className="flex items-center gap-1 mb-1.5">
            <Zap size={7} color={t.textSecondary} />
            <span style={{ fontSize: 6, color: t.textSecondary, fontWeight: 600, letterSpacing: 0.5 }}>ALARM TYPE</span>
          </div>
          <div className="flex gap-1">
            {[{l:'Vibrate',I:Vibrate},{l:'Sound',I:Volume2},{l:'Both',I:AlertCircle}].map(({l,I},i)=>(
              <div key={l} className="flex-1 rounded-xl py-1.5 flex flex-col items-center gap-0.5"
                style={{ backgroundColor: i===2 ? t.amber : t.inputBg, border: i!==2 ? `1px solid ${t.border}` : 'none' }}>
                <I size={11} color={i===2 ? '#0F1B2D' : t.textSecondary} />
                <span style={{ fontSize: 6, fontWeight: 600, color: i===2 ? '#0F1B2D' : t.textSecondary }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Trip button */}
        <div className="rounded-2xl py-2.5 flex items-center justify-center gap-1.5" style={{ backgroundColor: t.amber }}>
          <Bus size={11} color="#0F1B2D" />
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 11, color: '#0F1B2D' }}>Start Trip</span>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex justify-around items-center px-2 py-1.5 border-t" style={{ backgroundColor: t.navBg, borderColor: t.border }}>
        {[{I:Home,l:'Home',a:true},{I:Star,l:'Favorites',a:false},{I:Clock,l:'History',a:false},{I:User,l:'Profile',a:false}].map(({I,l,a})=>(
          <div key={l} className="flex flex-col items-center gap-0.5">
            <I size={13} color={a ? t.amber : t.textMuted} />
            <span style={{ fontSize: 6, color: a ? t.amber : t.textMuted, fontWeight: 600 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // ── Active Trip Screen — mirrors TripActiveScreen.tsx: map + floating panel ──
  const ActiveTripScreen = () => (
    <div className="relative h-full overflow-hidden" style={{ backgroundColor: t.bg }}>
      {/* Fake map background */}
      <div className="absolute inset-0" style={{
        backgroundColor: dark ? '#0D2137' : '#E8F0F8',
        backgroundImage: [
          `repeating-linear-gradient(0deg, ${dark?'#1E3A5522':'#C8DCF044'} 0px, ${dark?'#1E3A5522':'#C8DCF044'} 1px, transparent 1px, transparent 32px)`,
          `repeating-linear-gradient(90deg, ${dark?'#1E3A5522':'#C8DCF044'} 0px, ${dark?'#1E3A5522':'#C8DCF044'} 1px, transparent 1px, transparent 32px)`,
        ].join(','),
      }} />
      {/* Fake road lines */}
      <div className="absolute" style={{ top: '30%', left: 0, right: 0, height: 6, backgroundColor: dark ? '#1E3A55' : '#FFFFFF', opacity: 0.7 }} />
      <div className="absolute" style={{ top: 0, bottom: 0, left: '40%', width: 6, backgroundColor: dark ? '#1E3A55' : '#FFFFFF', opacity: 0.7 }} />
      <div className="absolute" style={{ top: '60%', left: 0, right: 0, height: 4, backgroundColor: dark ? '#162437' : '#D1DCE8', opacity: 0.5 }} />

      {/* Route polyline */}
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
        <polyline points="80,200 120,160 160,130 190,110" stroke="#F5A623" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      </svg>

      {/* Destination marker */}
      <div className="absolute z-10" style={{ top: '22%', left: '72%' }}>
        <div className="rounded-full p-1 flex items-center justify-center" style={{ backgroundColor: t.amber, width: 20, height: 20 }}>
          <MapPin size={11} color="#0F1B2D" />
        </div>
        <div className="w-1.5 h-1.5 rounded-full mx-auto" style={{ backgroundColor: t.amber }} />
      </div>

      {/* User location dot */}
      <div className="absolute z-10" style={{ top: '54%', left: '24%' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#4A9EFF', border: '2px solid white', boxShadow: '0 0 6px rgba(74,158,255,0.6)' }} />
      </div>

      {/* Floating status bar top */}
      <div className="absolute top-2 left-2 right-2 flex justify-between z-20">
        <div className="flex items-center gap-1 rounded-xl px-2 py-1 border" style={{ backgroundColor: dark ? 'rgba(15,27,45,0.92)' : 'rgba(255,255,255,0.92)', borderColor: t.border }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#2ED573' }} />
          <span style={{ fontSize: 7, fontWeight: 600, color: t.textPrimary }}>On the way</span>
        </div>
        <div className="rounded-xl px-2 py-1 border" style={{ backgroundColor: dark ? 'rgba(15,27,45,0.92)' : 'rgba(255,255,255,0.92)', borderColor: t.border }}>
          <span style={{ fontSize: 7, fontWeight: 700, color: t.amber }}>04:32</span>
        </div>
      </div>

      {/* Bottom trip panel */}
      <div className="absolute bottom-0 left-0 right-0 z-20 border-t px-2 pt-2 pb-1.5" style={{ backgroundColor: t.bg, borderColor: t.border }}>
        {/* Destination row */}
        <div className="flex items-center gap-1.5 rounded-2xl border px-2 py-1.5 mb-1.5" style={{ backgroundColor: t.card, borderColor: t.border }}>
          <div className="rounded-full p-1" style={{ backgroundColor: t.amber }}>
            <Navigation size={7} color="#0F1B2D" />
          </div>
          <div className="flex-1">
            <div style={{ fontSize: 5, color: t.textSecondary, fontWeight: 600 }}>DESTINATION</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: t.textPrimary }}>SM City Sorsogon</div>
          </div>
          <div className="rounded-lg px-1.5 py-0.5 border" style={{ borderColor: '#2ED573', backgroundColor: '#2ED57322' }}>
            <span style={{ fontSize: 7, fontWeight: 700, color: '#2ED573' }}>2.4 km</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-1 mb-1.5">
          {[{I:Navigation,v:'2.4 km',l:'Distance'},{I:Clock,v:'04:32',l:'Elapsed'},{I:Bell,v:'500m',l:'Alert At'}].map(({I,v,l})=>(
            <div key={l} className="flex-1 rounded-2xl border py-1.5 flex flex-col items-center" style={{ backgroundColor: t.card, borderColor: t.border }}>
              <I size={9} color={t.textSecondary} />
              <span style={{ fontSize: 8, fontWeight: 700, color: t.textPrimary, marginTop: 2 }}>{v}</span>
              <span style={{ fontSize: 5, color: t.textMuted }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Stop trip button */}
        <div className="rounded-2xl border flex items-center justify-center gap-1 py-1.5" style={{ borderColor: t.danger + '66', backgroundColor: t.danger + '11' }}>
          <Square size={8} color={t.danger} fill={t.danger} />
          <span style={{ fontSize: 8, fontWeight: 700, color: t.danger }}>Stop Trip</span>
        </div>
      </div>
    </div>
  )

  // ── Profile Screen — mirrors ProfileScreen.tsx ──
  const ProfileScreen = () => (
    <div className="h-full flex flex-col" style={{ backgroundColor: t.bg }}>
      {/* Decorative circles */}
      <div className="absolute rounded-full pointer-events-none" style={{ width: 120, height: 120, top: -30, right: -30, opacity: 0.35, backgroundColor: t.circle1 }} />

      {/* Header */}
      <div className="flex items-center gap-2 px-2.5 pt-2 pb-1.5">
        <div className="rounded-xl p-1 border" style={{ backgroundColor: t.card, borderColor: t.border }}>
          <Navigation size={9} color={t.textSecondary} style={{ transform: 'rotate(180deg)' }} />
        </div>
        <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 13, color: t.textPrimary }}>Profile</span>
      </div>

      <div className="flex-1 overflow-hidden px-2.5 space-y-1.5">
        {/* Avatar + name card */}
        <div className="rounded-2xl border p-2.5 flex flex-col items-center" style={{ backgroundColor: t.card, borderColor: t.border }}>
          <div className="rounded-full flex items-center justify-center mb-1.5" style={{ width: 40, height: 40, backgroundColor: t.amber }}>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 16, color: '#0F1B2D' }}>D</span>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.textPrimary }}>Den Cabria</div>
          <div style={{ fontSize: 7, color: t.textMuted }}>den@email.com</div>
        </div>

        {/* Stats row */}
        <div className="flex gap-1">
          {[{v:'12',l:'Total Trips'},{v:'48.3',l:'km Traveled'},{v:'3',l:'Favorites'}].map(s=>(
            <div key={s.l} className="flex-1 rounded-2xl border py-1.5 flex flex-col items-center" style={{ backgroundColor: t.card, borderColor: t.border }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: t.amber }}>{s.v}</span>
              <span style={{ fontSize: 5, color: t.textMuted, textAlign: 'center' }}>{s.l}</span>
            </div>
          ))}
        </div>

        {/* Theme toggle */}
        <div className="rounded-2xl border p-2" style={{ backgroundColor: t.card, borderColor: t.border }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="rounded-xl p-1 border" style={{ backgroundColor: t.inputBg, borderColor: t.border }}>
                <Moon size={9} color={t.textSecondary} />
              </div>
              <div>
                <div style={{ fontSize: 8, fontWeight: 600, color: t.textPrimary }}>Dark Mode</div>
                <div style={{ fontSize: 6, color: t.textMuted }}>Tap to switch</div>
              </div>
            </div>
            <div className="rounded-full flex items-center px-0.5" style={{ width: 28, height: 16, backgroundColor: dark ? t.amber : t.border }}>
              <div className="rounded-full bg-white" style={{ width: 12, height: 12, transform: `translateX(${dark ? 12 : 0}px)`, transition: 'transform 0.2s' }} />
            </div>
          </div>
        </div>

        {/* About */}
        <div className="rounded-2xl border p-2" style={{ backgroundColor: t.card, borderColor: t.border }}>
          <div style={{ fontSize: 6, color: t.textSecondary, fontWeight: 600, letterSpacing: 0.5, marginBottom: 6 }}>ABOUT</div>
          {[{l:'Version',v:'1.0.0 BETA'},{l:'Developer',v:'DEN'},{l:'Region',v:'Philippines 🇵🇭'}].map((item,i)=>(
            <div key={item.l} className="flex justify-between items-center" style={{ paddingTop: 4, paddingBottom: 4, borderBottom: i<2?`1px solid ${t.border}`:'none' }}>
              <span style={{ fontSize: 7, color: t.textMuted }}>{item.l}</span>
              <span style={{ fontSize: 7, fontWeight: 600, color: t.textSecondary }}>{item.v}</span>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="rounded-2xl border flex items-center justify-center gap-1 py-2" style={{ borderColor: t.danger + '66', backgroundColor: t.card }}>
          <LogOut size={9} color={t.danger} />
          <span style={{ fontSize: 8, fontWeight: 700, color: t.danger }}>Logout</span>
        </div>
      </div>

      {/* Bottom Nav — Profile active */}
      <div className="flex justify-around items-center px-2 py-1.5 border-t" style={{ backgroundColor: t.navBg, borderColor: t.border }}>
        {[{I:Home,l:'Home',a:false},{I:Star,l:'Favorites',a:false},{I:Clock,l:'History',a:false},{I:User,l:'Profile',a:true}].map(({I,l,a})=>(
          <div key={l} className="flex flex-col items-center gap-0.5">
            <I size={13} color={a ? t.amber : t.textMuted} />
            <span style={{ fontSize: 6, color: a ? t.amber : t.textMuted, fontWeight: 600 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // ── Trip History Screen ──
  const HistoryScreen = () => (
    <div className="h-full flex flex-col" style={{ backgroundColor: t.bg }}>
      <div className="flex-1 overflow-hidden px-2.5 pt-2 pb-1 space-y-1.5">
        <div className="flex items-center justify-between mb-0.5">
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 13, color: t.textPrimary }}>Trip History</span>
          <span style={{ fontSize: 7, color: t.danger, fontWeight: 600 }}>Clear All</span>
        </div>

        {/* Frequent header */}
        <div className="rounded-2xl border p-2" style={{ borderColor: t.amber + '66', backgroundColor: t.amberDim }}>
          <div className="flex items-center gap-1 mb-1">
            <Zap size={7} color={t.amber} />
            <span style={{ fontSize: 6, color: t.amber, fontWeight: 700, letterSpacing: 0.5 }}>FREQUENT</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 20, height: 20, backgroundColor: t.amber }}>
              <MapPin size={10} color="#0F1B2D" />
            </div>
            <div className="flex-1">
              <div style={{ fontSize: 9, fontWeight: 700, color: t.textPrimary }}>SM City Sorsogon</div>
              <div style={{ fontSize: 6, color: t.amber }}>Visited 5x</div>
            </div>
            <Star size={11} color={t.amber} fill={t.amber} />
          </div>
        </div>

        {/* History items */}
        {[
          { name: 'Sorsogon City Hall', dist: '1.2 km', time: '8 min', starred: true },
          { name: 'Sorsogon Capitol', dist: '3.5 km', time: '18 min', starred: false },
          { name: 'Balogo Sports Complex', dist: '2.1 km', time: '11 min', starred: false },
        ].map((d)=>(
          <div key={d.name} className="rounded-2xl border p-2 flex items-center gap-1.5" style={{ backgroundColor: t.card, borderColor: t.border }}>
            <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: 20, height: 20, backgroundColor: t.amber }}>
              <MapPin size={9} color="#0F1B2D" />
            </div>
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 8, fontWeight: 700, color: t.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
              <div style={{ fontSize: 6, color: t.textMuted }}>{d.dist} • {d.time}</div>
            </div>
            <Star size={10} color={d.starred ? t.amber : t.textMuted} fill={d.starred ? t.amber : 'none'} />
          </div>
        ))}
      </div>

      {/* Bottom Nav — History active */}
      <div className="flex justify-around items-center px-2 py-1.5 border-t" style={{ backgroundColor: t.navBg, borderColor: t.border }}>
        {[{I:Home,l:'Home',a:false},{I:Star,l:'Favorites',a:false},{I:Clock,l:'History',a:true},{I:User,l:'Profile',a:false}].map(({I,l,a})=>(
          <div key={l} className="flex flex-col items-center gap-0.5">
            <I size={13} color={a ? t.amber : t.textMuted} />
            <span style={{ fontSize: 6, color: a ? t.amber : t.textMuted, fontWeight: 600 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const screens = [
    { label: 'Home Screen', Content: HomeScreen },
    { label: 'Active Trip', Content: ActiveTripScreen },
    { label: 'Trip History', Content: HistoryScreen },
    { label: 'Profile', Content: ProfileScreen },
  ]

  return (
    <section id="screenshots" style={{ backgroundColor: t.bg, minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div ref={ref} className={`text-center mb-8 sm:mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 border"
            style={{ borderColor: t.borderStrong, backgroundColor: t.amberDim }}>
            <Smartphone size={11} color={t.amber} />
            <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono,monospace', color: t.amber, letterSpacing: 2 }}>SCREENSHOTS</span>
          </div>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: t.textPrimary }}>
            See it <span style={{ color: t.amber }}>in action</span>
          </h2>
        </div>

        {/* 2 col on mobile, 4 col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {screens.map(({ label, Content }, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { ref: sRef, inView: sInView } = useInView(0.1)
            return (
              <div key={label} ref={sRef}
                className={`transition-all duration-700 ${sInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <MiniScreen label={label}><Content /></MiniScreen>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Download ─────────────────────────────────────────────────────────────────
function DownloadSection() {
  const { dark } = useTheme()
  const t = dark ? darkTheme : lightTheme
  const { ref, inView } = useInView()

  return (
    <section id="download" className="py-32 sm:py-48 relative overflow-hidden"
      style={{ backgroundColor: dark ? '#08111e' : '#E8F0F8' }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full animate-pulse-glow"
          style={{ background: `radial-gradient(circle, ${t.amber}22, transparent)`, filter: 'blur(80px)' }} />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mx-auto mb-6 w-16 h-16 rounded-2xl flex items-center justify-center glow-amber"
            style={{ backgroundColor: t.amber }}>
            <Bus size={32} color="#0F1B2D" />
          </div>

          <h2 className="mb-3" style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.6rem, 6vw, 2.8rem)', color: t.textPrimary, lineHeight: 1.1 }}>
            Ready to sleep<br />
            <span style={{ color: t.amber }} className="text-glow">without worry?</span>
          </h2>
          <p className="mb-8 leading-relaxed" style={{ fontWeight: 300, color: t.textSecondary, fontSize: 'clamp(13px, 3vw, 15px)' }}>
            NapStop is free and available on Android. Download it now and never miss your stop again.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a href="https://github.com/mawi1C/napstop/releases/download/v1-0/NapStop.apk" className="btn-amber font-bold px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2"
              style={{ color: '#0F1B2D', textDecoration: 'none', fontSize: 14 }}>
              <Smartphone size={18} color="#0F1B2D" /> Download APK
            </a>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {['React Native', 'Expo', 'Firebase', 'Google Maps API', 'Zustand', 'TypeScript'].map(tech => (
              <span key={tech} className="border rounded-full px-3 py-1"
                style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace', color: t.textMuted, borderColor: t.border }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 sm:gap-8 justify-center">
            {[{ Icon: Shield, text: 'No data sold' }, { Icon: Battery, text: 'Battery optimized' }, { Icon: Navigation, text: 'GPS accurate' }].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5" style={{ color: t.textMuted, fontSize: 12 }}>
                <Icon size={13} color={t.amber} />{text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const { dark } = useTheme()
  const t = dark ? darkTheme : lightTheme

  return (
    <footer className="border-t py-8" style={{ borderColor: t.border, backgroundColor: t.bg }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 18, color: t.textPrimary }}>
          Nap<span style={{ color: t.amber }}>Stop</span>
          <span style={{ fontSize: 10, fontWeight: 400, color: t.textMuted, marginLeft: 8 }}>v1.0.0 BETA</span>
        </div>
        <div className="flex items-center gap-1.5" style={{ color: t.textMuted, fontSize: 11 }}>
          <MapPin size={11} color={t.amber} />
          Made for Filipino commuters · Sorsogon City, Bicol
        </div>
        <div className="flex gap-5">
          {['Features', 'How It Works', 'Download'].map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`}
              style={{ fontSize: 11, color: t.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = t.amber)}
              onMouseLeave={e => (e.currentTarget.style.color = t.textMuted)}>
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true)
  useEffect(() => { document.body.className = dark ? 'dark' : 'light' }, [dark])

  return (
    <ThemeCtx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      <Navbar />
      <HeroSection />
      <TickerBanner />
      <FeaturesSection />
      <HowItWorksSection />
      <ScreenshotsSection />
      <DownloadSection />
      <Footer />
    </ThemeCtx.Provider>
  )
}