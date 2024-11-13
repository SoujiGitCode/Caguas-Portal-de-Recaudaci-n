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
    complainant_name: string;
    complainant_phone: string;
    complainant_address: string;
    complainant_email: string;

    defendant_name: string;
    defendant_phone: string;
    defendant_address: string;
    defendant_email: string;

    case_number: string;
    topic: string;
    license_issued_number: string;
    event_date: string;
    event_place: string;
    complaint_date: string;
    reject_comment: string;
    witness_1: string;
    witness_2: string;
    witness_3: string;
    witness_4: string;

    token: string,
}


const Querella = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
    const token = useAuthStore((state: any) => state.token);


    const initialFormData: FormData = {
        complainant_name: '',
        complainant_phone: '',
        complainant_address: '',
        complainant_email: '',

        defendant_name: '',
        defendant_phone: '',
        defendant_address: '',
        defendant_email: '',

        case_number: '',
        topic: '',
        license_issued_number: '',
        event_date: '',
        event_place: '',
        complaint_date: '',
        reject_comment: '',
        witness_1: '',
        witness_2: '',
        witness_3: '',
        witness_4: '',

        token: token,
    };

    const [activeStep, setActiveStep] = useState(0);
    const [isStepValid, setStepValid] = useState(false);
    const [formData, setFormData] = useState<FormData>(initialFormData);


    const navigate = useNavigate();

    const updateFormData = (data: Partial<FormData>, reset = false) => {
        if (reset) {
            setFormData(initialFormData);
            return;
        }
        setFormData(prevData => ({ ...prevData, ...data }));
    };


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


    return (

        <>

            <Grid container sx={{ width: '100%', margin: 0, background: '#ededed' }}>
                <PurpleHeader />
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', paddingLeft: isMobile ? '1rem ' : '5rem', paddingRight: isMobile ? '1rem' : '5rem' }}>

                    <Grid item xs={12} sx={{ marginBottom: "1rem !important", marginTop: "2rem !important", display: 'flex', width: '100%', justifyContent: isMobile ? 'center' : 'center' }}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#3A3A3C', fontSize: '2em !important' }}>
                            Nueva Querella
                        </Typography>
                    </Grid>


                    {/* <Grid item xs={12} sx={{ marginY: '4rem !important' }}>
                        <Typography variant="body1" gutterBottom sx={{ fontSize: '1.1em !important' }}>
                            Solicite su certificado en formato digital.
                            Puede tardar hasta 5 días en ser procesada y enviada.
                        </Typography>
                    </Grid> */}

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

export default Querella;
