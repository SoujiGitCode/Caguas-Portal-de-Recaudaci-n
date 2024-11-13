import { useEffect, useState } from "react";
import { Grid, Typography, Box, Button, CardContent, Card, TextField } from "@mui/material";
import styles from "./styles.module.scss";
import { PATH } from "@/routes/constants";
import useAlert from "@/hooks/useAlert";
import RequiredDocuments from "./components/RequiredDocuments";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import useAuthStore from "@/hooks/useAuthStore";
import { useNavigate } from "react-router-dom";
import { logOut, userDocuments } from "@/utils/";
import logo from "@/assets/images/logo-caguas.png"
import start from "@/assets/images/start.svg"
import paper from "../../assets/images/icon-paper.png";
import student from "../../assets/images/icon-student.png";
import SearchIcon from '@mui/icons-material/Search';
import { WidthNormal } from "@mui/icons-material";
import { getUserDocuments } from "./functions";
import { IQuerellaData } from "./types";
import CustomTable from "./components/customTable";
import { table } from "console";
import Paper from "@mui/material/Paper";



const Home = () => {
  const { setAlert } = useAlert();
  const logout = useAuthStore((state: any) => state.setLogout);
  const token = useAuthStore((state: any) => state.token);
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<IQuerellaData[]>([]);



  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = async () => {
    try {
      await logOut(token);
      logout();
      navigate('/')
    } catch (error) {
      navigate('/')
      logout();
    }
  };

  setTimeout(() => {
    //LogOut after 60min - 3600000ms
    setAlert("Session expired", "warning")
    handleLogout()
  }, 3600000);



  const CustomTextField = styled(TextField)({
    '& .MuiInputBase-root': {
      width: '194px',
      height: '41px',
      padding: '8px 16px',
      borderRadius: '50px',
      border: '2px solid #CACACA',

    },

    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocuments = await getUserDocuments(token);
        if (Array.isArray(userDocuments)) setTableData(userDocuments);
        console.log('tableData');
        console.log(userDocuments);
      } catch (error) {
        console.error("Error fetching user documents:", error);
      }
    }
    fetchUserData();
  }, []);


  return (

    <>
      <Grid container>
        <Grid
          item
          xs={12}
          className={styles["image-banner"]}
          sx={{
            display: "flex",
            alignItems: "center !important",
            minHeight: '380px'
          }}
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign={'center'}
                height="100%"
                padding={5}
                gap={4}
              >


                <img
                  src={logo}
                  alt="logo"
                  width={"80%"}
                // style={{ width: "100%", height: "auto" }}
                />

                <Typography variant="h1" gutterBottom sx={{ color: '#3A3A3C', fontSize: '2.2em !important' }}>
                  ¡Bienvenido!
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ color: '#3A3A3C', fontSize: '1.2em !important' }}>
                  Sistema Caguas Gestión de Inteligencia
                </Typography>
                {/* <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    minWidth: '500px',
                    height: 48,
                    padding: '8px 40px',
                    borderRadius: '4 px',
                    gap: 2,
                    fontSize: '1em !important'
                  }}
                >
                  Crear Solicitud
                </Button> */}
              </Box>
            </Grid>

          </Grid>
        </Grid>


        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
          }}
        >
          <Grid container justifyContent="center" alignItems="center" sx={{ background: '#ededed' }}>
            <Grid item xs={10} sx={{ marginBottom: "4em !important", marginTop: "2em !important" }}>
              <Typography color="primary" variant="h6" gutterBottom sx={{ fontSize: '2em !important' }}>
                Gestión de Procesos y Declaraciones
              </Typography>
            </Grid>

            {/* Contenido de Certificaciones */}

            <Grid item xs={10}>
              <Grid container
                sx={{
                  width: '100%',
                  paddingTop: '1em !important',
                  paddingBottom: '0.5em !important',
                  boxShadow: '0px 4px 19px 0px #00000017',
                  borderRadius: '8px',
                  marginBottom: "1.5em !important"
                }}
              >
                <Grid item xs={12} lg={6}>
                  <Box>
                    <Grid container>
                      <Grid item xs={12} sx={{ padding: '3em' }}>
                        <Typography variant="body1" gutterBottom sx={{ color: '#000', fontSize: '1.5em !important', textAlign: 'center' }}>
                          Bienvenido al portal de gestión del Municipio Autónomo de Caguas. Utiliza nuestra plataforma para registrar y gestionar
                          tus trámites de manera rápida y segura. Haz clic en el botón 'Crear' para iniciar con el formulario.
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sx={{ padding: '3em', justifyContent: 'center', textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{
                            width: isMobile ? "100%" : '50%',
                            height: "45px",
                            padding: "8px 15px",
                            borderRadius: "4px",
                            border: "2px solid",
                            marginRight: "16px",
                            letterSpacing: '0.1rem'
                          }}
                        // href={PATH.CREATE}
                        >
                          Crear
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>


                </Grid>
                <Grid item xs={12} lg={6} sx={{ textAlign: 'center' }}>
                  <img
                    src={start}
                    alt="start"
                    style={{ width: "80%", height: "auto" }}
                  />
                </Grid>
              </Grid>
            </Grid>


            <Grid item xs={12} lg={10} sx={{ display: 'none', marginBottom: "4em !important", marginTop: "4em !important" }}>
              <Typography color="primary" variant="h6" gutterBottom sx={{ fontSize: '2em !important', textAlign: isMobile ? 'center' : 'left' }}>
                Historial de Querellas
              </Typography>
            </Grid>

            <Grid item xs={10} sx={{ display: 'none', marginBottom: "4em !important", marginTop: "2em !important" }}>
              {tableData.length !== 0 ?
                <CustomTable tableData={tableData} isMobile={isMobile} />
                :
                <Box
                  component={Paper}
                  sx={{
                    padding: "1rem",
                    boxShadow: '0px 4px 13.5px 0px rgba(0, 0, 0, 0.1)',
                    justifyContent: 'center',
                    textAling: 'center',
                    display: 'flex'
                  }}>
                  <Typography variant="body1" gutterBottom sx={{ textAling: 'center' }}>
                    No ha realizado ninguna solicitud.
                  </Typography>
                </Box>
              }

            </Grid>

          </Grid>

        </Grid>



      </Grid >


    </>

  );
};

export default Home;
