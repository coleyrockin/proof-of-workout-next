'use client'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import type { Pushup } from '@/lib/types'

interface Props { pushups: Pushup[], total: number }

const DAY_LABELS: Record<string, string> = {
  '2026-04-13': 'Mon Apr 13',
  '2026-04-14': 'Tue Apr 14',
  '2026-04-15': 'Wed Apr 15',
  '2026-04-17': 'Fri Apr 17',
}
const DAY_NOTES: Record<string, string> = {
  '2026-04-13': 'Century day',
  '2026-04-14': 'Follow-up',
  '2026-04-15': 'Quick set',
  '2026-04-17': 'Strong finish',
}

export default function PushupLog({ pushups, total }: Props) {
  const bestReps = Math.max(...pushups.map(p => p.reps))
  return (
    <section>
      <SectionHeader label="Pushup Log" meta="Week of Apr 13–19" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)', borderTop: 'none' }}>
        {pushups.map((p, i) => {
          const isBest = p.reps === bestReps
          return (
            <motion.div
              key={p.date}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="powo-lift"
              style={{ background: 'var(--color-card)', padding: '20px 16px', textAlign: 'center', position: 'relative' }}
            >
              {isBest && (
                <div style={{
                  position: 'absolute', top: '8px', right: '8px',
                  fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em',
                  color: 'var(--color-black)', background: 'var(--accent-amber)',
                  padding: '2px 6px', borderRadius: '2px', fontWeight: 700,
                }}>
                  PR
                </div>
              )}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-mid)', marginBottom: '8px' }}>{DAY_LABELS[p.date]}</div>
              <div className={isBest ? 'powo-glow-amber' : 'powo-glow-blue'} style={{ fontFamily: 'var(--font-display)', fontSize: '52px', lineHeight: 1, color: isBest ? 'var(--accent-amber)' : 'var(--accent-blue)' }}>{p.reps}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-mid)', marginTop: '6px' }}>{DAY_NOTES[p.date]}</div>
            </motion.div>
          )
        })}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28 }}
          className="powo-lift"
          style={{
            background: 'linear-gradient(180deg, #0e2a14 0%, #07140a 100%)',
            border: '1px solid #1a5c2a',
            boxShadow: 'inset 0 1px 0 rgba(52,199,89,0.25), 0 0 24px rgba(52,199,89,0.10)',
            margin: '-1px', padding: '20px 16px', textAlign: 'center',
            gridColumn: 'span 2',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-mid)', marginBottom: '8px' }}>Weekly Total</div>
          <div className="powo-glow-blue" style={{ fontFamily: 'var(--font-display)', fontSize: '64px', lineHeight: 1, color: 'var(--accent-blue)' }}>{total}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-mid)', marginTop: '6px' }}>{pushups.length} sessions</div>
        </motion.div>
      </div>
    </section>
  )
}
