'use client'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import type { SleepNight } from '@/lib/types'

interface Props { sleep: SleepNight[] }

function fmtNight(night: string) {
  const parts = night.split(' to ')
  const d1 = new Date(parts[0] + 'T00:00:00')
  const d2 = new Date(parts[1] + 'T00:00:00')
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return `${fmt(d1)} → ${fmt(d2)}`.toUpperCase()
}

export default function SleepAnalysis({ sleep }: Props) {
  const MAX_MIN = 170
  const longestMin = Math.max(...sleep.map(s => s.total_min))

  return (
    <section>
      <SectionHeader label="Sleep Analysis" meta={`${sleep.length} nights tracked`} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)', borderTop: 'none' }}>
        {sleep.map((s, i) => {
          const h = Math.floor(s.total_min / 60)
          const m = s.total_min % 60
          const efficiency = Math.round(((s.total_min - s.awake_min) / s.total_min) * 100)
          const effColor = efficiency >= 92 ? 'var(--accent-green)' : efficiency >= 88 ? 'var(--accent-amber)' : 'var(--accent-coral)'
          const isBest = s.total_min === longestMin
          const stages = [
            { label: 'Deep',  min: s.deep_min,  color: 'var(--color-blue)', max: MAX_MIN },
            { label: 'REM',   min: s.rem_min,   color: 'var(--color-amber)', max: MAX_MIN },
            { label: 'Core',  min: s.core_min,  color: 'var(--color-dim)',  max: 500 },
          ]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="powo-lift"
              style={{ background: 'var(--color-card)', padding: '18px 16px' }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'var(--color-mid)', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {fmtNight(s.night)}
                  {isBest && (
                    <span style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'var(--color-black)', background: 'var(--accent-amber)', padding: '2px 5px', borderRadius: '2px', fontWeight: 700 }}>
                      BEST
                    </span>
                  )}
                </span>
                <span style={{ color: effColor, fontSize: '11px' }}>{efficiency}%</span>
              </div>
              <div className="powo-glow-white" style={{ fontFamily: 'var(--font-display)', fontSize: '34px', lineHeight: 1, marginBottom: '4px' }}>{h}h {m}m</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-mid)', marginBottom: '14px' }}>{s.bedtime} → {s.wake_time}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {stages.map(st => (
                  <div key={st.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: st.color, flexShrink: 0 }} />
                    <span style={{ width: '40px', color: 'var(--color-mid)' }}>{st.label}</span>
                    <div style={{ flex: 1, height: '5px', borderRadius: '3px', background: 'linear-gradient(180deg, #2e2e2e, #3e3e3e)', overflow: 'hidden', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.4)' }}>
                      <div style={{
                        height: '5px', borderRadius: '3px',
                        background: `linear-gradient(180deg, color-mix(in srgb, ${st.color} 100%, white 18%), ${st.color})`,
                        boxShadow: `0 0 6px color-mix(in srgb, ${st.color} 50%, transparent)`,
                        width: `${Math.min((st.min / st.max) * 100, 100)}%`,
                      }} />
                    </div>
                    <span style={{ width: '54px', textAlign: 'right', fontWeight: 600, color: 'var(--color-white)' }}>{st.min} min</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
