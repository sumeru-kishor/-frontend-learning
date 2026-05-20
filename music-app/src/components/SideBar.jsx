import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Home, Favorite, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";

const Sidebar = ({ mobileOpen, onDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Favourites", icon: <Favorite />, path: "/favorites" },
  ];

  const drawerContent = (
    <Box>
      <Box sx={{ p: 3, pb: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ fontWeight: "bold", letterSpacing: 0.5 }}
            >
              MusicStream
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Your music, your way
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mx: 2, mb: 2, opacity: 0.6 }} />

      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem
              button
              key={item.text}
              onClick={() => {
                navigate(item.path);
                if (isMobile) onDrawerToggle();
              }}
              sx={{
                mb: 1,
                borderRadius: "8px",
                backgroundColor: isActive ? "#000000" : "transparent",
                color: isActive ? "#ffffff" : "inherit",
                "&:hover": {
                  backgroundColor: isActive ? "#000000" : "#f0f0f0",
                },
                "& .MuiListItemIcon-root": {
                  color: isActive ? "#ffffff" : "inherit",
                  minWidth: "40px",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: isActive ? 600 : 400,
                }}
              />
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mx: 2, mb: 2, opacity: 0.6 }} />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          p: 3,
          display: "flex",
          alignItems: "center",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            bgcolor: "#7b1fa2",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 1.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#fff", fontWeight: "bold" }}
          >
            U
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", lineHeight: 1.2 }}
          >
            Music Lover
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Premium Member
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      {isMobile && (
        <IconButton
          onClick={onDrawerToggle}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1300,
            bgcolor: "#000000",
            color: "#ffffff",
            "&:hover": {
              bgcolor: "#333333",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Desktop Sidebar - Permanent */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              borderRight: `1px solid #DADADA`,
              backgroundColor: "#fff",
              position: "relative",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile Sidebar - Temporary */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              backgroundColor: "#fff",
              height: "100vh",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
