import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  CardContent,
  useTheme,
  useMediaQuery
} from "@mui/material";
import MyCarousel from '../../components/Carousel';
import { styled } from '@mui/system';


import paper from "../../assets/images/icon-paper.png";
import student from "../../assets/images/icon-student.png";
import { useNavigate } from "react-router-dom";
import Lottie from 'react-lottie';
import animationTeamWork from '@/assets/animations/teamwork.json';
import { PATH } from "@/routes/constants";


const BoldText = styled('span')({
  fontWeight: 'bolder',
  fontFamily: 'Lato',
});

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationTeamWork,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};



const Landing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const navigate = useNavigate();
  const background = "linear-gradient(to top, #8580b0, #7a75ad, #6f6aaa, #6460a7, #5855a4)";

  return (
    <>

      {/* Certificaciones */}
      <Box sx={{ bgcolor: '#ededed', p: 0.5, margin: 0, minHeight: '85vh' }}>
        <Grid container justifyContent="center" alignItems="center" spacing={0} >
          <Grid item xs={10} lg={6} sx={{ marginBottom: '3em !important', marginTop: '3em !important', padding: '1em' }}>
            <Lottie
              options={defaultOptions}
              height={'auto'}
              width={'90%'}
            />
          </Grid>

          <Grid item xs={10} lg={6} sx={{ marginBottom: '3em !important', marginTop: '3em !important', padding: '1em' }}>
            <Typography variant="h5" sx={{ color: '#3A3A3C', marginBottom: '2em !important', fontSize: '2.5em !important', textAlign: isMobile ? 'center' : 'left' }}>
              Portal de Recaudación
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify', marginBottom: '2em !important', fontSize: '1.2em !important', lineHeight: '25px !important' }}>

              En nuestro compromiso de hacer el Municipio Autónomo de Caguas uno más eficiente y ágil, se ha trabajado arduamente en desarrollar nuevos
              servicios en línea que puedan satisfacer las necesidades de nuestros ciudadanos.

            </Typography>

            <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify', marginBottom: '2em !important', fontSize: '1.2em !important', lineHeight: '25px !important' }}>

              Portal de atención a contribuyentes para el registro, radicación de declaración y
              pago del impuesto de patentes

            </Typography>
            {/* <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify', marginBottom: '2em !important', fontSize: '1.2em !important', lineHeight: '25px !important' }}>
              <BoldText>Inicia Sesión</BoldText> para acceder a tu área personalizada y empezar a hacer la diferencia dentro de nuestra comunidad. Tu participación es esencial para construir un entorno mejor y más justo para todos
            </Typography> */}

            <Grid item xs={12} sx={{ padding: '3em', justifyContent: 'center', textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: isMobile ? "100%" : '50%',
                  height: "45px",
                  padding: "8px 15px",
                  borderRadius: "4px",
                  border: "2px solid",
                  marginRight: "16px",
                  letterSpacing: '0.1rem'
                }}
                href={PATH.LOGIN}
              >
                Iniciar Sesión
              </Button>
            </Grid>

          </Grid>

        </Grid>
      </Box >
    </>
  );
};

export default Landing;
