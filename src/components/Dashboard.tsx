import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CssBaseline,
  Container,
  CircularProgress,
  useMediaQuery,
  IconButton,
  Drawer,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import CancelIcon from "@mui/icons-material/Cancel";
import { useGetDeliveriesQuery } from "../store/deliveryapi.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4d4dff",
    },
  },
});

const Dashboard: React.FC = () => {
  const { data, error, isLoading } = useGetDeliveriesQuery();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile screens
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile drawer

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const deliveryStats = [
    {
      label: "Pending",
      count:
        data?.filter((delivery) => delivery.status === "Pending").length || 0,
      bgColor: "#ede7f6",
      textColor: "#673ab7",
      icon: AutorenewIcon,
    },
    {
      label: "In Transit",
      count:
        data?.filter((delivery) => delivery.status === "In Transit").length ||
        0,
      bgColor: "#e0f7fa",
      textColor: "#00bcd4",
      icon: DirectionsTransitIcon,
    },
    {
      label: "Delivered",
      count:
        data?.filter((delivery) => delivery.status === "Delivered").length || 0,
      bgColor: "#e0f2f1",
      textColor: "#009688",
      icon: LocalShippingIcon,
    },
    {
      label: "Not Delivered",
      count:
        data?.filter((delivery) => delivery.status === "Not Delivered")
          .length || 0,
      bgColor: "#fbe9e7",
      textColor: "#ff5722",
      icon: CancelIcon,
    },
  ];

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error)
    return <Typography color="error">Error fetching deliveries.</Typography>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", gap: "16rem", height: "100vh" }}>
        {/* Responsive Sidebar */}
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ position: "absolute", top: 16, left: 16 }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile
              }}
              sx={{
                "& .MuiDrawer-paper": {
                  width: 240,
                },
              }}
            >
              <Sidebar />
            </Drawer>
          </>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                width: 240,
                boxSizing: "border-box",
              },
            }}
            open
          >
            <Sidebar />
          </Drawer>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3,
            pt: 8,
            bgcolor: "#f5f5f5",
            height: "100%",
            width: "100%",
          }}
        >
          <Container maxWidth={false}>
            <Paper
              elevation={0}
              sx={{
                p:2,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                Dashboard
              </Typography>

              <Box sx={{ py: 2, mb: 2 }}>
                <Grid container spacing={2}>
                  {deliveryStats.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2,
                          border: "1px solid #e0e0e0",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          backgroundColor: stat.bgColor,
                          color: stat.textColor,
                        }}
                      >
                        {stat.icon && (
                          <stat.icon
                            sx={{
                              fontSize: 60,
                              color: stat.textColor,
                              mb: 1,
                            }}
                          />
                        )}
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          {stat.count}
                        </Typography>
                        <Typography variant="body1">{stat.label}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;