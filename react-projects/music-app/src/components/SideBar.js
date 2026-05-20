import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Typography,
  Box,
} from "@mui/material";
import { Home, Favorite } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import Divider from "@mui/material/Divider";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Favourites", icon: <Favorite />, path: "/favorites" },
    
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          borderRight: `1px solid #DADADA`,
          backgroundColor: '#fff',
        },
      }}
    >
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
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                borderRadius: "8px",
                backgroundColor: isActive
                  ? '#000000'
                  : "transparent",
                color: isActive ? '#ffffff' : "inherit",
                "&:hover": {
                  backgroundColor: isActive
                    ? '#000000'
                    : '#f0f0f0',
                },
                "& .MuiListItemIcon-root": {
                  color: isActive ? '#ffffff' : "inherit",
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
          boxSizing: 'border-box'
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
    </Drawer>
  );
};

export default Sidebar;
