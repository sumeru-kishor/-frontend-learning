import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MOVIES = [
  { id: 1, title: 'Inception',       genre: 'Sci-Fi', year: 2010, rating: 8.8, emoji: '🌀' },
  { id: 2, title: 'The Dark Knight', genre: 'Action', year: 2008, rating: 9.0, emoji: '🦇' },
  { id: 3, title: 'Interstellar',    genre: 'Sci-Fi', year: 2014, rating: 8.6, emoji: '🚀' },
  { id: 4, title: 'Pulp Fiction',    genre: 'Crime',  year: 1994, rating: 8.9, emoji: '💼' },
  { id: 5, title: 'The Matrix',      genre: 'Sci-Fi', year: 1999, rating: 8.7, emoji: '💊' },
  { id: 6, title: 'Forrest Gump',    genre: 'Drama',  year: 1994, rating: 8.8, emoji: '🏃' },
]

function MovieList() {
  const navigate = useNavigate()

  const [movies,  setMovies]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const [search,  setSearch]  = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      setError(null)
      try {
        await new Promise(resolve => setTimeout(resolve, 1200))
        setMovies(MOVIES)
      } catch (err) {
        setError('Failed to load movies. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  const filtered = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase()) ||
    movie.genre.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={styles.page}>

      <h2 style={styles.heading}>All Movies</h2>

      <input
        style={styles.search}
        type="text"
        placeholder="🔍 Search by title or genre..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {/* Loading State */}
      {loading && (
        <div style={styles.center}>
          <div style={styles.spinner}></div>
          <p style={{ color: '#64748b', marginTop: '16px' }}>Loading movies...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={styles.errorBox}>
          <p>❌ {error}</p>
          <button style={styles.retryBtn} onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}

      {/* Empty Result */}
      {!loading && !error && filtered.length === 0 && (
        <p style={styles.empty}>No movies found for "{search}"</p>
      )}

      {/* Movie Grid */}
      {!loading && !error && filtered.length > 0 && (
        <div style={styles.grid}>
          {filtered.map(movie => (
            <div
              key={movie.id}
              style={styles.card}
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <div style={styles.emoji}>{movie.emoji}</div>
              <div style={styles.title}>{movie.title}</div>
              <div style={styles.meta}>{movie.genre} • {movie.year}</div>
              <div style={styles.rating}>⭐ {movie.rating}</div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

const styles = {
  page: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 24px',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '20px',
    color: '#e2e8f0',
  },
  search: {
    width: '100%',
    padding: '12px 16px',
    background: '#1a1a24',
    border: '1px solid #2a2a38',
    borderRadius: '10px',
    color: '#e2e8f0',
    fontSize: '15px',
    outline: 'none',
    marginBottom: '28px',
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
    textAlign: 'center',
    color: '#fca5a5',
  },
  retryBtn: {
    marginTop: '12px',
    padding: '8px 20px',
    background: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  empty: {
    color: '#64748b',
    textAlign: 'center',
    padding: '40px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  card: {
    background: '#1a1a24',
    border: '1px solid #2a2a38',
    borderRadius: '14px',
    padding: '24px',
    cursor: 'pointer',
  },
  emoji:  { fontSize: '40px', marginBottom: '12px' },
  title:  { fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: '#e2e8f0' },
  meta:   { fontSize: '13px', color: '#64748b', marginBottom: '8px' },
  rating: { fontSize: '14px', color: '#fbbf24', fontWeight: '700' },
}

export default MovieList