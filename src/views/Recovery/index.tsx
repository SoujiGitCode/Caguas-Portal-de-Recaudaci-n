import { Grid, Box, Typography, TextField, Button, useTheme, useMediaQuery } from "@mui/material";
import styles from "./styles.module.scss";

import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from "@mui/material";


import CustomLabel from "@/components/CustomLabel";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiRequest from "@/utils/services/apiService";
import { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";

const Recovery = () => {
  // Estados para manejar el modal
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const [modalType, setModalType] = useState<'error' | 'success'>('error');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const customContent = {
    success: {
      title: "Solicitud enviada",
      text: (
        <>
          Hemos recibido su solicitud de Cambio de Contraseña. Enviaremos un enlace a su correo electrónico para cambiar su contraseña.
        </>
      )
    },
    error: {
      title: "Error",
      text: (
        <>
          Ha ocurrido un error al enviar su solicitud, por favor, revise sus datos y vuelva a intentarlo.
          <br />
          Verifique que el correo sea el correcto asociado a su cuenta y/o contacte al Departamento de Educación.
        </>
      )
    }
  };


  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .required("Correo electrónico es requerido")
        .max(100, "máximo 100 caracteres"),
    }),

    onSubmit: async (values) => {
      const recoveryRequest = {
        email: values.email,
      };

      const api = new ApiRequest();
      api.resource = "/user/recoverypwd";
      try {
        const response = await api.post({
          body: recoveryRequest,
        });

        // Verificamos el código de respuesta
        if (response.code === 200) {
          // Abrimos el modal
          setOpenModal(true);
          setModalType('success');
          // espera de 3 segundos antes de redireccionar al suuario al landing
          setTimeout(() => {
            navigate('/login');
          }, 3000);

        }


      } catch (error) {
        setOpenModal(true);
        setModalType('error');
        console.error(error);
      }
    },

  });

  // Button Cancel
  const handleCancelClick = () => {
    navigate("/");
  };


  return (
    <>
      <Grid container sx={{ justifyContent: 'center' }}>
        {/* <Grid item xs={12} lg={6}>
          <Box className={styles["recovery-container"]}>
            <Box className={styles["background-image"]}></Box>
          </Box>
        </Grid> */}

        <Grid item xs={12} lg={4}>

          <Grid container gap={0} padding={0}>
            <Grid item xs={12} >
              <Typography variant="body1" color="#3A3A3C" sx={{ fontSize: '2rem', fontWeight: 'bolder' }} >Solicitud de cambio de contraseña</Typography>

              <Typography className={styles["descriptions-recovery"]}>
                Enviaremos un enlace a su correo electrónico donde podrá restablecer su contraseña
              </Typography>
            </Grid>

            <Grid item xs={12} sx={{ marginY: '2rem !important' }}>


              <form onSubmit={formik.handleSubmit}>
                <Grid container>
                  <CustomLabel name="Correo electrónico" required={true} />

                  <Grid item xs={12} sx={{ marginBottom: '3rem !important' }}>

                    <TextField
                      id="email"
                      placeholder="example@example.com"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>


                  <Grid item xs={12} lg={6} textAlign={'center'} sx={{ marginBottom: '1.5rem !important' }}>
                    <Button
                      variant="outlined"
                      sx={{
                        width: '241.5px',
                        height: 'auto',
                        padding: '12px 40px',
                        borderRadius: '4px',
                        border: '2px solid',
                        fontSize: '0.7rem'
                      }}
                      onClick={() => handleCancelClick()}
                    >
                      Regresar
                    </Button>
                  </Grid>

                  <Grid item xs={12} lg={5} textAlign={'center'} sx={{ marginBottom: '1.5rem !important' }}>
                    <Button type="submit"
                      variant="contained"
                      sx={{
                        width: '241.5px',
                        height: 'auto',
                        padding: '12px 40px',
                        borderRadius: '4px',
                        border: '2px #697FAA solid',
                        fontSize: '0.7rem'
                      }}
                    >
                      Recuperar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>

          </Grid>

        </Grid>


        <ConfirmationModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          content={customContent}
          type={modalType}
        />
      </Grid >
    </>
  );
};

export default Recovery;