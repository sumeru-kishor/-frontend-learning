import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Favourites = ({ favorites, toggleFavorite }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
        Your Favourites
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {favorites.length} {favorites.length === 1 ? "track" : "tracks"} you
        love
      </Typography>

      {favorites.length === 0 ? (
        <Typography
          variant="h6"
          component="h2"
          color="text.secondary"
          sx={{ mt: 4, textAlign: "center" }}
        >
          No favorites added yet. Go explore some music!
        </Typography>
      ) : (
        <Grid
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 3,
          }}
        >
          {favorites.map((track) => (
            <Card
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
                sx={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  width: "100%",
                }}
                image={track.artworkUrl100.replace("100x100", "400x400")}
                alt={track.trackName}
              />
              <CardContent>
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
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(track);
                  }}
                >
                  <Favorite color="error" />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favourites;
