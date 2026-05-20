import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import {
  ArrowBack,
  PlayArrow,
  Share,
  MoreHoriz,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

const TrackDetails = ({ toggleFavorite, favorites }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const track = state?.track;

  if (!track) return <Typography sx={{ p: 4 }}>No Track Selected</Typography>;

  const isFav = favorites.some((f) => f.trackId === track.trackId);

  return (
    <Box sx={{ p: 2 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 4, color: theme.palette.primary.main, fontWeight: "bold" }}
      >
        BACK
      </Button>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: { xs: 3, md: 5 },
          mb: 6,
          alignItems: { xs: "center", md: "flex-start" },
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "flex-start" },
        }}
      >
        <Box
          sx={{
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 10px 30px rgba(0,0,0,0.5)"
                : "0 10px 30px rgba(0,0,0,0.1)",
            borderRadius: 4,
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={track.artworkUrl100.replace("100x100", "600x600")}
            alt={track.trackName}
            style={{
              width: "clamp(200px, 50vw, 320px)",
              height: "clamp(200px, 50vw, 320px)",
              borderRadius: "inherit",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "auto" }, width: { xs: "100%", sm: "auto" } }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 2, fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            SINGLE
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            sx={{ 
              fontWeight: 800, 
              mb: 0,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            {track.trackName}
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            color="text.secondary"
            sx={{ 
              mb: 4,
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
            }}
          >
            {track.artistName}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              sx={{
                borderRadius: 10,
                px: { xs: 2, sm: 4 },
                py: 1,
                fontSize: { xs: "0.9rem", sm: "1.1rem" },
                textTransform: "none",
                bgcolor: theme.palette.text.primary,
                color: theme.palette.background.paper,
                minHeight: "44px",
                "&:hover": {
                  bgcolor: theme.palette.text.secondary,
                },
              }}
            >
              Play
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              paddingTop: 2,
              flexWrap: "wrap",
            }}
          >
            <IconButton
              onClick={() => toggleFavorite(track)}
              sx={{ 
                border: `1px solid ${theme.palette.divider}`,
                minHeight: "44px",
                minWidth: "44px",
              }}
            >
              {isFav ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
            <IconButton 
              sx={{ 
                border: `1px solid ${theme.palette.divider}`,
                minHeight: "44px",
                minWidth: "44px",
              }}
            >
              <Share />
            </IconButton>
            <IconButton 
              sx={{ 
                border: `1px solid ${theme.palette.divider}`,
                minHeight: "44px",
                minWidth: "44px",
              }}
            >
              <MoreHoriz />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Technical Details Card */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          Track Details
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // Mobile: 1 column
              sm: "repeat(2, 1fr)", // Tablet: 2 columns
              md: "repeat(4, 1fr)", // Desktop: 4 columns
            },
            gap: 4,
          }}
        >
          <DetailItem label="Artist" value={track.artistName} />
          <DetailItem label="Album" value={track.collectionName} />
          <DetailItem
            label="Release Date"
            value={new Date(track.releaseDate).toLocaleDateString()}
          />
          <DetailItem label="Genre" value={track.primaryGenreName} />
        </Box>
      </Paper>
    </Box>
  );
};

const DetailItem = ({ label, value }) => (
  <Box>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ textTransform: "uppercase", fontWeight: "bold" }}
    >
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: 500 }}>
      {value}
    </Typography>
  </Box>
);

export default TrackDetails;
