import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div style={styles.page}>

      <h1 style={styles.heading}>Welcome to MusicStream 🎵</h1>
      <p style={styles.sub}>Explore your favourite tracks and discover new sounds</p>

      <div style={styles.cards}>
        <div style={styles.card} onClick={() => navigate('/tracks')}>
          <div style={styles.cardIcon}>🎵</div>
          <div style={styles.cardTitle}>Browse Tracks</div>
          <div style={styles.cardDesc}>Discover the latest and greatest music</div>
        </div>
        <div style={styles.card} onClick={() => navigate('/favourites')}>
          <div style={styles.cardIcon}>🩷</div>
          <div style={styles.cardTitle}>Favourites</div>
          <div style={styles.cardDesc}>Your saved tracks in one place</div>
        </div>
      </div>

    </div>
  )
}

const styles = {
  page: { maxWidth: '800px' },
  heading: { fontSize: '32px', fontWeight: '800', marginBottom: '10px', color: '#1a1a2e' },
  sub: { color: '#64748b', fontSize: '16px', marginBottom: '40px' },
  cards: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  card: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '32px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  cardIcon: { fontSize: '40px', marginBottom: '16px' },
  cardTitle: { fontSize: '18px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' },
  cardDesc: { fontSize: '14px', color: '#64748b' },
}

export default Home