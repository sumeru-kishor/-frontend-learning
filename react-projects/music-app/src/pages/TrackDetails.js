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
          gap: 5,
          mb: 6,
          alignItems: "flex-start",
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
              width: 320,
              height: 320,
              borderRadius: "inherit",
              objectFit: "cover",
            }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 300 }}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ letterSpacing: 2 }}
          >
            SINGLE
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 800, mb: 0 }}
          >
            {track.trackName}
          </Typography>
          <Typography
            variant="h4"
            component="h2"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            {track.artistName}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<PlayArrow />}
              sx={{
                borderRadius: 10,
                px: 4,
                py: 1,
                fontSize: "1.1rem",
                textTransform: "none",
                bgcolor: theme.palette.text.primary,
                color: theme.palette.background.paper,
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
              gap: 2,
              paddingTop: 2,
            }}
          >
            <IconButton
              onClick={() => toggleFavorite(track)}
              sx={{ border: `1px solid ${theme.palette.divider}` }}
            >
              {isFav ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
            <IconButton sx={{ border: `1px solid ${theme.palette.divider}` }}>
              <Share />
            </IconButton>
            <IconButton sx={{ border: `1px solid ${theme.palette.divider}` }}>
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
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
