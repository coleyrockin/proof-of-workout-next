export default function Footer({ generated, week }: { generated: string, week: string }) {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', textAlign: 'center', padding: '32px 16px 36px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-mid)' }}>
        <span style={{ color: 'var(--color-wolf)', fontWeight: 500 }}>✓ Apple Health Verified</span>
        <span>Source: Apple HealthKit</span>
        <span>Generated {generated}</span>
        <span style={{ color: 'var(--color-dim)', fontSize: '9px', marginTop: '2px' }}>{week}</span>
      </div>

      <div
        style={{
          marginTop: '28px',
          paddingTop: '22px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '24px',
            letterSpacing: '4px',
            color: 'var(--color-white)',
            lineHeight: 1,
          }}
        >
          <span style={{ color: 'var(--color-wolf)' }}>PO</span>WO
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.18em',
            color: 'var(--color-mid)',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Proof of Workout</span>
          <span style={{ color: 'var(--color-dim)' }}>·</span>
          <span>
            Built by{' '}
            <a
              href="https://github.com/coleyrockin"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-wolf)', textDecoration: 'none' }}
            >
              @coleyrockin
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
