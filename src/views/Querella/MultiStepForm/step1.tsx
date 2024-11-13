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
} from '@mui/material';
import Radio from '@mui/material/Radio';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import WarningIcon from "@mui/icons-material/Warning";
import CustomLabel from "@/components/CustomLabel";
import { useFormik } from "formik";
import { step1Validations } from './validations/step1Validations';
import { requestSchools, requestTowns } from '@/views/Create/functions';
import SocialSecurityInput from '@/components/SocialSecurityInput';
import PhoneInput from '@/components/PhoneInput';
import { TermsandConditionsCheckBox } from '@/components';
import FileUploadButton from '@/views/Home/components/FileUploadButton';


interface StepProps {
    termsandConditionsCheckBox: boolean;
    setTermsandConditionsCheckBox: (status: boolean) => void;
    isStepValid: boolean;
    setStepValid: (valid: boolean) => void;
    onStepCompleted: (data: any) => void;
    formData: any;
    updateFormData: (data: any, reset: boolean) => void;
}

interface ItemData {
    id: string;
    name: string;
}


const Step1 = ({ termsandConditionsCheckBox, setTermsandConditionsCheckBox, isStepValid, setStepValid, onStepCompleted, formData, updateFormData }: StepProps) => {


    const formik = useFormik({
        validateOnMount: true,

        initialValues: {
            case_number: '0001',

            complainant_name: '',
            complainant_last_name: '',
            complainant_phone: '',
            complainant_address: '',
            complainant_email: '',

            defendant_name: '',
            defendant_last_name: '',
            defendant_phone: '',
            defendant_address: '',
            defendant_email: '',

            topic: '',
            license_issued_number: '',
            event_date: new Date().toISOString().split("T")[0],
            event_place: '',
            complaint_date: new Date().toISOString().split("T")[0],
            reject_comment: '',
            witness_1: '',
            witness_2: '',
            witness_3: '',
            witness_4: '',
            witness_1_last_name: '',
            witness_2_last_name: '',
            witness_3_last_name: '',
            witness_4_last_name: '',

            // complainant_name: 'reinaldo',
            // complainant_phone: '657457351',
            // complainant_address: 'Valencia, Valencia',
            // complainant_email: 'rei@gg.com',


            // defendant_name: 'Pier',
            // defendant_phone: '44234566',
            // defendant_address: 'Caracas',
            // defendant_email: 'pier@gg.com',

            // topic: 'asuntoprobando',
            // license_issued_number: '43324234',
            // event_date: '',
            // event_place: 'online',
            // complaint_date: new Date().toISOString().split("T")[0],
            // reject_comment: 'testreject',
            // witness_1: 'juan',
            // witness_2: 'pedro',
            // witness_3: 'luis',
            // witness_4: '',

        },
        validationSchema: step1Validations,
        onSubmit: async () => {
            // await sendUserForRegister();
        },
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true
    });


    // if (validate) {
    //     setValidate(false);
    // }



    useEffect(() => {
        if (!formik.isValid) {
            console.log(formik.errors);
            setStepValid(false)
        }
        if (formik.isValid) {
            setStepValid(true)
            updateFormData({
                case_number: '0001',


                complainant_name: formik.values.complainant_name,
                complainant_last_name: formik.values.complainant_last_name,
                complainant_phone: formik.values.complainant_phone,
                complainant_address: formik.values.complainant_address,
                complainant_email: formik.values.complainant_email,


                defendant_name: formik.values.defendant_name,
                defendant_last_name: formik.values.defendant_last_name,
                defendant_phone: formik.values.defendant_phone,
                defendant_address: formik.values.defendant_address,
                defendant_email: formik.values.defendant_email,

                topic: formik.values.topic,
                license_issued_number: formik.values.license_issued_number,
                event_date: formik.values.event_date,
                event_place: formik.values.event_place,
                complaint_date: formik.values.complaint_date,
                reject_comment: formik.values.reject_comment,
                witness_1: formik.values.witness_1,
                witness_2: formik.values.witness_2,
                witness_3: formik.values.witness_3,
                witness_4: formik.values.witness_4,


            }, false);
        }

        console.log('isStepValid ' + isStepValid)
    }, [formik.values, formik.touched, formik.isValid]);


    return (
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>




            <Grid container sx={{ justifyContent: 'center' }}>
                {/*----------Querellante-------*/}
                <Grid item xs={12} lg={10} sx={{ marginTop: '4rem !important' }}>
                    <Box>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                                <Typography variant="body1" gutterBottom
                                    sx={{
                                        fontSize: '1.5rem !important',
                                        fontWeight: 'bolder',
                                        marginBottom: "1.5rem !important",
                                        textAlign: 'center'
                                    }}>
                                    Querellante
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>


                    <Box>
                        <Grid container spacing={0}>
                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Nombre " required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Nombre'
                                        name="complainant_name"
                                        id="complainant_name"
                                        type="text"
                                        value={formik.values.complainant_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.complainant_name && Boolean(formik.errors.complainant_name)}
                                        helperText={formik.touched.complainant_name && typeof formik.errors.complainant_name === 'string' ? formik.errors.complainant_name : undefined}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Apellido " required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Nombre'
                                        name="complainant_last_name"
                                        id="complainant_last_name"
                                        type="text"
                                        value={formik.values.complainant_last_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.complainant_last_name && Boolean(formik.errors.complainant_last_name)}
                                        helperText={formik.touched.complainant_last_name && typeof formik.errors.complainant_last_name === 'string' ? formik.errors.complainant_last_name : undefined}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Teléfono " required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <PhoneInput
                                        placeholder='Teléfono'
                                        name="complainant_phone"
                                        id="complainant_phone"
                                        variant="outlined"
                                        formik={formik}
                                    />

                                    {/* <TextField
                                        variant="outlined"
                                        placeholder='Teléfono'
                                        name="complainant_phone"
                                        id="complainant_phone"
                                        type="text"
                                        value={formik.values.complainant_phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.complainant_phone && Boolean(formik.errors.complainant_phone)}
                                        helperText={formik.touched.complainant_phone && typeof formik.errors.complainant_phone === 'string' ? formik.errors.complainant_phone : undefined}
                                        inputProps={{
                                            maxLength: 10 // Limita la entrada a 10 caracteres
                                        }}
                                        onInput={formik.handleChange}
                                    /> */}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Dirección " required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Dirección '
                                        name="complainant_address"
                                        id="complainant_address"
                                        type="text"
                                        value={formik.values.complainant_address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.complainant_address && Boolean(formik.errors.complainant_address)}
                                        helperText={formik.touched.complainant_address && typeof formik.errors.complainant_address === 'string' ? formik.errors.complainant_address : undefined}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Correo Electrónico" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        placeholder='Correo Electrónico'
                                        name="complainant_email"
                                        autoComplete="new-password"
                                        id="complainant_email"
                                        type="text"
                                        variant="outlined"
                                        value={formik.values.complainant_email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.complainant_email && Boolean(formik.errors.complainant_email)}
                                        helperText={formik.touched.complainant_email && typeof formik.errors.complainant_email === 'string' ? formik.errors.complainant_email : undefined}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                    </Box>

                </Grid>
                {/*---------- FIN Querellante-------*/}

                {/*----------Querellado-------*/}
                <Grid item xs={12} lg={10} sx={{ marginTop: '4rem !important' }}>
                    <Box>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                                <Typography variant="body1" gutterBottom
                                    sx={{
                                        fontSize: '1.5rem !important',
                                        fontWeight: 'bolder',
                                        marginBottom: "1.5rem !important",
                                        textAlign: 'center'
                                    }}>
                                    Querellado
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>


                    <Box>
                        <Grid container spacing={0}>
                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Nombre" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Nombre'
                                        name="defendant_name"
                                        id="defendant_name"
                                        type="text"
                                        value={formik.values.defendant_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.defendant_name && Boolean(formik.errors.defendant_name)}
                                        helperText={formik.touched.defendant_name && typeof formik.errors.defendant_name === 'string' ? formik.errors.defendant_name : undefined}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Apellido" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Apellido'
                                        name="defendant_last_name"
                                        id="defendant_last_name"
                                        type="text"
                                        value={formik.values.defendant_last_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.defendant_last_name && Boolean(formik.errors.defendant_last_name)}
                                        helperText={formik.touched.defendant_last_name && typeof formik.errors.defendant_last_name === 'string' ? formik.errors.defendant_last_name : undefined}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Teléfono " required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <PhoneInput
                                        placeholder='Teléfono'
                                        name="defendant_phone"
                                        id="defendant_phone"
                                        variant="outlined"
                                        formik={formik}
                                    />

                                    {/* <TextField
                                        variant="outlined"
                                        placeholder='Teléfono'
                                        name="defendant_phone"
                                        id="defendant_phone"
                                        type="text"
                                        value={formik.values.defendant_phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.defendant_phone && Boolean(formik.errors.defendant_phone)}
                                        helperText={formik.touched.defendant_phone && typeof formik.errors.defendant_phone === 'string' ? formik.errors.defendant_phone : undefined}
                                        inputProps={{
                                            maxLength: 10 // Limita la entrada a 10 caracteres
                                        }}
                                        onInput={formik.handleChange}
                                        FormHelperTextProps={{
                                            style: { marginTop: '18px !important' }, // Ajusta el valor según necesites
                                        }}
                                    /> */}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Dirección " required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Dirección'
                                        name="defendant_address"
                                        id="defendant_address"
                                        type="text"
                                        value={formik.values.defendant_address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.defendant_address && Boolean(formik.errors.defendant_address)}
                                        helperText={formik.touched.defendant_address && typeof formik.errors.defendant_address === 'string' ? formik.errors.defendant_address : undefined}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Correo Electrónico" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        placeholder='Correo Electrónico'
                                        name="defendant_email"
                                        autoComplete="test-password"
                                        id="defendant_email"
                                        type="text"
                                        variant="outlined"
                                        value={formik.values.defendant_email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.defendant_email && Boolean(formik.errors.defendant_email)}
                                        helperText={formik.touched.defendant_email && typeof formik.errors.defendant_email === 'string' ? formik.errors.defendant_email : undefined}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                    </Box>

                </Grid>
                {/*----------FIN Querellado --------*/}


                {/*----------Datos de la Querella--------*/}
                <Grid item xs={12} lg={10} sx={{ marginTop: '4rem !important' }}>
                    <Box>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                                <Typography variant="body1" gutterBottom
                                    sx={{
                                        fontSize: '1.5rem !important',
                                        fontWeight: 'bolder',
                                        marginBottom: "1.5rem !important",
                                        textAlign: 'center'
                                    }}>
                                    Descripción General
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>


                    <Box>
                        <Grid container spacing={0}>
                            {/* <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Número de Caso" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Número de Caso'
                                        name="case_number"
                                        id="case_number"
                                        type="text"
                                        value={formik.values.case_number}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.case_number && Boolean(formik.errors.case_number)}
                                        helperText={formik.touched.case_number && typeof formik.errors.case_number === 'string' ? formik.errors.case_number : undefined}
                                    />
                                </FormControl>
                            </Grid> */}

                            <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Asunto" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Asunto'
                                        name="topic"
                                        id="topic"
                                        type="text"
                                        value={formik.values.topic}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.topic && Boolean(formik.errors.topic)}
                                        helperText={formik.touched.topic && typeof formik.errors.topic === 'string' ? formik.errors.topic : undefined}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Descripción General" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        placeholder="Descripción General"
                                        name="reject_comment"
                                        id="reject_comment"
                                        type="text"
                                        multiline
                                        minRows={3} // Hace que parezca un textarea agrandándolo por defecto
                                        value={formik.values.reject_comment}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.reject_comment && Boolean(formik.errors.reject_comment)}
                                        helperText={formik.touched.reject_comment && typeof formik.errors.reject_comment === 'string' ? formik.errors.reject_comment : undefined}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    height: 'auto',

                                                },
                                            },
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Lugar de ocurrencia de los hechos" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Lugar'
                                        name="event_place"
                                        id="event_place"
                                        type="text"
                                        value={formik.values.event_place}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.event_place && Boolean(formik.errors.event_place)}
                                        helperText={formik.touched.event_place && typeof formik.errors.event_place === 'string' ? formik.errors.event_place : undefined}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="No. licencia expedida por Comisión" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='No. licencia expedida por Comisión'
                                        name="license_issued_number"
                                        id="license_issued_number"
                                        type="text"
                                        value={formik.values.license_issued_number}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.license_issued_number && Boolean(formik.errors.license_issued_number)}
                                        helperText={formik.touched.license_issued_number && typeof formik.errors.license_issued_number === 'string' ? formik.errors.license_issued_number : undefined}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Fecha de ocurrencia de los hechos" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        placeholder='Fecha'
                                        id="event_date"
                                        name="event_date"
                                        type="date"
                                        value={formik.values.event_date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.event_date && Boolean(formik.errors.event_date)}
                                        helperText={formik.touched.event_date && formik.errors.event_date}
                                        inputProps={{
                                            max: new Date().toISOString().split("T")[0],  // Limita la fecha a hoy
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem', display: 'none' }}>
                                <CustomLabel name="Fecha actual donde se genera la Querella	" required={true} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        placeholder='Fecha '
                                        id="complaint_date"
                                        name="complaint_date"
                                        type="date"
                                        value={formik.values.complaint_date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.complaint_date && Boolean(formik.errors.complaint_date)}
                                        helperText={formik.touched.complaint_date && formik.errors.complaint_date}
                                        inputProps={{
                                            max: new Date().toISOString().split("T")[0],  // Limita la fecha a hoy
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>
                {/*----------FIN Datos de la Querella--------*/}



                {/*----------Testigos-------*/}
                <Grid item xs={12} lg={10} sx={{ marginTop: '4rem !important' }}>
                    <Box>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                                <Typography variant="body1" gutterBottom
                                    sx={{
                                        fontSize: '1.5rem !important',
                                        fontWeight: 'bolder',
                                        marginBottom: "1.5rem !important",
                                        textAlign: 'center'
                                    }}>
                                    Testigos
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>


                    <Box>
                        <Grid container spacing={0}>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Nombre" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Nombre'
                                        name="witness_1"
                                        id="witness_1"
                                        type="text"
                                        value={formik.values.witness_1}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.witness_1 && Boolean(formik.errors.witness_1)}
                                        helperText={formik.touched.witness_1 && typeof formik.errors.witness_1 === 'string' ? formik.errors.witness_1 : undefined}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Apellido" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Apellido'
                                        name="witness_1_last_name"
                                        id="witness_1_last_name"
                                        type="text"
                                        value={formik.values.witness_1_last_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.witness_1_last_name && Boolean(formik.errors.witness_1_last_name)}
                                        helperText={formik.touched.witness_1_last_name && typeof formik.errors.witness_1_last_name === 'string' ? formik.errors.witness_1_last_name : undefined}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Nombre" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Nombre'
                                        name="witness_2"
                                        id="witness_2"
                                        type="text"
                                        value={formik.values.witness_2}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.witness_2 && Boolean(formik.errors.witness_2)}
                                        helperText={formik.touched.witness_2 && typeof formik.errors.witness_2 === 'string' ? formik.errors.witness_2 : undefined}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Apellido" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Apellido'
                                        name="witness_2_last_name"
                                        id="witness_2_last_name"
                                        type="text"
                                        value={formik.values.witness_2_last_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.witness_2_last_name && Boolean(formik.errors.witness_2_last_name)}
                                        helperText={formik.touched.witness_2_last_name && typeof formik.errors.witness_2_last_name === 'string' ? formik.errors.witness_2_last_name : undefined}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Nombre" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Nombre'
                                        name="witness_3"
                                        id="witness_3"
                                        type="text"
                                        value={formik.values.witness_3}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.witness_3 && Boolean(formik.errors.witness_3)}
                                        helperText={formik.touched.witness_3 && typeof formik.errors.witness_3 === 'string' ? formik.errors.witness_3 : undefined}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Apellido" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Apellido'
                                        name="witness_3_last_name"
                                        id="witness_3_last_name"
                                        type="text"
                                        value={formik.values.witness_3_last_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.witness_3_last_name && Boolean(formik.errors.witness_3_last_name)}
                                        helperText={formik.touched.witness_3_last_name && typeof formik.errors.witness_3_last_name === 'string' ? formik.errors.witness_3_last_name : undefined}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Nombre" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Nombre'
                                        name="witness_4"
                                        id="witness_4"
                                        type="text"
                                        value={formik.values.witness_4}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.witness_4 && Boolean(formik.errors.witness_4)}
                                        helperText={formik.touched.witness_4 && typeof formik.errors.witness_4 === 'string' ? formik.errors.witness_4 : undefined}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Apellido" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <TextField
                                        variant="outlined"
                                        placeholder='Apellido'
                                        name="witness_4_last_name"
                                        id="witness_4_last_name"
                                        type="text"
                                        value={formik.values.witness_4_last_name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.witness_4_last_name && Boolean(formik.errors.witness_4_last_name)}
                                        helperText={formik.touched.witness_4_last_name && typeof formik.errors.witness_4_last_name === 'string' ? formik.errors.witness_4_last_name : undefined}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                    </Box>

                </Grid>
                {/*----------FIN Testigos --------*/}

                {/*----------Archivos Adjuntos-------*/}
                <Grid item xs={12} lg={10} sx={{ marginTop: '4rem !important', display: 'none' }}>
                    <Box>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                                <Typography variant="body1" gutterBottom
                                    sx={{
                                        fontSize: '1.5rem !important',
                                        fontWeight: 'bolder',
                                        marginBottom: "1.5rem !important",
                                        textAlign: 'center'
                                    }}>
                                    Adjuntar Archivos
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>


                    <Box>
                        <Grid container spacing={0}>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Archivo" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <FileUploadButton />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Archivo" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <FileUploadButton />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Archivo" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <FileUploadButton />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                                <CustomLabel name="Archivo" required={false} />
                                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                                    <FileUploadButton />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>

                </Grid>
                {/*----------FIN Archivos Adjuntos --------*/}
            </Grid>

        </form >
    );
};

export default Step1;
