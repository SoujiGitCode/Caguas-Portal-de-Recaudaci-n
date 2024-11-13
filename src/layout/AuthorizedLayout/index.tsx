import { useEffect, useState } from 'react';
import { Grid, Typography, Box, Button, useTheme, useMediaQuery, Stack, Drawer, IconButton } from "@mui/material";
import { Sidebar, Footer } from "@/layout";
import { Outlet } from "react-router-dom";
import AlertPopup from "@/components/AlertPopup";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import MenuIcon from '@mui/icons-material/Menu';

const AuthorizedLayout = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };


  useEffect(() => {
    if (!isMobile) setDrawerOpen(true)
      , []
  })

  return (
    <Grid container sx={{ minHeight: '100vh'  }}>
      <AlertPopup />
      <IconButton
        onClick={toggleDrawer}
        sx={{ display: isMobile ? 'block' : 'none' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'center' }}>
          <MenuIcon />
          <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>MENU</Typography>
        </Box>
      </IconButton>
      <Grid item xs={12} lg={1}>

        {isMobile ?
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={toggleDrawer}
          >
            <Sidebar />
          </Drawer>

          :
          <Sidebar />
        }

      </Grid>

      <Grid item xs={12} lg={11} sx={{ display: 'flex', alignItems: 'start', minHeight: '90vh', justifyContent: 'center' }}>
        <Outlet />
      </Grid>

      <Grid item xs={12}>
        <Footer isMobile={isMobile} />
      </Grid>
      {/* 
      <AccessibilityWidget /> */}
    </Grid >
  );
};

export default AuthorizedLayout;
