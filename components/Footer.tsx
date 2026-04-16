export default function Footer({ generated, week }: { generated: string, week: string }) {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', textAlign: 'center', padding: '24px 16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-mid)' }}>
        <span style={{ color: 'var(--color-wolf)', fontWeight: 500 }}>✓ Apple Health Verified</span>
        <span>Source: Apple HealthKit</span>
        <span>Generated {generated}</span>
        <span style={{ color: 'var(--color-dim)', fontSize: '9px', marginTop: '2px' }}>{week}</span>
      </div>
    </footer>
  )
}
