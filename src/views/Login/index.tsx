import { useState, useEffect } from "react";

import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery,
  List, ListItem, ListItemIcon, ListItemText,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import loginImage from "@/assets/images/caguas-1.jpg";
import { CustomLabel } from "@/components";
import { PATH } from "@/routes/constants";
import useAuthStore from "@/hooks/useAuthStore";
import useAlert from "@/hooks/useAlert";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const setLogin = useAuthStore((state: any) => state.setLogin);
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const authenticateUser = async () => {
    try {
      await setLogin(email, password);
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      setAlert("Error, Credenciales de accesso invalidas", "error");
    }
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.trim() !== "";

    setIsFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  return (
    <Grid container style={{ width: "100%", margin: 0, justifyContent: 'center', flexGrow: 1, flexDirection: 'row', background: ' #ededed ' }}>
      <Grid
        item
        xs={12}
        lg={4}
        sx={{
          overflow: "hidden",
          justifyContent: 'center',
          display: isMobile ? 'none' : 'flex',
          paddingY: '3rem !important',
          alignContent: 'center',
          backgroundImage: `url(${loginImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Capa de color superpuesto */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(221, 96, 57, 0.9)', // Naranja con transparencia
            zIndex: 1,
          }}
        />

        {/* Contenido opcional dentro del Grid */}
        <Box sx={{ zIndex: 2, display: 'grid', height: '100% dvh', gridTemplateRows: 'auto 1fr auto', width: '100%', padding: 2 }}>
          {/* Primer Grid: Título */}
          <Grid container justifyContent="center" sx={{ marginBottom: '1rem !important', marginTop: '5rem !important' }}>
            <Typography variant="h2" gutterBottom sx={{ color: '#fff' }}>
              Algunos Servicios
            </Typography>
          </Grid>

          {/* Segundo Grid: Lista */}
          <Grid container justifyContent="center" sx={{ marginBottom: '1rem' }}>
            <List>
              {[
                'Solicitud de Patentes',
                'Somete Documentos relacionados a su Solicitud',
                'Realizar pagos',
                'Solicitud de Patentes',
                'Ver historial de solicitudes y pagos realizados',
              ].map((text, index) => (
                <ListItem key={index} sx={{ paddingLeft: 0 }}>
                  <ListItemIcon sx={{ color: 'white' }}>
                    <CheckCircleIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ color: '#fff' }} primary={text} />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Tercer Grid: Información de contacto */}
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="caption" display="block" sx={{ color: '#fff' }}>
                Municipio de Caguas<br />
                P.O. BOX 907<br />
                Caguas, Puerto Rico 00726
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" display="block" sx={{ color: '#fff' }}>
                Teléfono: (787) 653-8833 (ext. 1361, 1362)<br />
                Director: (787) 302-2073
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid
        item
        xs={12} lg={8}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2em",
        }}
      >
        <form style={{ width: isMobile ? '100%' : '50%' }}>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              color: "#3A3A3C",
              fontSize: "2.2em !important",
              fontWeight: "bolder",
              marginBottom: "1em !important",
              textAlign: 'center'
            }}
          >
            Portal de Recaudación
          </Typography>
          <FormControl
            fullWidth
            margin="normal"
            required
            sx={{ marginBottom: "1.5em !important" }}
          >
            <CustomLabel name="Correo Electrónico" required={true} />
            <TextField
              id="email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl
            fullWidth
            margin="normal"
            required
            sx={{ marginBottom: "1.5em !important" }}
          >
            <CustomLabel name="Contraseña" required={true} />
            <TextField
              id="password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormHelperText
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: "3em !important",
              marginTop: "1.5em !important",
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Grid container>
                <Grid item xs={12} lg={5} xl={4}
                  sx={{
                    display: 'flex',
                    justifyContent: isMobile ? 'center' : 'start',
                    alignItems: 'center',
                  }}>
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label={
                      <Typography
                        sx={{
                          fontSize: "16px !important",
                          color: "#3A3A3C",

                        }}>
                        Recordarme
                      </Typography>
                    }
                    sx={{ marginLeft: '1rem' }}
                  />
                </Grid>
                <Grid item xs={12} lg={5} xl={6} sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'start', alignItems: 'center' }}>
                  <Typography
                    variant="caption"
                    component="a"
                    href="#"
                    color="primary"
                    sx={{ fontSize: "16px !important" }}
                    onClick={() => navigate('/recovery')}
                  >
                    Olvidé mi contraseña
                  </Typography>
                </Grid>
              </Grid>



            </Box>

          </FormHelperText>




        </form>
        <Box
          mt={2}
          sx={{
            gap: 2,
            width: "100%",
            display: "flex",
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: "center",
          }}
        >
          <Grid container sx={{ display: 'flex', justifyContent: "center" }}>
            <Grid item xs={12} lg={12} sx={{ marginY: '1em !important', textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                disabled={!isFormValid}
                style={{
                  width: "50%",
                  height: "45px",
                  padding: "8px 30px",
                  borderRadius: "32px",
                  marginRight: "16px",
                }}
                onClick={() => authenticateUser()}
              >
                Entrar
              </Button>
            </Grid>

            <Grid item xs={12} lg={12} sx={{ textAlign: "center" }}>
              <Typography variant="body1" sx={{ color: "#3A3A3C" }}>
                ¿Aún no tienes una cuenta?{" "}
                <Typography
                  component="a"
                  href={PATH.REGISTER}
                  sx={{ color: 'primary.main', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Regístrate aquí
                </Typography>
              </Typography>
            </Grid>


          </Grid>


        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
