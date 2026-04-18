'use client'
import { motion } from 'framer-motion'
import { ACTIVITY_SVG_ICONS } from '@/lib/icons'
import type { WeeklySummary, DailyMetric, Workout } from '@/lib/types'

interface Props {
  summary: WeeklySummary
  daily: DailyMetric[]
  workouts: Workout[]
}

const DAY_LABELS = ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI']

export default function ActivityRings({ daily, workouts }: Props) {
  const maxCal = Math.max(...daily.map(d => d.active_calories))

  // Group workouts by date
  const workoutsByDate: Record<string, string[]> = {}
  for (const w of workouts) {
    if (!workoutsByDate[w.date]) workoutsByDate[w.date] = []
    if (!workoutsByDate[w.date].includes(w.activity)) {
      workoutsByDate[w.date].push(w.activity)
    }
  }

  return (
    <section>
      <div
        style={{
          background: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          padding: '20px 16px 18px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-white)',
            }}
          >
            Week Burn
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-mid)',
            }}
          >
            Active kcal · by day
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '6px',
            alignItems: 'flex-end',
          }}
        >
          {daily.map((d, i) => {
            const pct = d.active_calories / maxCal
            const isPeak = d.active_calories === maxCal
            const dayWorkouts = workoutsByDate[d.date] ?? []
            const barHeight = Math.max(Math.round(pct * 104), 6)

            return (
              <div
                key={d.date}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {/* PEAK badge (only on peak day) */}
                {isPeak && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      letterSpacing: '0.16em',
                      color: 'var(--color-black)',
                      background: 'var(--accent-amber)',
                      padding: '2px 6px',
                      borderRadius: '2px',
                      fontWeight: 700,
                    }}
                  >
                    PEAK
                  </motion.div>
                )}

                {/* Workout icons */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    minHeight: isPeak ? '38px' : '50px',
                    justifyContent: 'flex-end',
                  }}
                >
                  {dayWorkouts.slice(0, 3).map(activity => {
                    const Icon =
                      ACTIVITY_SVG_ICONS[activity] ??
                      ACTIVITY_SVG_ICONS['Unknown Activity']
                    return (
                      <Icon
                        key={activity}
                        size={13}
                        color={isPeak ? 'var(--accent-amber)' : 'var(--color-mid)'}
                      />
                    )
                  })}
                </div>

                {/* Calorie label */}
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: isPeak ? '14px' : '12px',
                    color: isPeak ? 'var(--accent-amber)' : 'var(--color-white)',
                    textAlign: 'center',
                    lineHeight: 1,
                    letterSpacing: '0.5px',
                  }}
                >
                  {d.active_calories >= 1000
                    ? (d.active_calories / 1000).toFixed(1) + 'k'
                    : d.active_calories}
                </div>

                {/* Bar */}
                <div
                  style={{
                    width: '100%',
                    height: '104px',
                    display: 'flex',
                    alignItems: 'flex-end',
                  }}
                >
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: barHeight }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: '100%',
                      borderRadius: '4px 4px 0 0',
                      background: isPeak
                        ? 'linear-gradient(180deg, #ffc857 0%, var(--accent-amber) 60%, #d98e0a 100%)'
                        : `linear-gradient(180deg, rgba(94, 168, 255, ${0.4 + pct * 0.6}), rgba(36, 139, 245, ${0.3 + pct * 0.7}))`,
                      boxShadow: isPeak
                        ? '0 0 28px rgba(255, 170, 34, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                        : `0 0 12px rgba(36, 139, 245, ${0.15 + pct * 0.25}), inset 0 1px 0 rgba(255, 255, 255, 0.12)`,
                    }}
                  />
                </div>

                {/* Day label */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    color: isPeak ? 'var(--accent-amber)' : 'var(--color-mid)',
                    textAlign: 'center',
                    fontWeight: isPeak ? 600 : 400,
                  }}
                >
                  {DAY_LABELS[i]}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
