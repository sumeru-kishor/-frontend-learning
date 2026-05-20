import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";
import TrackList from "./pages/TrackList";
import TrackDetails from "./pages/TrackDetails";
import Favourites from "./pages/Favourites";
import { Box, useMediaQuery, useTheme } from "@mui/material";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleFavorite = (track) => {
    setFavorites((prev) =>
      prev.find((t) => t.trackId === track.trackId)
        ? prev.filter((t) => t.trackId !== track.trackId)
        : [...prev, track],
    );
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            minHeight: "100vh",
            width: { xs: "100%", sm: "calc(100% - 240px)" }
          }}
          onClick={() => isMobile && mobileOpen && handleDrawerToggle()}
        >
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
