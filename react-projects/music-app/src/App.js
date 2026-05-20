import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import TrackList from "./pages/TrackList";
import TrackDetails from "./pages/TrackDetails";
import Favourites from "./pages/Favourites";
import { Box } from "@mui/material";

function App() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (track) => {
    setFavorites((prev) =>
      prev.find((t) => t.trackId === track.trackId)
        ? prev.filter((t) => t.trackId !== track.trackId)
        : [...prev, track],
    );
  };

  return (
      <Router>
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <TrackList
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />
                }
              />
              <Route
                path="/details/:id"
                element={
                  <TrackDetails
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <Favourites
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                  />
                }
              />
            </Routes>
          </Box>
        </Box>
      </Router>
  );
}

export default App;
