import { Grid, Typography, Box, Button, useTheme, useMediaQuery, Stack, Container } from "@mui/material";
import { Header, Footer } from "@/layout";
import { Outlet } from "react-router-dom";
import AlertPopup from "@/components/AlertPopup";
import styles from "./styles.module.scss";
import icon from "../../assets/images/icon.png"
import logo from "@/assets/images/logo-caguas.png"
import { PATH } from "@/routes/constants";
import { AccessibilityWidget } from "@/components";
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const UnautoziredLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'grid', flexDirection: 'column', minHeight: '100dvh', gridTemplateRows: 'auto 1fr auto' }}>
        <AlertPopup />
        {/* Header */}
        <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>

          <Grid container sx={{ padding: 0 }}>
            <Grid item xs={12} sx={{ background: '#DD6039', color: 'white', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'start', paddingY: 2, paddingX: 1 }}>
              <Grid container sx={{ paddingLeft: isMobile ? '0' : '12rem !important' }}>
                <Grid item sx={{ display: 'flex', alignItems: 'center', fontSize: isMobile ? '10px' : '12px', marginRight: '1rem !important' }}>
                  <PhoneIcon sx={{ mr: '0.5rem !important' }} />
                  787.744.8833
                </Grid>
                <Grid item sx={{ display: 'flex', alignItems: 'center', fontSize: isMobile ? '10px' : '12px', marginRight: '1rem !important' }}>
                  <MailIcon sx={{ mr: '0.5rem !important' }} />
                  Contáctenos
                </Grid>
                <Grid item sx={{ display: 'flex', alignItems: 'center', fontSize: isMobile ? '10px' : '12px', marginRight: '1rem !important' }}>
                  <AccountTreeIcon sx={{ mr: '0.5rem !important' }} />
                  Directorio Municipal
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <img src={logo} alt="logo" width={"200px"} />
            </Grid>
          </Grid>

          {/* <Typography variant="h3" component="header" sx={{ padding: 4, backgroundColor: '#DD6039', color: 'white', textAlign: 'center' }}>
            Sistema Caguas Gestión de Inteligencia
          </Typography> */}

        </Box>

        {/* Contenido Principal */}
        <Box component="main" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Outlet />
        </Box>

        {/* Footer */}
        <Box sx={{}}>
          <Footer isMobile={isMobile} />
        </Box>

      </Box>
    </>

  );
};



export default UnautoziredLayout;
