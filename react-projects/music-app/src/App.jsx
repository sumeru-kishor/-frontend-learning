import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import TrackList from './pages/TrackList'
import TrackDetail from './pages/TrackDetail'
//  import Favourites from './pages/Favourites'
const Favourites =  lazy(() => import('./pages/Favourites'));

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/"           element={<TrackList />} />
            <Route path="/tracks/:id" element={<TrackDetail />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </Suspense>
        </div>
    </div>
  )
}

export default App