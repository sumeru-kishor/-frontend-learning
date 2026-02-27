import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Favourites() {
  const navigate = useNavigate()

  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : []
  })

  const removeFavourite = (trackId) => {
    const updated = favourites.filter(f => f.trackId !== trackId)
    setFavourites(updated)
    localStorage.setItem('favourites', JSON.stringify(updated))
  }

  return (
    <div style={styles.page}>

      <h2 style={styles.heading}>Your Favourites</h2>
      <p style={styles.sub}>{favourites.length} track{favourites.length !== 1 ? 's' : ''} you love</p>

      {/* Empty State */}
      {favourites.length === 0 && (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🎵</div>
          <p style={styles.emptyText}>No favourites yet</p>
          <p style={styles.emptySub}>Go to tracks and tap 🤍 to save songs here</p>
          <button style={styles.browseBtn} onClick={() => navigate('/tracks')}>
            Browse Tracks
          </button>
        </div>
      )}

      {/* Favourites Grid */}
      {favourites.length > 0 && (
        <div style={styles.grid}>
          {favourites.map(track => (
            <div key={track.trackId} style={styles.card}>
              <img
                src={track.artworkUrl100}
                alt={track.trackName}
                style={styles.img}
                onClick={() => navigate(`/tracks/${track.trackId}`, { state: { track } })}
              />
              <div style={styles.info}>
                <div
                  style={styles.trackName}
                  onClick={() => navigate(`/tracks/${track.trackId}`, { state: { track } })}
                >
                  {track.trackName}
                </div>
                <div style={styles.artistName}>{track.artistName}</div>
              </div>
              <button style={styles.removeBtn} onClick={() => removeFavourite(track.trackId)}>
                🩷
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

const styles = {
  page: { maxWidth: '800px' },
  heading: { fontSize: '26px', fontWeight: '800', color: '#1a1a2e', marginBottom: '6px' },
  sub: { color: '#94a3b8', fontSize: '14px', marginBottom: '28px' },
  empty: {
    textAlign: 'center', padding: '80px 40px',
    background: '#fff', borderRadius: '16px',
    border: '1px solid #e2e8f0',
  },
  emptyIcon: { fontSize: '56px', marginBottom: '16px' },
  emptyText: { fontSize: '20px', fontWeight: '700', color: '#1a1a2e', marginBottom: '8px' },
  emptySub: { color: '#94a3b8', fontSize: '14px', marginBottom: '24px' },
  browseBtn: {
    padding: '12px 28px', background: '#1a1a2e',
    color: '#fff', border: 'none',
    borderRadius: '10px', cursor: 'pointer',
    fontWeight: '700', fontSize: '14px',
  },
  grid: { display: 'flex', flexDirection: 'column', gap: '12px' },
  card: {
    display: 'flex', alignItems: 'center',
    gap: '16px', background: '#fff',
    border: '1px solid #e2e8f0', borderRadius: '12px',
    padding: '12px 16px',
  },
  img: {
    width: '56px', height: '56px',
    borderRadius: '8px', objectFit: 'cover',
    cursor: 'pointer', flexShrink: 0,
  },
  info: { flex: 1 },
  trackName: {
    fontSize: '14px', fontWeight: '700',
    color: '#1a1a2e', cursor: 'pointer',
    marginBottom: '4px',
  },
  artistName: { fontSize: '13px', color: '#94a3b8' },
  removeBtn: {
    background: '#fce7f3', border: 'none',
    borderRadius: '8px', padding: '8px',
    cursor: 'pointer', fontSize: '16px',
  },
}

export default Favourites
