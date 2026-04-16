'use client'
import { motion } from 'framer-motion'
import { ACTIVITY_SVG_ICONS } from '@/lib/icons'
import type { WeeklySummary, DailyMetric, Workout } from '@/lib/types'

interface Props {
  summary: WeeklySummary
  daily: DailyMetric[]
  workouts: Workout[]
}

const DAY_LABELS = ['TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON']

export default function ActivityRings({ daily, workouts }: Props) {
  const maxCal = Math.max(...daily.map(d => d.active_calories))

  // Group workouts by date
  const workoutsByDate: Record<string, string[]> = {}
  for (const w of workouts) {
    if (!workoutsByDate[w.date]) workoutsByDate[w.date] = []
    // dedupe activity types per day
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
          padding: '20px 16px 16px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--color-mid)',
            marginBottom: '16px',
          }}
        >
          Week Burn · Active Calories by Day
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
            const barHeight = Math.max(Math.round(pct * 96), 6)

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
                {/* Workout icons */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    minHeight: '48px',
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
                    fontFamily: 'var(--font-mono)',
                    fontSize: '9px',
                    color: isPeak ? 'var(--accent-amber)' : 'var(--color-mid)',
                    textAlign: 'center',
                    lineHeight: 1,
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
                    height: '96px',
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
                      borderRadius: '3px 3px 0 0',
                      background: isPeak
                        ? 'var(--accent-amber)'
                        : `rgba(36, 139, 245, ${0.25 + pct * 0.75})`,
                    }}
                  />
                </div>

                {/* Day label */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '8px',
                    letterSpacing: '0.05em',
                    color: isPeak ? 'var(--accent-amber)' : 'var(--color-mid)',
                    textAlign: 'center',
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
