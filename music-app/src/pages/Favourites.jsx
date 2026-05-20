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
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          fontWeight: "bold", 
          mb: 1,
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        Your Favourites
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          mb: 4,
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        {favorites.length} {favorites.length === 1 ? "track" : "tracks"} you
        love
      </Typography>

      {favorites.length === 0 ? (
        <Typography
          variant="h6"
          component="h2"
          color="text.secondary"
          sx={{ 
            mt: 4, 
            textAlign: "center",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          No favorites added yet. Go explore some music!
        </Typography>
      ) : (
        <Grid
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // Mobile: 1 column
              sm: "repeat(2, 1fr)", // Tablet: 2 columns
              md: "repeat(3, 1fr)", // Medium: 3 columns
              lg: "repeat(4, 1fr)", // Large: 4 columns
              xl: "repeat(5, 1fr)", // Extra large: 5 columns
            },
            gap: { xs: 2, sm: 2.5, md: 3 },
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
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: { xs: "none", md: "translateY(-5px)" },
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
                "&:active": {
                  transform: "scale(0.98)",
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
              <CardContent sx={{ pb: 1 }}>
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{ fontWeight: "bold", fontSize: { xs: "0.875rem", sm: "1rem" } }}
                >
                  {track.trackName}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  display="block"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {track.artistName}
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(track);
                  }}
                  sx={{
                    mt: 1,
                    minHeight: "40px",
                    minWidth: "40px",
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
