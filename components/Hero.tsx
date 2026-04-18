'use client'
import { motion } from 'framer-motion'
import CountUp from './CountUp'
import type { WeekData } from '@/lib/types'

interface Props { data: WeekData }

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

export default function Hero({ data }: Props) {
  const s = data.weekly_summary
  const [weekStart, weekEnd] = data.week.split(' to ')
  const fmtDate = (iso: string) => {
    const d = new Date(iso + 'T00:00:00')
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
  }

  const kpis = [
    { node: <CountUp value={s.vo2_max} decimals={1} />, label: 'VO₂ MAX', color: 'var(--accent-blue)' },
    { node: <CountUp value={s.steps_total / 1000} decimals={0} suffix="K" />, label: 'STEPS THIS WEEK', color: 'var(--accent-green)' },
    { node: <CountUp value={s.active_calories_total} />, label: 'ACTIVE CAL', color: 'var(--accent-amber)' },
    { node: <CountUp value={s.exercise_minutes_total} />, label: 'EXERCISE MIN', color: 'var(--accent-purple)' },
    { node: <CountUp value={s.workout_sessions} />, label: 'WORKOUT SESSIONS', color: 'var(--accent-coral)' },
  ]

  return (
    <header style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--color-border)', padding: '52px 24px 36px' }}>
      {/* Ambient color orbs — soft atmospheric depth */}
      <div aria-hidden style={{
        position: 'absolute', top: '-80px', left: '-60px', width: '320px', height: '320px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(36,139,245,0.18), transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: '-60px', right: '-40px', width: '260px', height: '260px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,170,34,0.10), transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: '40%', right: '20%', width: '180px', height: '180px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(179,102,255,0.08), transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      {/* Ghost bg text */}
      <div
        style={{
          position: 'absolute', right: '-16px', top: '-8px',
          fontFamily: 'var(--font-display)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          fontSize: 'clamp(96px, 30vw, 220px)',
          WebkitTextStroke: '1px #1a1a1a', color: 'transparent', letterSpacing: '-4px',
        }}
        aria-hidden
      >
        POWO
      </div>

      {/* Apple Health badge with live pulse */}
      <motion.div {...fadeUp(0.05)} className="powo-badge-glow" style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: 'linear-gradient(180deg, #3ddb6a 0%, #2bb04c 100%)', color: 'var(--color-black)',
        fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 600,
        letterSpacing: '0.14em', textTransform: 'uppercase',
        padding: '5px 12px', marginBottom: '20px', borderRadius: '2px',
        position: 'relative',
      }}>
        <span aria-hidden style={{ position: 'relative', width: '7px', height: '7px', display: 'inline-block' }}>
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--color-black)',
            animation: 'powo-pulse 2s ease-out infinite',
          }} />
          <span style={{
            position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--color-black)',
          }} />
        </span>
        Apple Health Verified
      </motion.div>

      {/* Title */}
      <motion.h1
        {...fadeUp(0.1)}
        style={{
          fontFamily: 'var(--font-display)', lineHeight: 0.88, letterSpacing: '2px',
          fontSize: 'clamp(56px, 18vw, 120px)', marginBottom: '6px',
        }}
      >
        <span className="powo-glow-blue" style={{ color: 'var(--accent-blue)' }}>PO</span><span className="powo-glow-white" style={{ color: 'var(--color-white)' }}>WO</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.div {...fadeUp(0.15)} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-white)', letterSpacing: '0.04em', marginTop: '16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
        <span>COLEY</span>
        <span style={{ color: 'var(--color-dim)' }}>·</span>
        <span style={{ color: 'var(--accent-blue-dim)' }}>{fmtDate(weekStart)} – {fmtDate(weekEnd)}, 2026</span>
        <span style={{ color: 'var(--color-dim)' }}>·</span>
        <span style={{
          display: 'inline-block',
          border: '1px solid var(--accent-blue)',
          color: 'var(--accent-blue)',
          padding: '2px 7px',
          letterSpacing: '0.12em',
          fontSize: '11px',
          fontWeight: 600,
        }}>
          WK 16 / 52
        </span>
      </motion.div>

      {/* KPIs */}
      <div style={{ marginTop: '28px', paddingTop: '28px', borderTop: '1px solid var(--color-border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px 0' }}>
          {kpis.slice(0, 3).map((k, i) => (
            <motion.div key={k.label} {...fadeUp(0.2 + i * 0.06)} style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
              <span className={
                k.color === 'var(--accent-blue)'   ? 'powo-glow-blue'   :
                k.color === 'var(--accent-green)'  ? 'powo-glow-green'  :
                k.color === 'var(--accent-amber)'  ? 'powo-glow-amber'  :
                k.color === 'var(--accent-coral)'  ? 'powo-glow-coral'  :
                k.color === 'var(--accent-purple)' ? 'powo-glow-purple' : ''
              } style={{ fontFamily: 'var(--font-display)', fontSize: '38px', lineHeight: 1, color: k.color }}>{k.node}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-white)' }}>{k.label}</span>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '24px' }}>
          {kpis.slice(3).map((k, i) => (
            <motion.div key={k.label} {...fadeUp(0.38 + i * 0.06)} style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
              <span className={
                k.color === 'var(--accent-blue)'   ? 'powo-glow-blue'   :
                k.color === 'var(--accent-green)'  ? 'powo-glow-green'  :
                k.color === 'var(--accent-amber)'  ? 'powo-glow-amber'  :
                k.color === 'var(--accent-coral)'  ? 'powo-glow-coral'  :
                k.color === 'var(--accent-purple)' ? 'powo-glow-purple' : ''
              } style={{ fontFamily: 'var(--font-display)', fontSize: '38px', lineHeight: 1, color: k.color }}>{k.node}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-white)' }}>{k.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  )
}
