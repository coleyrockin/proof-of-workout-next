'use client'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import type { DailyMetric, Workout } from '@/lib/types'

interface Props { daily: DailyMetric[]; workouts: Workout[] }

const DAY_LABELS = ['Sat 11','Sun 12','Mon 13','Tue 14','Wed 15','Thu 16','Fri 17']

const COL_HEADERS: { text: string; srOnly: boolean }[] = [
  { text: 'Day',         srOnly: true  },
  { text: 'Steps',       srOnly: false },
  { text: 'Steps trend', srOnly: true  },
  { text: 'Cal',         srOnly: false },
  { text: 'Min',         srOnly: false },
  { text: 'RHR',         srOnly: false },
  { text: 'HRV',         srOnly: false },
]

const srOnly: React.CSSProperties = {
  position: 'absolute', width: '1px', height: '1px', padding: 0,
  margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap', border: 0,
}

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
      <div
        style={{ overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', border: '1px solid var(--color-border)', borderTop: 'none' }}
        className="no-scrollbar"
      >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <caption style={srOnly}>Daily fitness breakdown, Apr 11–17</caption>
            <thead>
              <tr>
                {COL_HEADERS.map((h, i) => (
                  <th
                    key={i}
                    scope="col"
                    style={{
                      background: 'var(--color-card)', fontFamily: 'var(--font-mono)', fontSize: '11px',
                      letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-white)',
                      borderBottom: '1px solid var(--color-border)', padding: '12px 6px',
                      textAlign: i === 0 ? 'left' : 'right', whiteSpace: 'nowrap',
                      ...(i === 0 ? { paddingLeft: '10px' } : {}),
                    }}
                  >
                    {h.srOnly ? <span style={srOnly}>{h.text}</span> : h.text}
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
                    <td style={{ padding: '14px 6px 14px 10px', textAlign: 'left', fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '13px', whiteSpace: 'nowrap', color: calLeader ? 'var(--accent-amber)' : stepsLeader ? 'var(--accent-blue)' : 'var(--color-white)' }}>
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
                    <td style={{ padding: '14px 6px', textAlign: 'right', fontFamily: 'var(--font-display)', fontSize: '17px', color: stepsLeader ? 'var(--accent-blue)' : 'var(--color-white)' }}>{d.steps.toLocaleString()}</td>
                    <td style={{ padding: '14px 4px', minWidth: '50px' }}>
                      <div style={{ height: '5px', borderRadius: '3px', background: 'linear-gradient(180deg, #2e2e2e, #3e3e3e)', overflow: 'hidden', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.4)' }}>
                        <div style={{
                          height: '5px', borderRadius: '3px',
                          background: 'linear-gradient(180deg, #5aa6ff, var(--accent-blue))',
                          boxShadow: '0 0 8px rgba(36,139,245,0.5)',
                          width: `${pct}%`,
                        }} />
                      </div>
                    </td>
                    <td style={{ padding: '14px 6px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '13px', color: calLeader ? 'var(--accent-amber)' : 'var(--color-white)', fontWeight: calLeader ? 600 : 500 }}>{d.active_calories.toLocaleString()}</td>
                    <td style={{ padding: '14px 6px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, color: 'var(--color-white)' }}>{d.exercise_minutes}</td>
                    <td style={{ padding: '14px 6px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, color: d.resting_heart_rate <= 60 ? 'var(--accent-blue)' : 'var(--color-white)' }}>{d.resting_heart_rate}</td>
                    <td style={{ padding: '14px 10px 14px 6px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 500, color: d.hrv_ms >= 60 ? 'var(--accent-blue)' : 'var(--color-white)' }}>{Math.round(d.hrv_ms)}</td>
                  </motion.tr>
                )
              })}
            </tbody>
        </table>
      </div>
    </section>
  )
}
