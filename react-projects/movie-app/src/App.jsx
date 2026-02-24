import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieList from './pages/MovieList'
import MovieDetail from './pages/MovieDetail'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/movies"     element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </>
  )
}

export default App

