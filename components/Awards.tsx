'use client'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { IconActivity, IconGolf, IconHeartPulse, IconFlame, IconBicep, IconLightning } from '@/lib/icons'

const AWARDS = [
  { Icon: IconActivity,   color: 'var(--accent-blue)',   title: 'VO₂ MAX PERSONAL BEST',  desc: 'Confirmed at 38.3 mL/kg/min (week of Apr 14) — up from 33.4 in February. 14.7% improvement in 10 weeks.' },
  { Icon: IconGolf,       color: 'var(--accent-green)',  title: 'BIG GOLF WEEK',           desc: '4 rounds logged. Apr 12: 157-minute session burning 1,330 calories. Week\'s biggest single-session burn.' },
  { Icon: IconHeartPulse, color: 'var(--accent-coral)',  title: 'HRV RECOVERY SURGE',      desc: 'HRV peaked at 71.5 ms on Apr 14 — post-golf recovery — then dipped to 43.3 ms by Apr 16 before closing the week strong at 60.7.' },
  { Icon: IconFlame,      color: 'var(--accent-amber)',  title: '12K STEP DAY',            desc: 'Apr 16 hit 12,482 steps — the week\'s high — combined with 103 minutes of exercise and 4 workout sessions.' },
  { Icon: IconBicep,      color: 'var(--accent-purple)', title: '190 PUSHUPS THIS WEEK',   desc: '4 active days. Apr 13: century day — 100 reps across 15 sets. Volume up 36% week-over-week.' },
  { Icon: IconLightning,  color: 'var(--accent-teal)',   title: '19 WORKOUT SESSIONS',     desc: 'Golf, weight training, walking, yoga, running — 19 logged sessions across 6 active days.' },
]

export default function Awards() {
  return (
    <section>
      <SectionHeader label="Achievements" meta="this week" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', background: 'var(--color-border)', border: '1px solid var(--color-border)', borderTop: 'none' }}>
        {AWARDS.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="powo-lift"
            style={{ background: 'var(--color-card)', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <span style={{ color: a.color, lineHeight: 0 }}><a.Icon size={22} /></span>
            <span className={
              a.color === 'var(--accent-blue)'   ? 'powo-glow-blue'   :
              a.color === 'var(--accent-green)'  ? 'powo-glow-green'  :
              a.color === 'var(--accent-amber)'  ? 'powo-glow-amber'  :
              a.color === 'var(--accent-coral)'  ? 'powo-glow-coral'  :
              a.color === 'var(--accent-purple)' ? 'powo-glow-purple' : ''
            } style={{ fontFamily: 'var(--font-display)', fontSize: '15px', letterSpacing: '1px', color: a.color, lineHeight: 1.15 }}>{a.title}</span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'var(--color-mid)', lineHeight: 1.55 }}>{a.desc}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
