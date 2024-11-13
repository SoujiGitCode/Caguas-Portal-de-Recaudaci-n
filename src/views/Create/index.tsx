import { useState, useEffect } from 'react';

import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import registerImage from '../../assets/register.png';
import Radio from '@mui/material/Radio';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";
import CustomLabel from "@/components/CustomLabel";
import { requestUserInfo } from "./functions";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./Fast.module.scss";
import useAlert from "@/hooks/useAlert";
import useAuthStore from "@/hooks/useAuthStore";
import { PATH } from '@/routes/constants';
import { ConfirmationModal } from '@/components';
import { registerValidation } from '@/validations/registerValidation';
import ProgressStatus from '@/components/ProgressStatus/ProgressStatus';
import MultiStepForm from './MultiStepForm';
import { useParams } from 'react-router-dom';
import PurpleHeader from '@/components/PurpleHeader';

interface FormData {
  email: string;
  schoolTown: string,
  school_code: string;
  grade: string;
  grade_year: string;
  identification_type: string;
  identification: string;
  first_name: string;
  second_name: string;
  last_name: string;
  second_last_name: string;
  birthdate: string;
  gender: string;
  depr_first_name: string;
  depr_second_name: string;
  depr_last_name: string;
  depr_second_last_name: string;
  phone: string;
  social_security: string;
  email1: string;
  email2: string;
  token: string;
  certification_type_id: string;
}


const Create = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  const { certification_type_id } = useParams();
  console.log("certification_type_id from useParams:", certification_type_id);


  const initialFormData: FormData = {
    email: '',
    schoolTown: '1',
    school_code: '',
    grade: 'none',
    grade_year: '',
    identification_type: '',
    identification: '',
    first_name: '',
    second_name: '',
    last_name: '',
    second_last_name: '',
    birthdate: '',
    gender: '',
    depr_first_name: '',
    depr_second_name: '',
    depr_last_name: '',
    depr_second_last_name: '',
    phone: '',
    social_security: '',
    email1: '',
    email2: '',
    token: '',
    certification_type_id: certification_type_id || '',
  };

  const [activeStep, setActiveStep] = useState(0);
  const [isStepValid, setStepValid] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formTitle, setFormTitle] = useState('Transcripción de Créditos');

  const { id } = useParams();
  const [title, setTitle] = useState('');

  useEffect(() => {
    setFormTitle(certification_type_id == '3' ? 'Certificado de Horas Taller' : 'Transcripción de Créditos')
  }, []);


  const navigate = useNavigate();

  const updateFormData = (data: Partial<FormData>, reset = false) => {
    if (reset) {
      setFormData(initialFormData);
      return;
    }
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const token = useAuthStore((state: any) => state.token);

  const onBack = () => {
    if (isAuthenticated) navigate("/dashboard");
    if (!isAuthenticated) navigate("/");
  }


  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const userInfo = await requestUserInfo(token);
          setFormData(userInfo);
          console.log(formData)
          updateFormData({
            token: token,
          }, false);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setFormData(initialFormData);
      }
    };

    fetchUserData();
  }, [isAuthenticated, token]);

  useEffect(() => {
    updateFormData({ certification_type_id: certification_type_id }, false);
  }, [formData.certification_type_id]);

  return (

    <>

      <Grid container sx={{ width: '100%', margin: 0 }}>
        <PurpleHeader />
        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', paddingLeft: isMobile ? '1rem ' : '5rem', paddingRight: isMobile ? '1rem' : '5rem' }}>

          <Grid item xs={12} sx={{ marginBottom: "1em !important", marginTop: "4em !important", display: 'flex', width: '100%', justifyContent: isMobile ? 'center' : 'start' }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#697FAA', fontSize: '2em !important' }}>
              Crear Solicitud {formTitle}
            </Typography>
          </Grid>


          <Grid item xs={12} sx={{ marginY: '4rem !important' }}>
            <Typography variant="body1" gutterBottom sx={{ fontSize: '1.1em !important' }}>
              Solicite su certificado en formato digital.
              Puede tardar hasta 5 días en ser procesada y enviada.
            </Typography>
          </Grid>

          <MultiStepForm
            onBack={onBack}
            currentStep={activeStep}
            changeStep={setActiveStep}
            isStepValid={isStepValid}
            setStepValid={setStepValid}
            formData={formData}
            updateFormData={updateFormData}
            isAuthenticated={isAuthenticated}
          />

        </Grid>

      </Grid >
    </>


  );
};

export default Create;
