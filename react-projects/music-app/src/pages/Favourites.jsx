import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Favourites() {
  const navigate = useNavigate()

  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : []
  })

  const removeFavourite = (e, trackId) => {
    e.stopPropagation(); // Prevents navigating to details when clicking remove
    const updated = favourites.filter(f => f.trackId !== trackId)
    setFavourites(updated)
    localStorage.setItem('favourites', JSON.stringify(updated))
  }

  return (
    <div style={styles.mainContent}>
      <h2 style={styles.heading}>Your Favourites</h2>
      <p style={styles.subHeading}>{favourites.length} track{favourites.length !== 1 ? 's' : ''} you love</p>

      {/* Empty State */}
      {favourites.length === 0 && (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🎵</div>
          <p style={styles.emptyText}>No favourites yet</p>
          <p style={styles.emptySub}>Go to tracks and tap the heart to save songs here</p>
          <button style={styles.loadMoreBtn} onClick={() => navigate('/')}>
            Browse Tracks
          </button>
        </div>
      )}

      {/* Grid Layout - Matches image_2d02dc.png */}
      {favourites.length > 0 && (
        <div style={styles.grid}>
          {favourites.map(track => (
            <div 
              key={track.trackId} 
              style={styles.card} 
              onClick={() => navigate(`/tracks/${track.trackId}`, { state: { track } })}
            >
              <div style={styles.imgWrapper}>
                <img
                  src={track.artworkUrl100.replace('100x100', '600x600')}
                  alt={track.trackName}
                  style={styles.img}
                />
                {/* Remove Button - Bottom Left & Transparent per your last request */}
                <button 
                  style={styles.favButton} 
                  onClick={(e) => removeFavourite(e, track.trackId)}
                >
                  <HeartIcon filled={true} />
                </button>
              </div>
              <div style={styles.trackName}>{track.trackName}</div>
              <div style={styles.artistName}>{track.artistName}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Transparent Icon Component
const HeartIcon = ({ filled }) => (
  <svg 
    width="22" height="22" viewBox="0 0 24 24" 
    fill={filled ? "#ff4d4d" : "none"} 
    stroke={filled ? "#ff4d4d" : "#fff"} 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const styles = {
  mainContent: {
    flex: 1,
    maxWidth: '1100px', // Matches your "organized" layout
    margin: '0 auto',
    padding: '72px 20px 80px 20px',
    fontFamily: "'Inter', sans-serif",
  },
  heading: {
    fontSize: '32px',
    fontWeight: '800', // Match "Discover Music" boldness
    letterSpacing: '-0.04em',
    margin: '0 0 8px 0',
    color: '#1a202c',
  },
  subHeading: {
    fontSize: '16px',
    color: '#718096',
    marginBottom: '48px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', // Strict 5-column grid
    gap: '32px 20px',
  },
  card: { cursor: 'pointer', display: 'flex', flexDirection: 'column' },
  imgWrapper: {
    width: '100%',
    aspectRatio: '1 / 1', // Forces uniform square
    borderRadius: '16px', // Match rounded corners in image_223482.jpg
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
    marginBottom: '12px',
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  favButton: {
    position: 'absolute',
    bottom: '12px',
    left: '12px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    zIndex: 10,
    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))'
  },
  trackName: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '4px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  artistName: { fontSize: '12px', color: '#94a3b8' },
  loadMoreBtn: {
    padding: '12px 32px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif",
  },
  empty: {
    textAlign: 'center',
    padding: '80px 40px',
    background: '#fff',
    borderRadius: '16px',
    border: '1px solid #f0f0f0',
  },
  emptyIcon: { fontSize: '56px', marginBottom: '16px' },
  emptyText: { fontSize: '20px', fontWeight: '800', color: '#1a202c', marginBottom: '8px' },
  emptySub: { color: '#94a3b8', fontSize: '14px', marginBottom: '24px' },
}

export default Favourites