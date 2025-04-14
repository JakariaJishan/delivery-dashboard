import React from "react";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 260;

const Sidebar: React.FC = () => {
  const route = useLocation();

  const isActive = (path: string) => {
    return route.pathname === path;
  };
  
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "primary.main",
          color: "white",
        },
      }}
    >
      <Box sx={{ p: 2, height: 64, display: "flex", alignItems: "center" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          Logo
        </Typography>
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected
            component={Link}
            to="/"
            sx={{
              "&.Mui-selected": {
                bgcolor: isActive("/") ? "rgba(255, 255, 255, 0.2)" : undefined,
                borderRadius: "4px",
                mx: 1,
                width: "auto",
                "&&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                },
              },
            }}
          >
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/deliveries"
            sx={{
              mx: 1,
              bgcolor: isActive("/deliveries")
                ? "rgba(255, 255, 255, 0.2)"
                : undefined,
              "&&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
              },
            }}
          >
            <ListItemText primary="Deliveries" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
export default Sidebar;
