'use client'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import type { DailyMetric, Workout } from '@/lib/types'

interface Props { daily: DailyMetric[]; workouts: Workout[] }

const DAY_LABELS = ['Tue 8','Wed 9','Thu 10','Fri 11','Sat 12','Sun 13','Mon 14']
const COL_HEADERS = ['','Steps','','Cal','Min','RHR','HRV']

export default function DailyTable({ daily, workouts }: Props) {
  const maxSteps = Math.max(...daily.map(d => d.steps))
  const maxCal = Math.max(...daily.map(d => d.active_calories))

  const workoutCountByDate: Record<string, number> = {}
  for (const w of workouts) {
    workoutCountByDate[w.date] = (workoutCountByDate[w.date] ?? 0) + 1
  }

  return (
    <section>
      <SectionHeader label="Daily Breakdown" meta="7 days" />
      <div style={{ overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', border: '1px solid var(--color-border)', borderTop: 'none' }} className="no-scrollbar">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {COL_HEADERS.map((h, i) => (
                <th key={i} style={{
                  background: 'var(--color-card)', fontFamily: 'var(--font-mono)', fontSize: '9px',
                  letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-mid)',
                  borderBottom: '1px solid var(--color-border)', padding: '10px 6px',
                  textAlign: i === 0 ? 'left' : 'right', whiteSpace: 'nowrap',
                  ...(i === 0 ? { paddingLeft: '10px' } : {}),
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daily.map((d, i) => {
              const stepsLeader = d.steps === maxSteps
              const calLeader = d.active_calories === maxCal
              const pct = Math.round((d.steps / maxSteps) * 100)
              const workoutCount = workoutCountByDate[d.date] ?? 0
              return (
                <motion.tr
                  key={d.date}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  style={{ background: '#0a0a0a', borderBottom: '1px solid #161616' }}
                >
                  <td style={{ padding: '12px 6px 12px 10px', textAlign: 'left', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '12px', whiteSpace: 'nowrap', color: calLeader ? 'var(--accent-amber)' : stepsLeader ? 'var(--color-wolf)' : 'var(--color-white)' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      {DAY_LABELS[i]}
                      {workoutCount > 0 && (
                        <span aria-label={`${workoutCount} workouts`} title={`${workoutCount} workouts`} style={{ display: 'inline-flex', gap: '2px' }}>
                          {Array.from({ length: Math.min(workoutCount, 4) }).map((_, j) => (
                            <span
                              key={j}
                              style={{
                                width: '4px', height: '4px', borderRadius: '50%',
                                background: calLeader ? 'var(--accent-amber)' : 'var(--accent-green)',
                                opacity: 0.9,
                              }}
                            />
                          ))}
                        </span>
                      )}
                    </span>
                  </td>
                  <td style={{ padding: '12px 6px', textAlign: 'right', fontFamily: 'var(--font-display)', fontSize: '15px', color: stepsLeader ? 'var(--color-wolf)' : 'var(--color-white)' }}>{d.steps.toLocaleString()}</td>
                  <td style={{ padding: '12px 4px', minWidth: '50px' }}>
                    <div style={{ height: '3px', borderRadius: '2px', background: 'var(--color-dim)', overflow: 'hidden' }}>
                      <div style={{ height: '3px', borderRadius: '2px', background: 'var(--color-wolf)', width: `${pct}%` }} />
                    </div>
                  </td>
                  <td style={{ padding: '12px 6px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '11px', color: calLeader ? 'var(--accent-amber)' : 'var(--color-white)', fontWeight: calLeader ? 600 : 400 }}>{d.active_calories.toLocaleString()}</td>
                  <td style={{ padding: '12px 6px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-white)' }}>{d.exercise_minutes}</td>
                  <td style={{ padding: '12px 6px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '11px', color: d.resting_heart_rate <= 60 ? 'var(--color-wolf)' : 'var(--color-white)' }}>{d.resting_heart_rate}</td>
                  <td style={{ padding: '12px 10px 12px 6px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '11px', color: d.hrv_ms >= 60 ? 'var(--color-wolf)' : 'var(--color-white)' }}>{Math.round(d.hrv_ms)}</td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
