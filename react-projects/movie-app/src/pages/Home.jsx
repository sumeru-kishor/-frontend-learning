import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div style={styles.page}>

      {/* Hero Section */}
      <div style={styles.hero}>
        <h1 style={styles.heading}>Welcome to 🎬 MovieVault</h1>
        <p style={styles.subtext}>
          Discover the greatest movies of all time. Browse, search, and explore details.
        </p>
        <button style={styles.button} onClick={() => navigate('/movies')}>
          Browse Movies →
        </button>
      </div>

      {/* Features Section */}
      <div style={styles.featuresGrid}>
        {[
          { icon: '🎥', title: 'Top Movies',    desc: 'Curated list of all-time classics'   },
          { icon: '🔍', title: 'Search',         desc: 'Find any movie instantly'             },
          { icon: '📖', title: 'Details',        desc: 'Cast, rating, plot and much more'     },
        ].map(feature => (
          <div key={feature.title} style={styles.featureCard}>
            <div style={styles.featureIcon}>{feature.icon}</div>
            <div style={styles.featureTitle}>{feature.title}</div>
            <div style={styles.featureDesc}>{feature.desc}</div>
          </div>
        ))}
      </div>

    </div>
  )
}

const styles = {
  page: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '60px 24px',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  heading: {
    fontSize: '40px',
    fontWeight: '800',
    marginBottom: '16px',
    color: '#e2e8f0',
  },
  subtext: {
    fontSize: '17px',
    color: '#64748b',
    marginBottom: '32px',
    lineHeight: '1.7',
  },
  button: {
    padding: '14px 36px',
    background: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  featureCard: {
    background: '#1a1a24',
    border: '1px solid #2a2a38',
    borderRadius: '14px',
    padding: '28px',
    textAlign: 'center',
  },
  featureIcon:  { fontSize: '36px', marginBottom: '12px' },
  featureTitle: { fontSize: '17px', fontWeight: '700', marginBottom: '8px', color: '#e2e8f0' },
  featureDesc:  { fontSize: '14px', color: '#64748b', lineHeight: '1.6' },
}

export default Home