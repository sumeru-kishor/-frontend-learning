import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

function TrackList() {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadStep, setLoadStep] = useState(0); 
  const [favorites, setFavorites] = useState([]); // Stores IDs for heart UI sync

  const observer = useRef();

  // Sequence: 20 -> 20 -> 10
  const getFetchParams = () => {
    if (loadStep === 0) return { limit: 20, offset: 0 };
    if (loadStep === 1) return { limit: 20, offset: 20 };
    if (loadStep === 2) return { limit: 10, offset: 40 };
    return null;
  };

  const fetchTracks = useCallback(async () => {
    const params = getFetchParams();
    if (loading || !hasMore || !params) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=pop&entity=song&limit=${params.limit}&offset=${params.offset}`
      );
      const data = await res.json();
      
      if (!data.results || data.results.length === 0) {
        setHasMore(false);
      } else {
        setTracks(prev => [...prev, ...data.results]);
        if (loadStep >= 2) {
          setHasMore(false);
        } else {
          setLoadStep(prev => prev + 1);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [loadStep, loading, hasMore]);

  // Sync favorites with localStorage on mount
  useEffect(() => {
    fetchTracks();
    const saved = localStorage.getItem('favourites');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFavorites(parsed.map(f => f.trackId));
    }
  }, []);

  // Updated toggle to save full track object for the Favourites Tab
  const toggleFavorite = (e, track) => {
    e.stopPropagation(); 
    const saved = localStorage.getItem('favourites');
    let currentFavourites = saved ? JSON.parse(saved) : [];

    const isAlreadyFavorited = currentFavourites.some(f => f.trackId === track.trackId);
    let updatedFavourites;

    if (isAlreadyFavorited) {
      updatedFavourites = currentFavourites.filter(f => f.trackId !== track.trackId);
    } else {
      updatedFavourites = [...currentFavourites, track];
    }

    // Save to localStorage so Favourites.jsx can read it
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    // Update local state for immediate heart color change
    setFavorites(updatedFavourites.map(f => f.trackId));
  };

  const lastElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchTracks();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchTracks]);

  return (
    <div style={styles.mainContent}>
      <h2 style={styles.heading}>Discover Music</h2>
      <p style={styles.subHeading}>Explore your favorite tracks and discover new sounds</p>

      <div style={styles.grid}>
        {tracks.map((track, index) => {
          const isLastItem = tracks.length === index + 1;
          const isFavorited = favorites.includes(track.trackId);

          return (
            <div 
              key={`${track.trackId}-${index}`} 
              ref={isLastItem ? lastElementRef : null}
              style={styles.card} 
              onClick={() => navigate(`/tracks/${track.trackId}`, { state: { track } })}
            >
              <div style={styles.imgWrapper}>
                <img
                  src={track.artworkUrl100.replace('100x100', '600x600')}
                  alt={track.trackName}
                  style={styles.img}
                  loading="lazy" 
                />
                <button 
                  style={styles.favButton} 
                  onClick={(e) => toggleFavorite(e, track)}
                >
                  <HeartIcon filled={isFavorited} />
                </button>
              </div>
              <div style={styles.trackName}>{track.trackName}</div>
              <div style={styles.artistName}>{track.artistName}</div>
            </div>
          );
        })}
      </div>

      <div style={styles.footer}>
        {loading && <div style={styles.status}>Fetching...</div>}
        {!hasMore && tracks.length > 0 && <div style={styles.status}>End of Discovery</div>}
      </div>
    </div>
  );
}

const HeartIcon = ({ filled }) => (
  <svg 
    width="22" height="22" viewBox="0 0 24 24" 
    fill={filled ? "#ff4d4d" : "none"} 
    stroke={filled ? "#ff4d4d" : "rgba(255, 255, 255, 0.9)"} 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  </svg>
);

const styles = {
  mainContent: { flex: 1, maxWidth: '1100px', margin: '0 auto', padding: '72px 20px 80px 20px', fontFamily: "'Inter', sans-serif" },
  heading: { fontSize: '32px', fontWeight: '800', letterSpacing: '-0.04em', margin: '0 0 8px 0', color: '#1a202c' },
  subHeading: { fontSize: '16px', color: '#718096', marginBottom: '48px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '32px 20px' },
  card: { 
    cursor: 'pointer', 
    display: 'flex', 
    flexDirection: 'column',
    backgroundColor: '#ffffff', // White card background
    borderRadius: '16px',
    padding: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)', // Subtle shadow
  },
  imgWrapper: { 
    width: '100%', aspectRatio: '1 / 1', borderRadius: '12px', 
    overflow: 'hidden', backgroundColor: '#f1f5f9', marginBottom: '12px', position: 'relative' 
  },
  img: { width: '100%', height: '100%', objectFit: 'cover' },
  favButton: {
    position: 'absolute', bottom: '12px', left: '12px', background: 'transparent',
    border: 'none', cursor: 'pointer', padding: 0, display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 10,
    filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))'
  },
  trackName: { 
    fontSize: '14px', fontWeight: '700', color: '#1a202c', marginBottom: '4px', 
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 4px' 
  },
  artistName: { fontSize: '12px', color: '#94a3b8', padding: '0 4px' },
  footer: { padding: '60px 0', textAlign: 'center' },
  status: { color: '#94a3b8' }
};

export default TrackList;