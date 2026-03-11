import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ShareIcon from '../assets/images/share-icon.svg'
import EllipsisIcon from '../assets/images/ellipsis.svg'
import FavouritesIcon from '../assets/images/favourites.svg'

function TrackDetail() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [track, setTrack] = useState(location.state?.track || null)
  const [loading, setLoading] = useState(!track)
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : []
  })

  const isFavourited = favourites.some(f => f.trackId === track?.trackId)

  useEffect(() => {
    if (!track) {
      const fetchTrack = async () => {
        try {
          const res = await fetch(`https://itunes.apple.com/lookup?id=${id}`)
          const data = await res.json()
          setTrack(data.results[0])
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
      fetchTrack()
    }
  }, [id, track])

  const toggleFavourite = () => {
    let updated
    if (isFavourited) {
      updated = favourites.filter(f => f.trackId !== track.trackId)
    } else {
      updated = [...favourites, track]
    }
    setFavourites(updated)
    localStorage.setItem('favourites', JSON.stringify(updated))
  }

  if (loading) return <div style={styles.loadingState}>Loading track...</div>

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate('/')}>
  <span>←</span>
  <span>Back</span>
</button>
      <div style={styles.card}>
        {/* 2. Top Header Section */}
        <div style={styles.headerSection}>
          <img 
            src={track.artworkUrl100.replace('100x100', '600x600')} 
            alt={track.trackName} 
            style={styles.mainImg} 
          />
          <div style={styles.headerInfo}>
            <span style={styles.categoryLabel}>SINGLE</span>
            <h1 style={styles.mainTitle}>{track.trackName}</h1>
            <p style={styles.subTextArtist}>{track.artistName}</p>
            <p style={styles.metaData}>
              {track.collectionName} • {new Date(track.releaseDate).getFullYear()}
            </p>

            <div style={styles.buttonGroup}>
              <a href={track.previewUrl} target="_blank" rel="noreferrer" style={styles.playAction}>
                <span style={{ marginRight: '8px' }}>▶</span> Play
              </a>
              <button style={styles.iconCircle} onClick={toggleFavourite}>
                <img src={FavouritesIcon} alt="Fav" style={{ width: 18, height: 18, filter: isFavourited ? 'invert(21%) sepia(100%) saturate(7414%) hue-rotate(329deg) brightness(94%) contrast(93%)' : 'none' }} />
              </button>
              <button style={styles.iconCircle}>
                <img src={ShareIcon} alt="Share" style={{ width: 18, height: 18 }} />
              </button>
              <button style={styles.iconCircle}>
                <img src={EllipsisIcon} alt="More" style={{ width: 18, height: 18 }} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Track Details Container */}
        <div style={styles.detailsContainer}>
          <h3 style={styles.sectionHeading}>Track Details</h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoBlock}>
              <span style={styles.label}>Artist</span>
              <span style={styles.value}>{track.artistName}</span>
            </div>
            <div style={styles.infoBlock}>
              <span style={styles.label}>Album</span>
              <span style={styles.value}>{track.collectionName}</span>
            </div>
            <div style={styles.infoBlock}>
              <span style={styles.label}>Release Date</span>
              <span style={styles.value}>
                {new Date(track.releaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <div style={styles.infoBlock}>
              <span style={styles.label}>Genre</span>
              <span style={styles.value}>{track.primaryGenreName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { 
    flex: 1, 
    // Deepened the background color for better contrast against the white card
    backgroundColor: '#f1f5f9', 
    minHeight: '100vh', 
    padding: '40px 60px',
    fontFamily: "'Inter', sans-serif" 
  },
 backBtn: {
  background: 'none', border: 'none', color: '#64748b',
  fontSize: '14px', fontWeight: '600', cursor: 'pointer',
  marginBottom: '24px', display: 'flex', alignItems: 'center',
  gap: '6px' 
},
 card: {
  maxWidth: '1000px',
  margin: '0 auto',
  borderRadius: '24px',
  padding: '40px',
},
  headerSection: {
    display: 'flex', 
    gap: '48px', 
    alignItems: 'center', 
    marginBottom: '48px'
  },
  mainImg: {
    width: '280px', 
    height: '280px', 
    borderRadius: '20px', 
    objectFit: 'cover', 
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  headerInfo: { flex: 1 },
  categoryLabel: { 
    fontSize: '12px', 
    fontWeight: '700', 
    color: '#94a3b8', 
    letterSpacing: '0.1em', 
    marginBottom: '8px',
    display: 'block'
  },
  mainTitle: { 
    fontSize: '48px', 
    fontWeight: '800', 
    color: '#0f172a', 
    margin: '0 0 12px 0', 
    letterSpacing: '-0.02em' 
  },
  subTextArtist: { 
    fontSize: '22px', 
    color: '#475569', 
    fontWeight: '500', 
    margin: '0 0 8px 0' 
  },
  metaData: { 
    fontSize: '14px', 
    color: '#94a3b8', 
    margin: '0 0 32px 0' 
  },
  buttonGroup: { display: 'flex', gap: '16px', alignItems: 'center' },
  playAction: {
    background: '#2563eb', 
    color: '#fff', 
    padding: '12px 36px',
    borderRadius: '30px', 
    fontWeight: '700', 
    textDecoration: 'none',
    fontSize: '15px', 
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)'
  },
  iconCircle: {
    width: '48px', 
    height: '48px', 
    borderRadius: '50%', 
    border: '1px solid #e2e8f0',
    background: '#fff', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },
  detailsContainer: {
  marginTop: '40px',
  padding: '32px 40px',
  background: '#ffffff',
  borderRadius: '20px',
  border: '1px solid rgba(226, 232, 240, 0.8)',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
},
  sectionHeading: { 
    fontSize: '22px', 
    fontWeight: '800', 
    color: '#0f172a', 
    marginBottom: '24px' 
  },
  infoGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
    gap: '40px' 
  },
  infoBlock: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' },
  value: { fontSize: '16px', color: '#1e293b', fontWeight: '600' }
};

export default TrackDetail;