import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function TrackDetail() {
  const { id }       = useParams()
  const location     = useLocation()
  const navigate     = useNavigate()

  const [track,       setTrack]       = useState(location.state?.track || null)
  const [loading,     setLoading]     = useState(!track)
  const [favourites,  setFavourites]  = useState(() => {
    // load favourites from localStorage
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : []
  })

  const isFavourited = favourites.some(f => f.trackId === track?.trackId)

  // if page is refreshed, fetch track again
  useEffect(() => {
    if (!track) {
      const fetchTrack = async () => {
        try {
          const res  = await fetch(`https://itunes.apple.com/lookup?id=${id}`)
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
  }, [id])

  const toggleFavourite = () => {
    let updated
    if (isFavourited) {
      // remove from favourites
      updated = favourites.filter(f => f.trackId !== track.trackId)
    } else {
      // add to favourites
      updated = [...favourites, track]
    }
    setFavourites(updated)
    localStorage.setItem('favourites', JSON.stringify(updated))
  }

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '60px' }}>
      <div style={styles.spinner} />
      <p style={{ color: '#94a3b8', marginTop: 16 }}>Loading track...</p>
    </div>
  )

  if (!track) return (
    <div style={{ color: '#dc2626', padding: 40 }}>Track not found.</div>
  )

  return (
    <div style={styles.page}>

      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => navigate('/tracks')}>
        ← Back
      </button>

      <div style={styles.card}>

        {/* Top Section */}
        <div style={styles.top}>
          <img src={track.artworkUrl100.replace('100x100', '300x300')} alt={track.trackName} style={styles.img} />
          <div style={styles.info}>

            <span style={styles.genre}>{track.primaryGenreName}</span>
            <h1 style={styles.trackName}>{track.trackName}</h1>
            <p style={styles.artist}>{track.artistName}</p>
            <p style={styles.album}>{track.collectionName} • {new Date(track.releaseDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

            {/* Action Buttons */}
            <div style={styles.actions}>
              <a href={track.previewUrl} target="_blank" rel="noreferrer" style={styles.playBtn}>
                ▶ Play Preview
              </a>
              <button
                style={{ ...styles.favBtn, background: isFavourited ? '#fce7f3' : '#f8fafc', color: isFavourited ? '#e91e8c' : '#64748b' }}
                onClick={toggleFavourite}
              >
                {isFavourited ? '🩷' : '🤍'}
              </button>
            </div>

          </div>
        </div>

        {/* Track Details Table */}
        <div style={styles.detailsSection}>
          <h3 style={styles.detailsTitle}>Track Details</h3>
          <div style={styles.table}>
            {[
              { label: 'Artist',       value: track.artistName },
              { label: 'Album',        value: track.collectionName },
              { label: 'Release Date', value: new Date(track.releaseDate).toLocaleDateString() },
              { label: 'Genre',        value: track.primaryGenreName },
              { label: 'Duration',     value: `${Math.floor(track.trackTimeMillis / 60000)}:${String(Math.floor((track.trackTimeMillis % 60000) / 1000)).padStart(2, '0')}` },
              { label: 'Price',        value: track.trackPrice > 0 ? `$${track.trackPrice}` : 'Free Preview' },
            ].map(row => (
              <div key={row.label} style={styles.row}>
                <span style={styles.rowLabel}>{row.label}</span>
                <span style={styles.rowValue}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

const styles = {
  page: { maxWidth: '750px' },
  backBtn: {
    background: 'transparent', border: '1px solid #e2e8f0',
    borderRadius: '8px', padding: '8px 16px',
    cursor: 'pointer', fontSize: '14px',
    color: '#64748b', marginBottom: '24px',
    fontWeight: '600',
  },
  card: {
    background: '#fff', border: '1px solid #e2e8f0',
    borderRadius: '16px', padding: '32px',
  },
  top: {
    display: 'flex', gap: '28px',
    marginBottom: '32px', flexWrap: 'wrap',
  },
  img: {
    width: '200px', height: '200px',
    borderRadius: '12px', objectFit: 'cover',
    flexShrink: 0,
  },
  info: { flex: 1 },
  genre: {
    display: 'inline-block',
    background: '#eff6ff', color: '#3b82f6',
    borderRadius: '20px', padding: '3px 12px',
    fontSize: '12px', fontWeight: '600',
    marginBottom: '12px',
  },
  trackName: { fontSize: '28px', fontWeight: '800', color: '#1a1a2e', marginBottom: '8px' },
  artist: { fontSize: '16px', color: '#64748b', marginBottom: '4px' },
  album: { fontSize: '13px', color: '#94a3b8', marginBottom: '20px' },
  actions: { display: 'flex', gap: '10px', alignItems: 'center' },
  playBtn: {
    padding: '10px 20px', background: '#1a1a2e',
    color: '#fff', borderRadius: '20px',
    textDecoration: 'none', fontSize: '14px',
    fontWeight: '700',
  },
  favBtn: {
    padding: '10px 14px', border: '1px solid #e2e8f0',
    borderRadius: '20px', cursor: 'pointer',
    fontSize: '18px',
  },
  detailsSection: {},
  detailsTitle: { fontSize: '16px', fontWeight: '700', color: '#1a1a2e', marginBottom: '16px' },
  table: { border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' },
  row: {
    display: 'flex', justifyContent: 'space-between',
    padding: '12px 16px', borderBottom: '1px solid #f1f5f9',
    fontSize: '14px',
  },
  rowLabel: { color: '#94a3b8', fontWeight: '600' },
  rowValue: { color: '#1a1a2e', fontWeight: '600' },
  spinner: {
    width: '40px', height: '40px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #e91e8c',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto',
  },
}

export default TrackDetail