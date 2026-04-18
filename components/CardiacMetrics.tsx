'use client'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import type { DailyMetric } from '@/lib/types'

interface Props { daily: DailyMetric[] }

const DAY_LABELS = ['Apr 11','Apr 12','Apr 13','Apr 14','Apr 15','Apr 16','Apr 17']

function MiniChart({ values, color, max }: { values: (number | null)[], color: string, max: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
      {values.map((v, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-mid)' }}>
          <span style={{ width: '44px', flexShrink: 0 }}>{DAY_LABELS[i]}</span>
          <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'linear-gradient(180deg, #2e2e2e, #3e3e3e)', overflow: 'hidden', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.4)' }}>
            {v !== null && (
              <div style={{
                height: '6px', borderRadius: '3px',
                background: `linear-gradient(180deg, color-mix(in srgb, ${color} 100%, white 18%), ${color})`,
                boxShadow: `0 0 8px color-mix(in srgb, ${color} 60%, transparent)`,
                width: `${Math.round((v / max) * 100)}%`,
              }} />
            )}
          </div>
          <span style={{ width: '36px', textAlign: 'right', fontWeight: 600, color: v !== null ? 'var(--color-white)' : 'var(--color-mid)' }}>
            {v !== null ? v : '—'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function CardiacMetrics({ daily }: Props) {
  const vitals = [
    { label: 'Resting Heart Rate',  main: '65 bpm',    sub: '7-day avg · range 56–75',       good: true,  values: daily.map(d => d.resting_heart_rate),          max: 100, color: 'var(--color-blue)' },
    { label: 'HRV',                    main:'60 ms',   sub: 'SDNN avg · peak 71.5 ms',        good: true,  values: daily.map(d => Math.round(d.hrv_ms)),          max: 100, color: 'var(--accent-green)' },
    { label: 'Average Heart Rate',   main: '87 bpm',  sub: 'all-day avg',                    good: false, values: daily.map(d => Math.round(d.avg_heart_rate)),  max: 150, color: 'var(--color-blue)' },
    { label: 'Walking HR Avg',       main: '119 bpm', sub: 'includes sprints/jogs',          good: false, values: daily.map(d => Math.round(d.walking_heart_rate)),max:160, color: 'var(--accent-coral)' },
    { label: 'Resp Rate',             main: '14.5 br/m',sub:'sleep avg · range 13.6–15.4',   good: true,  values: daily.map(d => d.respiratory_rate) as (number|null)[], max:20, color:'var(--accent-green)' },
    { label: 'Wrist Temp',           main: '95.2 °F', sub: 'sleep baseline',                good: false, values: daily.map(d => d.wrist_temp_c ? +(d.wrist_temp_c * 9/5 + 32).toFixed(1) : null),  max: 97,  color: 'var(--accent-coral)' },
  ]

  return (
    <section>
      <SectionHeader label="Cardiac Metrics" meta="daily trends" />
      {/* Legend */}
      <div style={{
        display: 'flex', gap: '16px', padding: '8px 12px',
        border: '1px solid var(--color-border)', borderTop: 'none',
        background: 'var(--color-card)',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-mid)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)', display: 'inline-block', flexShrink: 0 }} />
          Optimal range
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-mid)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-mid)', display: 'inline-block', flexShrink: 0 }} />
          Elevated / monitoring
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)', borderTop: 'none' }}>
        {vitals.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="powo-lift"
            style={{ background: 'var(--color-card)', padding: '14px 12px' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-white)', marginBottom: '6px' }}>{v.label}</div>
            <div className={v.good ? 'powo-glow-blue' : 'powo-glow-white'} style={{ fontFamily: 'var(--font-display)', fontSize: '26px', lineHeight: 1, color: v.good ? 'var(--accent-blue)' : 'var(--color-white)' }}>{v.main}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-mid)', marginTop: '6px' }}>{v.sub}</div>
            <MiniChart values={v.values} color={v.color} max={v.max} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
