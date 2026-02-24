import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>🎬 MovieVault</span>
      <div style={styles.links}>
        <Link
          to="/"
          style={{
            ...styles.link,
            color: location.pathname === '/' ? '#a78bfa' : '#94a3b8'
          }}
        >
          Home
        </Link>
        <Link
          to="/movies"
          style={{
            ...styles.link,
            color: location.pathname.startsWith('/movies') ? '#a78bfa' : '#94a3b8'
          }}
        >
          Movies
        </Link>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    background: '#1a1a24',
    borderBottom: '1px solid #2a2a38',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#e2e8f0',
  },
  links: { display: 'flex', gap: '24px' },
  link: {
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'color 0.2s',
  },
}

export default Navbar