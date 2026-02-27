import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TrackList from './pages/TrackList'
import TrackDetail from './pages/TrackDetail'
import Favourites from './pages/Favourites'

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Routes>
          <Route path="/"           element={<TrackList />} />
          <Route path="/tracks/:id" element={<TrackDetail />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </div>
    </div>
  )
}

export default App