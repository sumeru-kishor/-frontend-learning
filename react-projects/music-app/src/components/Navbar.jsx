import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div style={styles.navbar}>

      {/* Logo */}
      <div style={styles.logo}>
        <div style={styles.logoIcon}>🎵</div>
        <div>
          <div style={styles.logoText}>MusicStream</div>
          <div style={styles.logoSub}>Your music, your way</div>
        </div>
      </div>

      {/* Nav Links */}
      <div style={styles.links}>
        <Link
          to="/"
          style={{
            ...styles.link,
            background: isActive('/') ? '#1a1a2e' : 'transparent',
            color: isActive('/') ? '#fff' : '#64748b',
          }}
        >
          🏠 Home
        </Link>

        <Link
          to="/favourites"
          style={{
            ...styles.link,
            background: isActive('/favourites') ? '#e91e8c' : 'transparent',
            color: isActive('/favourites') ? '#fff' : '#64748b',
          }}
        >
          🩷 Favourites
        </Link>
      </div>

      {/* User */}
      <div style={styles.user}>
        <div style={styles.userAvatar}>M</div>
        <div>
          <div style={styles.userName}>Music Lover</div>
          <div style={styles.userPlan}>Premium Member</div>
        </div>
      </div>

    </div>
  )
}

const styles = {
  navbar: {
    width: '220px',
    minHeight: '100vh',
    background: '#fff',
    borderRight: '1px solid #e2e8f0',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    position: 'sticky',
    top: 0,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: { fontSize: '28px' },
  logoText: { fontSize: '16px', fontWeight: '800', color: '#1a1a2e' },
  logoSub: { fontSize: '11px', color: '#94a3b8' },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  link: {
    textDecoration: 'none',
    padding: '10px 14px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
    display: 'block',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: 'auto',
    padding: '12px',
    background: '#f8fafc',
    borderRadius: '12px',
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#6366f1',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '16px',
  },
  userName: { fontSize: '13px', fontWeight: '700', color: '#1a1a2e' },
  userPlan: { fontSize: '11px', color: '#94a3b8' },
}

export default Navbar