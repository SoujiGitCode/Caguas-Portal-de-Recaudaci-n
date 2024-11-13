import { Grid, Box, Typography, TextField, Button, useTheme, useMediaQuery, IconButton, InputAdornment } from "@mui/material";
import styles from "./styles.module.scss";

import { Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useLocation, useParams } from "react-router-dom";


import CustomLabel from "@/components/CustomLabel";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiRequest from "@/utils/services/apiService";
import { useEffect, useState } from "react";
import useAlert from "@/hooks/useAlert";
import ConfirmationModal from "@/components/ConfirmationModal";


const RecoveryToken = () => {

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const [modalType, setModalType] = useState<'error' | 'success'>('error');

  // 1. Rearrange useState Hooks:
  const { t } = useParams();
  const cleanT = cleanToken(t);
  console.log(cleanT);
  const [token, setToken] = useState(cleanT ?? '');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { setAlert } = useAlert();
  const navigate = useNavigate();


  // Helper function
  function cleanToken(token: string) {
    return token.startsWith("t=") ? token.slice(2) : token;
  }

  // 2. Rearrange useEffects:
  useEffect(() => {
    if (token) {
      checkToken();
    }
  }, [token]);


  const goBack = () => {
    navigate('/');
  }

  const checkToken = async () => {
    console.log('checkToken:', token)
    try {
      const api = new ApiRequest();
      api.resource = "/user";
      api.token = token;

      const response = await api.get({
      });

      console.log(response)

    } catch (error) {
      setToken('');
      console.log(error);
      throw error;
    }
  };

  const onSave = async () => {
    try {
      const recoveryRequest = {
        password: password,
      };

      const api = new ApiRequest();
      api.resource = "/user/changepwd";
      api.token = token;

      const response = await api.post({
        body: recoveryRequest,
      });
      console.log(response)

      if (response.code === 200) {
        setAlert('Contraseña actualizada!', "success");
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
      // espera de 3 segundos antes de redireccionar al suuario al landing
      setToken('');
      console.log(error);
      throw error;
    }
  };


  const isPasswordValid = () => {
    if (password !== '' && password === confirmPassword && passwordError === '') return true;
    return false;
  }

  function isPasswordValidFunction() {
    // Regular expression to match password requirements
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*();])[a-zA-Z\d!@#$%^&*();]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula y un símbolo.');
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas deben coincidir.');
      return false;
    }

    // If both checks pass, reset any previous error message and return true
    setPasswordError('');
    return true;
  }

  useEffect(() => {
    isPasswordValidFunction();
  }, [password, confirmPassword]);

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} lg={6} sx={{ display: 'none' }}>
          <Box className={styles["recovery-container"]}>
            <Box className={styles["background-image"]}></Box>
          </Box>
        </Grid>

        {/* Password Creation Section */}
        <Grid item xs={12} md={4} sx={{ py: 1 }}>


          {token !== '' ? (
            <Box
              sx={{ display: "flex", gap: "1rem" }}
            >
              <Grid container gap={2} padding={2}>
                <Grid item xs={12}>
                  <Typography variant="body1" color="#807BB8" sx={{ fontSize: '2rem', fontWeight: 'bolder' }} >Nueva Contraseña</Typography>
                </Grid>
                {/* -------------------------------------------------Password -----------------------------------------*/}
                <Grid item xs={12}>
                  <CustomLabel name="Contraseña Nueva" required={true} />
                  <TextField
                    placeholder="Contraseña Nueva"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* --------------------------------------------Repeat Password -------------------------------------------------------- */}
                <Grid item xs={12} sx={{ paddingY: '2rem !important' }}>
                  <CustomLabel name="Confirmar Contraseña" required={true} />
                  <TextField
                    placeholder="Confirmar Contraseña"
                    name="confirmPasword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  {passwordError && (
                    <Typography color="error" sx={{ fontSize: '12px' }}>
                      {passwordError}
                    </Typography>
                  )}
                </Grid>

                <Box sx={{
                  width: '100%', marginBottom: "3rem !important"
                }}>
                  < Grid container justifyContent="start" sx={{ py: 4 }}>
                    <Grid item xs={12} lg={6} textAlign={'center'} sx={{ marginBottom: '1.5rem !important' }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          width: '241.5px',
                          height: 'auto',
                          padding: '12px 40px',
                          borderRadius: '4px',
                          border: '2px solid',
                          fontSize: '0.7rem'
                        }}
                        onClick={() => goBack()}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid item xs={12} lg={6} textAlign={'center'} sx={{ marginBottom: '1.5rem !important' }}>
                      <Button
                        disabled={!isPasswordValid()}
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          width: '241.5px',
                          height: 'auto',
                          padding: '12px 40px',
                          borderRadius: '4px',
                          border: '2px #697FAA solid',
                          fontSize: '0.7rem'
                        }}
                        onClick={() => onSave()}
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

              </Grid>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: "1rem" }}
              className={styles["container-recovey"]}>
              <Typography variant="h6" gutterBottom>
                Token Expired
              </Typography>
            </Box>
          )}

        </Grid >

      </Grid >
    </>
  );
};

export default RecoveryToken;