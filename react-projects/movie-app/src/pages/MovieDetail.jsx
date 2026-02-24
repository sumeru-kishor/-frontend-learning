import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// Full movie data with extra details for detail page
const MOVIES = [
  { id: 1, title: 'Inception',       genre: 'Sci-Fi',  year: 2010, rating: 8.8, emoji: '🌀', director: 'Christopher Nolan',  duration: '148 min', plot: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into a CEO\'s mind.' },
  { id: 2, title: 'The Dark Knight', genre: 'Action',  year: 2008, rating: 9.0, emoji: '🦇', director: 'Christopher Nolan',  duration: '152 min', plot: 'When the Joker wreaks havoc on Gotham, Batman must confront one of the greatest psychological tests of his ability to fight injustice.' },
  { id: 3, title: 'Interstellar',    genre: 'Sci-Fi',  year: 2014, rating: 8.6, emoji: '🚀', director: 'Christopher Nolan',  duration: '169 min', plot: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.' },
  { id: 4, title: 'Pulp Fiction',    genre: 'Crime',   year: 1994, rating: 8.9, emoji: '💼', director: 'Quentin Tarantino', duration: '154 min', plot: 'The lives of two mob hitmen, a boxer, and a pair of diner bandits intertwine in four tales of violence and redemption.' },
  { id: 5, title: 'The Matrix',      genre: 'Sci-Fi',  year: 1999, rating: 8.7, emoji: '💊', director: 'The Wachowskis',    duration: '136 min', plot: 'A hacker discovers the shocking truth that the life he knows is the elaborate deception of an evil cyber-intelligence.' },
  { id: 6, title: 'Forrest Gump',    genre: 'Drama',   year: 1994, rating: 8.8, emoji: '🏃', director: 'Robert Zemeckis',   duration: '142 min', plot: 'The life journey of a kind-hearted man from Alabama who witnesses and influences several defining historical events.' },
]

function MovieDetail() {
  const { id } = useParams()       // get :id from URL
  const navigate = useNavigate()

  const [movie,   setMovie]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simulated API delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        const found = MOVIES.find(m => m.id === parseInt(id))
        if (!found) throw new Error('Movie not found!')
        setMovie(found)

      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id])   // re-runs if id changes in URL

  return (
    <div style={styles.page}>

      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => navigate('/movies')}>
        ← Back to Movies
      </button>

      {/* Loading State */}
      {loading && (
        <div style={styles.center}>
          <div style={styles.spinner} />
          <p style={{ color: '#64748b', marginTop: '16px' }}>Loading movie details...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={styles.errorBox}>
          ❌ {error}
        </div>
      )}

      {/* Movie Detail */}
      {!loading && !error && movie && (
        <div style={styles.card}>

          {/* Top Section */}
          <div style={styles.top}>
            <div style={styles.emoji}>{movie.emoji}</div>
            <div>
              <h1 style={styles.title}>{movie.title}</h1>
              <div style={styles.tags}>
                <span style={styles.tag}>{movie.genre}</span>
                <span style={styles.tag}>{movie.year}</span>
                <span style={{ ...styles.tag, color: '#fbbf24', borderColor: '#fbbf24' }}>
                  ⭐ {movie.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Info Rows */}
          <div style={styles.infoSection}>
            {[
              { label: 'Director',  value: movie.director  },
              { label: 'Duration',  value: movie.duration  },
              { label: 'Genre',     value: movie.genre     },
              { label: 'Released',  value: movie.year      },
            ].map(row => (
              <div key={row.label} style={styles.infoRow}>
                <span style={styles.infoLabel}>{row.label}</span>
                <span style={styles.infoValue}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Plot */}
          <div style={styles.plotSection}>
            <h3 style={styles.plotTitle}>📖 Plot</h3>
            <p style={styles.plot}>{movie.plot}</p>
          </div>

        </div>
      )}

    </div>
  )
}

const styles = {
  page: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  backBtn: {
    background: 'transparent',
    border: '1px solid #2a2a38',
    color: '#94a3b8',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '28px',
    fontWeight: '600',
  },
  center: {
    textAlign: 'center',
    padding: '60px 0',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #2a2a38',
    borderTop: '4px solid #7c3aed',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto',
  },
  errorBox: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '10px',
    padding: '20px',
    color: '#fca5a5',
    textAlign: 'center',
  },
  card: {
    background: '#1a1a24',
    border: '1px solid #2a2a38',
    borderRadius: '16px',
    padding: '32px',
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    marginBottom: '28px',
  },
  emoji: { fontSize: '72px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#e2e8f0', marginBottom: '12px' },
  tags:  { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  tag: {
    padding: '4px 12px',
    border: '1px solid #2a2a38',
    borderRadius: '20px',
    fontSize: '13px',
    color: '#94a3b8',
  },
  infoSection: {
    borderTop: '1px solid #2a2a38',
    borderBottom: '1px solid #2a2a38',
    padding: '20px 0',
    marginBottom: '24px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #1f1f2e',
    fontSize: '14px',
  },
  infoLabel: { color: '#64748b', fontWeight: '600' },
  infoValue: { color: '#e2e8f0', fontWeight: '600' },
  plotSection: {},
  plotTitle: { fontSize: '17px', color: '#e2e8f0', marginBottom: '12px' },
  plot: { color: '#94a3b8', lineHeight: '1.8', fontSize: '15px' },
}

export default MovieDetail