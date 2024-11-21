import { useEffect, useState } from 'react';
import { Grid, Typography, Box, IconButton, Drawer, useTheme, useMediaQuery } from "@mui/material";
import { Sidebar, Footer } from "@/layout";
import { Outlet } from "react-router-dom";
import AlertPopup from "@/components/AlertPopup";
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import logo from "@/assets/images/logo-caguas.png";

const AuthorizedLayout = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (!isMobile) setDrawerOpen(true);
  }, [isMobile]);

  return (
    <Grid container direction="column" sx={{ minHeight: '100vh' }}>

      {/* Alert Popup */}
      <AlertPopup />

      {/* Menu IconButton for Mobile */}
      <IconButton
        onClick={toggleDrawer}
        sx={{ display: isMobile ? 'block' : 'none' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <MenuIcon />
          <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>MENU</Typography>
        </Box>
      </IconButton>

      {/* Sidebar and Main Content */}
      <Grid container sx={{ flex: 1 }}>
        {/* Sidebar */}
        <Grid item xs={12} lg={1}>
          {isMobile ? (
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
              <Sidebar />
            </Drawer>
          ) : (
            <Sidebar />
          )}
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} lg={11} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {/* Header Section with Fixed Height */}
          <Grid item sx={{ background: '#fff', color: 'white', paddingY: 0 }}>

            <Grid container sx={{ justifyContent: 'center', alignItems: 'start' }}>
              {/* Logo */}
              <Grid item xs={12} sx={{ textAlign: 'center', background: 'white' }}>
                <img src={logo} alt="logo" style={{ height: '50px' }} />
              </Grid>
            </Grid>
          </Grid>

          {/* Outlet Content with Flex Grow */}
          <Grid item sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: theme.palette.background.paper }}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>

      {/* Footer */}
      <Grid item xs={12}>
        <Footer isMobile={isMobile} />
      </Grid>

    </Grid>
  );
};

export default AuthorizedLayout;
