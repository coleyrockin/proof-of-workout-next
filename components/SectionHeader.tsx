'use client'
import { motion } from 'framer-motion'

interface Props {
  label: string
  meta?: string
}

export default function SectionHeader({ label, meta }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      style={{
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        position: 'relative',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="powo-tick"
          style={{
            display: 'inline-block',
            width: '2px',
            height: '12px',
            background: 'var(--accent-blue)',
            transformOrigin: 'top',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--color-white)',
          }}
        >
          {label}
        </span>
      </span>
      {meta && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue-dim)',
          }}
        >
          {meta}
        </span>
      )}
    </motion.div>
  )
}
