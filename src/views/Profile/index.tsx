import { Button, Divider, Grid, Typography, Box, Modal, TextField, InputAdornment, IconButton, useTheme, useMediaQuery } from "@mui/material";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "./validations";
import styles from "./profile.module.scss";
import TitleSection from "./components/TitleSection";
import UserProfileInfo from "./components/UserProfileIInfo";
import UserEditProfile from "./components/UserEditProfile";
import UserAdditionalInfo from "./components/UserAdditionalnfo";
import UserEditAdditionalInfo from "./components/UserEditAdditionalInfo";
import Api from "@/utils/services/api";
import useAuthStore from "@/hooks/useAuthStore";
import profileImage from "@/assets/images/profile-image.png"
import ApiRequest from "@/utils/services/apiService";
import useAlert from "@/hooks/useAlert";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PurpleHeader from "@/components/PurpleHeader";

const listId = [
  { value: "licencia", label: "Lic" },
  { value: "id", label: "Real Id" },
];

const listGenre = [
  { value: "F", label: "Femenino" },
  { value: "M", label: "Masculino" },
  { value: "N", label: "No Indica" },
];

export interface UserDetails {
  email: string;
  identification: string;
  depr_first_name: string;
  depr_second_name: string;
  depr_last_name: string;
  depr_second_last_name: string;
  depr_birthdate: string;
  depr_gender: string;
  depr_phone: string;
  social_security: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: UserDetails;
}

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState<UserDetails>();
  const token = useAuthStore((state: any) => state.token);
  const [formValid, setFormValid] = useState(false);
  const [formValues, setFormValues] = useState({
    identification: "",
    email: "",
    depr_first_name: "",
    depr_second_name: "",
    depr_last_name: "",
    depr_second_last_name: "",
    depr_birthdate: "",
    depr_gender: "",
    depr_phone: "",
    social_security: ""
  });

  const getDetails = async () => {
    Api.token = token;
    Api.resource = "/user/";
    try {
      const resp = await Api.get<ApiResponse>();
      const cast: UserDetails = resp.data;
      console.log(cast)
      setUserInfo(cast);
      formik.setValues(cast);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetails();
  }, [token]);

  const editMode = () => {
    setIsEditMode(!isEditMode);
  };

  const UpdateChangesProfile = async (values: UserDetails) => {
    Api.token = token;
    Api.resource = "/user/modify";
    try {
      const res = await Api.post({
        body: {
          ...values,
          social_security: values.social_security,
          depr_social_security: values.social_security,
          phone: values.depr_phone,
          gender: values.depr_gender,
          birthdate: values.depr_birthdate,
          first_name: values.depr_first_name,
          second_name: values.depr_second_name,
          last_name: values.depr_last_name,
          second_last_name: values.depr_second_last_name,
        },
      })

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };


  const formik = useFormik({
    initialValues: {
      identification: "",
      email: "",
      depr_first_name: "",
      depr_second_name: "",
      depr_last_name: "",
      depr_second_last_name: "",
      depr_birthdate: "",
      depr_gender: "",
      depr_phone: "",
      social_security: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {

      await UpdateChangesProfile(values)
      getDetails();
    },

    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true
  });

  useEffect(() => {
    getDetails();
    // console.log('consulting info')
  }, [isEditMode]);



  useEffect(() => {
    if (!formik.isValid) {
      console.log(formik.errors);
      setFormValid(false)
      return
    }
    if (formik.isValid) {
      setFormValid(true)
    }
    console.log('isStepValid ' + formValid)
  }, [formik.values, formik.touched, formik.isValid]);

  //Cambiar password  necesitamos mejorarlo luego

  const { setAlert } = useAlert();

  const [openModal, setOpenModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleOpenModal = () => {
    setPasswordError('');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setPasswordError('');
    setOpenModal(false);
  };


  const onSave = async () => {
    try {
      const recoveryRequest = {
        current_password: currentPassword,
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
      }

      handleCloseModal();

    } catch (error) {
      handleCloseModal();
      setAlert('Error, contraseña actual no es correcta', "error");
      console.log(error);
      throw error;
    }
  };

  const isPasswordValid = () => {
    if (password !== '' && currentPassword !== '' && password === confirmPassword && passwordError === '') return true;
    return false;
  }

  function isPasswordValidFunction() {
    // Regular expression to match password requirements
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*();])[a-zA-Z\d!@#$%^&*();]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula y un símbolo');
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordError('La contraseñas deben coincidir ');
      return false;
    }

    // If both checks pass, reset any previous error message and return true
    setPasswordError('');
    return true;
  }


  useEffect(() => {
    isPasswordValidFunction()
  }, [password, confirmPassword, currentPassword]);

  return (
    <>
      <Grid container sx={{ width: '100%', margin: 0 }}>

        <PurpleHeader />
        <Grid item xs={12} lg={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingLeft: isMobile ? '1rem ' : '5rem', paddingRight: isMobile ? '1rem' : '5rem' }} >
          {/* title*/}
          <TitleSection />

          {/*Aqui van los inputs */}
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              minHeight: "auto",
              paddingLeft: '0%',
              paddingTop: "1.5rem",
              justifyContent: 'center',
              marginBottom: '2rem !important'
            }}
          >
            <Box sx={{ width: '100%', }}>
              <Grid container>
                <Grid item xs={12} lg={6} sx={{ justifyContent: isMobile ? 'center' : 'start', display: 'flex', alignItems: 'center', }}>
                  <img src={profileImage} alt="user-photo" className={styles["img-profile-style"]} />
                </Grid>
                <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'start', alignItems: 'center  !important', verticalAlign: 'center !important' }}>
                  <Button variant="contained" color="primary"
                    style={{
                      width: '241.5px',
                      height: '38px',
                      padding: '8px 40px',
                      borderRadius: '4px',
                      marginRight: '16px',
                      fontSize: '0.7em',
                      marginBottom: '3rem !important'
                    }}
                    type="button"
                    onClick={handleOpenModal}
                  >
                    Cambiar Contraseña <LockPersonIcon sx={{ fontSize: '14px' }} />
                  </Button>
                </Grid>
              </Grid>


              <Grid item xs={12} >
                {!isEditMode && userInfo ? (
                  <UserProfileInfo formik={formik} isMobile={isMobile} />
                ) : (
                  <>{userInfo && <UserEditProfile formik={formik} isMobile={isMobile} />}</>
                )}
              </Grid>

            </Box>
          </Box>

        </Grid>

        {/*Second section */}
        <Grid item sx={{ display: isMobile ? 'none' : 'flex', justifyContent: "center", }} sm={5}>
          <div style={{ alignItems: "center", display: "flex" }}>
            <Divider
              orientation="vertical"
              sx={{
                height: "80%",
                borderWidth: "1px",
                borderColor: "#a09c9c92",
              }}
            />
          </div>

          {/*Aqui van los inputs */}
          <Box
            sx={{
              flexDirection: "row",
              width: "100%",
              paddingTop: "8rem",
              paddingLeft: "6%",
            }}
          >
            <>
              {!isEditMode && userInfo ? (
                <UserAdditionalInfo formik={formik} isMobile={isMobile} />
              ) : (
                <>
                  {userInfo && (
                    <UserEditAdditionalInfo
                      formik={formik}
                      listGenre={listGenre}
                      listId={listId}
                      isEditMode={isEditMode}
                    />
                  )}
                </>
              )}
            </>
          </Box>
        </Grid>

        {/*Botones */}
        <Box
          sx={{
            // background: 'red',
            flexDirection: "row",
            display: "flex",
            width: "100%",
            paddingLeft: isMobile ? '1rem ' : '5rem',
            justifyContent: "start",
            marginBottom: "2rem !important",
          }}
        >
          <Button
            disabled={!isEditMode}
            variant="contained"
            type="submit"
            className={styles["buttons-save"]}
            sx={{ marginRight: "5% !important" }}
            onClick={() => {
              if (isEditMode) {
                // Valida los campos antes de guardar
                if (formik.isValid) {
                  // Si está en modo edición y los campos son válidos, guarda los valores
                  setFormValues({
                    identification: formik.values.identification || '',
                    email: formik.values.email || '',
                    depr_first_name: formik.values.depr_first_name || '',
                    depr_second_name: formik.values.depr_second_name || '',
                    depr_last_name: formik.values.depr_last_name || '',
                    depr_second_last_name: formik.values.depr_second_last_name || '',
                    depr_birthdate: formik.values.depr_birthdate || '',
                    depr_gender: formik.values.depr_gender || '',
                    depr_phone: formik.values.depr_phone || '',
                    social_security: formik.values.social_security || '',
                  });

                  // Llama a la función onSubmit de formik para manejar la lógica del envío del formulario
                  formik.handleSubmit();
                  setIsEditMode(false);
                } else {
                  // Si los campos no son válidos, puedes mostrar un mensaje de error o tomar otras medidas
                  console.log("Los campos contienen errores");
                }
              } else {
                // No estás en modo edición
                setIsEditMode(false);
              }
            }}
          >
            Guardar
          </Button>

          <Button
            variant="outlined"
            type="submit"
            onClick={editMode}
            className={styles["buttons-save"]}
          >
            {isEditMode ? "Cancelar" : "Editar"}
          </Button>
        </Box>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="change-password-modal"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box
            sx={{
              bgcolor: 'white !important',
              boxShadow: 24,
              p: 4,
              width: 400
            }}

          >
            <Grid container>
              <Grid item xs={12} className="mb-1  flex-center">
                <Typography color="" sx={{ fontSize: '18px' }}>
                  Cambiar Contraseña
                </Typography>
              </Grid>
              {/* Grid para los inputs */}
              <Grid item xs={12}>
                <div className="mb-1">
                  <TextField
                    size="small"
                    placeholder="Contraseña actual"
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    fullWidth
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
                    onChange={(e: any) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 2 }}>
                <div className="mb-1">
                  <TextField
                    size="small"
                    placeholder="Contraseña nueva"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    fullWidth
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
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 1 }}>
                <div className="mb-1">
                  <TextField
                    size="small"
                    placeholder="Confirmar Contraseña nueva"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    fullWidth
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
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                  />
                </div>

              </Grid>

              <Grid item xs={12} className="mb-1 mt-1">
                {passwordError && (
                  <Typography color="error" sx={{ fontSize: '12px' }}>
                    {passwordError}
                  </Typography>
                )}
              </Grid>

              {/* Grid para los botones */}
              <Grid container item justifyContent="center">
                <Grid item xs={5} className="mr-1">
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    className={styles.submitButton}
                    disabled={!isPasswordValid()}
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={onSave}
                  >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Grid >
    </>
  );
};

export default Profile;
