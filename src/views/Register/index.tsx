import { useState, useEffect } from 'react';

import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import registerImage from '../../assets/register.png';
import Radio from '@mui/material/Radio';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";
import CustomLabel from "@/components/CustomLabel";
import { requestRegister, getSecurityQuestionsList, requestConfirmEmail } from "./functions";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Register.module.scss";
import useAlert from "@/hooks/useAlert";
import useAuthStore from "@/hooks/useAuthStore";
import { ConfirmationModal, SocialSecurityInput, SocialSecurityNumberInput, TermsandConditionsCheckBox } from '@/components';
import { registerValidation } from '@/validations/registerValidation';
import register from "@/assets/images/caguas-1.jpg"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UserRegistrationForm from './userRegistrationForm';
import OtpForm from './otpForm';


const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const { setAlert } = useAlert();
  const setLogin = useAuthStore((state: any) => state.setLogin);

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<'error' | 'success'>('error');
  const [checkStatus, setCheckStatus] = useState(false);

  const [validate, setValidate] = useState(false);

  const idList = [
    {
      value: '0',
      label: 'Licencia / Real ID',
    },
  ];

  const genderList = [
    { value: 'notAValidGender', label: 'Seleccione Género' },
    { value: 'F', label: 'Femenino' },
    { value: 'M', label: 'Masculino' },
    { value: 'N', label: 'No Indica' }
  ];



  const [isFormValid, setIsFormValid] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showSocialSecurity, setShowSocialSecurity] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>('No');
  const [loading, setLoading] = useState(false);
  const [socialSecurityArray, setSocialSecurityArray] = useState(new Array(9).fill(""));
  const [step1, setStep1] = useState(true);

  const formik = useFormik({
    validateOnMount: true,

    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      secondLastName: "",
      phone: "",
      social_security: '',
      num_reg_merchant: '',
      num_reg_municipal: '',
      email: "",
      password: "",
      repeatPassword: "",
      security_question1: "",
      security_question2: "",
      security_question3: "",
      security_answer1: "",
      security_answer2: "",
      security_answer3: "",
    },
    validationSchema: registerValidation,
    onSubmit: async () => {
      await sendUserForRegister();
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const navigate = useNavigate();


  const OnChangeSelectedValue = (value: string) => {
    setSelectedValue(value);
  };

  const modalTriger = (type: 'error' | 'success') => {
    setOpenModal(true);
    setModalType(type)
  }

  const handleOtpSubmit = async (otp) => {
    try {
      // Valida que el OTP tenga 6 números
      if (otp.length !== 6 || !/^\d+$/.test(otp)) {
        console.error('El OTP debe tener 6 números');
        return;
      }

      // Realiza la llamada al endpoint
      const response = await requestConfirmEmail({
        email: formik.values.email, // Usa el email del formulario (u otra fuente)
        confirm_email_code: otp,
      });

      // Maneja la respuesta del endpoint
      if (response?.code === 200) {
        console.log('OTP validado con éxito:', response.message);
        setLogin(formik.values.email, formik.values.password);
        // Agrega una espera de 3 segundos antes de logear al usuario
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
        // Aquí puedes agregar la lógica para pasar al siguiente paso o mostrar un mensaje de éxito
      } else {
        console.error('Error al validar OTP:', response?.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud de confirmación de email:', error);
    }
  };


  // Send data user
  const sendUserForRegister = async () => {
    try {
      setLoading(true);
      await requestRegister({
        email: formik.values.email,
        password: formik.values.password,
        first_name: formik.values.firstName,
        middle_name: formik.values.middleName,
        last_name: formik.values.lastName,
        second_last_name: formik.values.secondLastName,
        phone: formik.values.phone,
        // social_security: formik.values.social_security,
        social_security: socialSecurityArray.join(""),
        security_question1: formik.values.security_question1,
        security_answer1: formik.values.security_answer1,
        security_answer2: formik.values.security_answer2,
        security_question2: formik.values.security_question2,
        security_question3: formik.values.security_question3,
        security_answer3: formik.values.security_answer3,
        num_reg_merchant: formik.values.num_reg_merchant,
        num_reg_municipal: formik.values.num_reg_municipal

      });
      setAlert("Registro Completado", "success");

      modalTriger('success');
      setLoading(false);
      setStep1(false)
    } catch (error) {
      setLoading(false);
      setAlert("El Registro no pudo ser completado, intente nuevamente", "error");
      modalTriger('error');

    }
  };

  useEffect(() => {
    console.log('Formik Errors:', formik.errors);
    console.log('Formik isValid:', formik.isValid);

    if (formik.isValid) {
      console.log('Formulario válido');
    } else {
      console.log('Formulario inválido');
    }
  }, [formik.errors, formik.isValid]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getSecurityQuestionsList();
        if (res?.code === 200 && res?.data) {
          setQuestionsList(res.data);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);
  return (
    <Grid container style={{ width: '100%', margin: 0, justifyContent: 'center', background: theme.palette.background.paper }}>

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
          backgroundImage: `url(${register})`,
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


      <Grid item xs={12} lg={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start', padding: '2em' }}>


        {!loading ?

          <>
            {step1 ?
              <UserRegistrationForm
                formik={formik}
                questionsList={questionsList}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                checkStatus={checkStatus}
                setCheckStatus={setCheckStatus}
                socialSecurityArray={socialSecurityArray}
                setSocialSecurityArray={setSocialSecurityArray}
                isMobile={isMobile}
              />
              :
              <OtpForm handleOtpSubmit={handleOtpSubmit} />

            }


          </>





          :

          <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={0}>
              <Grid item xs={11} sx={{ marginTop: "2.5em !important", marginBottom: "2.5em !important", textAlign: 'center' }}>
                <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5em !important', fontWeight: 'bolder', marginBottom: "1em !important", marginTop: "2em !important" }}>
                  Cargando
                </Typography>
                <br /><br />
                <CircularProgress />
              </Grid>

              <Grid item xs={11} sx={{ marginBottom: "2.5em !important" }}>

                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="body1" color="textPrimary">
                      Validando sus datos, por favor espere. No cierre ni recargue esta página.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Box>
        }


      </Grid>

      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        type={modalType}
      />
    </Grid >
  );
};

export default Register;