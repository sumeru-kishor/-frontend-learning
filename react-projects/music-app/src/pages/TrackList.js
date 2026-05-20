import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const TrackList = ({ toggleFavorite, favorites }) => {
  const [songs, setSongs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://itunes.apple.com/search?term=pop&entity=song&limit=50")
      .then((res) => res.json())
      .then((data) => {
        console.log("data=====>", data);
        setSongs(data.results);
      })
      .catch((err) => console.error("Error:", err));
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setVisibleCount((prev) => Math.min(prev + 10, songs.length));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [songs.length]);

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
        Discover Music
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Explore your favorite tracks and discover new sounds
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 3,
        }}
      >
        {songs.slice(0, visibleCount).map((track) => {
          const isFav = favorites.some((f) => f.trackId === track.trackId);
          return (
            <Card
              key={track.trackId}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
              }}
              onClick={() =>
                navigate(`/details/${track.trackId}`, { state: { track } })
              }
            >
              <CardMedia
                component="img"
                loading="lazy"
                sx={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  width: "100%",
                }}
                image={track.artworkUrl30.replace(
                  "30x30bb.jpg",
                  "400x400bb.jpg",
                )}
                alt={track.trackName}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{ fontWeight: "bold" }}
                >
                  {track.trackName}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  display="block"
                >
                  {track.artistName}
                </Typography>

                <Box
                  sx={{
                    mt: "auto",
                    pt: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(track);
                    }}
                  >
                    {isFav ? <Favorite color="error" /> : <FavoriteBorder />}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default TrackList;
