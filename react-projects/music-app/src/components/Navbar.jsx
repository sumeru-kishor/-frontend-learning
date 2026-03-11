import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  // SVG for the Home Icon
  const HomeIcon = ({ color }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )

  // SVG for the Heart Icon
  const HeartIcon = ({ color }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  )

  return (
    <div style={styles.navbar}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`}
      </style>

      <div style={styles.logo}>
        <div>
          <div style={styles.logoText}>MusicStream</div>
          <div style={styles.logoSub}>Your music, your way</div>
        </div>
      </div>
      <div style={styles.links}>
        <Link
          to="/"
          style={{
            ...styles.link,
            background: isActive('/') ? '#000' : 'transparent',
            color: isActive('/') ? '#fff' : '#64748b',
          }}
        >
          <HomeIcon color={isActive('/') ? '#fff' : '#64748b'} />
          <span>Home</span>
        </Link>

        <Link
          to="/favourites"
          style={{
            ...styles.link,
            background: isActive('/favourites') ? '#000' : 'transparent',
            color: isActive('/favourites') ? '#fff' : '#64748b',
          }}
        >
          <HeartIcon color={isActive('/favourites') ? '#fff' : '#64748b'} />
          <span>Favourites</span>
        </Link>
      </div>

      {/* User Section */}
      <div style={styles.user}>
        <div style={styles.userAvatar}>U</div>
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
    width: '240px',
    minHeight: '100vh',
    background: '#fff',
    borderRight: '1px solid #f0f0f0',
    padding: '32px 16px',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', sans-serif",
    position: 'sticky',
    top: 0,
  },
  logo: {
    padding: '0 12px 40px 12px',
  },
  logoText: { 
    fontSize: '20px', 
    fontWeight: '700', 
    color: '#000',
    letterSpacing: '-0.02em'
  },
  logoSub: { fontSize: '12px', color: '#94a3b8', marginTop: '4px' },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  link: {
    textDecoration: 'none',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.2s ease',
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: 'auto',
    padding: '16px 12px',
   
  },
  userAvatar: {
    width: '44px', 
    height: '44px',
    borderRadius: '50%',
  
    background: 'linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '18px',
    fontFamily: "'Inter', sans-serif",
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: { 
    fontSize: '16px', 
    fontWeight: '600', 
    color: '#1e293b',  
    lineHeight: '1.2',
  },
  userPlan: { 
    fontSize: '13px', 
    color: '#94a3b8', 
    marginTop: '2px',
    fontWeight: '400',
  },
}


export default Navbar