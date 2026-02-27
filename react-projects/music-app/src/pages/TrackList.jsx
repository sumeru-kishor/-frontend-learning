import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function TrackList() {
  const navigate = useNavigate()
  const [tracks,  setTracks]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    const fetchTracks = async () => {
      setLoading(true)
      setError(null)
      try {
       const res = await fetch(
  'https://itunes.apple.com/search?term=pop&entity=song&limit=50'
)
        const data = await res.json()
        setTracks(data.results)
      } catch (err) {
        setError('Failed to load tracks. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchTracks()
  }, [])

  return (
    <div style={styles.page}>

      <h2 style={styles.heading}>Discover Music</h2>
      <p style={styles.sub}>Explore your favourite tracks and discover new sounds</p>

      {/* Loading */}
      {loading && (
        <div style={styles.center}>
          <div style={styles.spinner} />
          <p style={{ color: '#94a3b8', marginTop: '16px' }}>Loading tracks...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={styles.errorBox}>
          ❌ {error}
          <button style={styles.retryBtn} onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <div style={styles.grid}>
          {tracks.map(track => (
            <div
              key={track.trackId}
              style={styles.card}
              onClick={() => navigate(`/tracks/${track.trackId}`, { state: { track } })}
            >
              <img
                src={track.artworkUrl100}
                alt={track.trackName}
                style={styles.img}
              />
              <div style={styles.trackName}>{track.trackName}</div>
              <div style={styles.artistName}>{track.artistName}</div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

const styles = {
  page: { maxWidth: '900px' },
  heading: { fontSize: '26px', fontWeight: '800', color: '#1a1a2e', marginBottom: '6px' },
  sub: { color: '#94a3b8', fontSize: '14px', marginBottom: '28px' },
  center: { textAlign: 'center', padding: '60px 0' },
  spinner: {
    width: '40px', height: '40px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #e91e8c',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto',
  },
  errorBox: {
    background: '#fef2f2', border: '1px solid #fecaca',
    borderRadius: '10px', padding: '20px',
    color: '#dc2626', display: 'flex',
    alignItems: 'center', gap: '12px',
  },
  retryBtn: {
    padding: '6px 16px', background: '#dc2626',
    color: '#fff', border: 'none',
    borderRadius: '6px', cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '12px',
    cursor: 'pointer',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s',
  },
  img: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '10px',
    aspectRatio: '1',
    objectFit: 'cover',
  },
  trackName: {
    fontSize: '13px', fontWeight: '700',
    color: '#1a1a2e', marginBottom: '4px',
    overflow: 'hidden', textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  artistName: {
    fontSize: '12px', color: '#94a3b8',
    overflow: 'hidden', textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}

export default TrackList