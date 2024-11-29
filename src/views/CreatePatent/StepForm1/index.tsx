import { useEffect, useState } from 'react';
import { Box, Grid, Typography, FormControl, TextField, Button, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import { Step1Validation } from './Step1Validation';
import { CustomLabel, SocialSecurityInput, YearSelect } from '@/components';
import { StepFormProps, makeStepAvailable, StepForm1Request, registerPatentPage1, getPatentData } from '@/views/CreatePatent/functions'
import useFormikValidation from '@/hooks/useFormikValidation';
import SimpleLoader from '@/components/SimpleLoader';
import PhoneInput from '@/components/PhoneInput';


const StepForm1 = ({ handleNext, handleBack, isLastStep, token, isMobile, setStepValidity, currentStep }: StepFormProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [patentData, setPatentData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [isAPerson, setIsAPerson] = useState<boolean | null>(null);

    const initialFormData = {
        record_type: "",
        patent_type: "",
        general_fiscal_year_business_startup: 0,
        general_phone: "",
        general_social_security: "",
        general_company_name: "",
        general_first_name: "",
        general_last_name: "",
        general_second_name: "",
        general_second_last_name: "",
        general_tsc: '0',
        token: token
    };

    const formik = useFormik<StepForm1Request>({
        validateOnMount: true,
        initialValues: { ...initialFormData, ...patentData, token },
        enableReinitialize: true, // Reinitialize si patentData cambia al cargar
        validationSchema: Step1Validation,
        validateOnBlur: true,   // Valida al salir del campo
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const response = await registerPatentPage1(values);
                if (response.code === 200) {
                    setErrorMessage(null);
                    setTimeout(() => {
                        setLoading(false)
                    }, 400)
                    handleNext();
                    makeStepAvailable(currentStep, setStepValidity);
                } else {
                    setLoading(false)
                    setErrorMessage('Hubo un problema al procesar la solicitud. Intente nuevamente.');
                }
            } catch (error) {
                setLoading(false)
                setErrorMessage('Error en el servidor. Intente nuevamente más tarde.');
            }
        },
    });

    const fetchPatentData = async () => {
        setLoading(true)
        try {
            const response = await getPatentData(token);
            if (response.code === 200) {
                setPatentData(response.data);
                console.log(response.data)
            } else {
                setLoading(false)
                console.log('Hubo un problema al cargar los datos del patente. Intente nuevamente.');
            }
            setTimeout(() => {
                setLoading(false)
            }, 400)
        } catch (error) {
            setLoading(false)
            console.log('Error en el servidor al cargar los datos del patente. Intente nuevamente más tarde.');
        }
    };

    useFormikValidation(formik);
    // Efecto para marcar solo el campo de year select como `touched`
    useEffect(() => {
        const markYearFieldAsTouched = () => {
            formik.setTouched({ general_fiscal_year_business_startup: true }, true);
        };

        markYearFieldAsTouched();
    }, [formik.values.general_fiscal_year_business_startup]);

    // useEffect para actualizar `isAPerson` basado en el valor de `general_tsc`
    useEffect(() => {
        if (formik.values.general_tsc === '0') {
            setIsAPerson(true);
        } else if (formik.values.general_tsc === '1') {
            setIsAPerson(false);
        } else {
            setIsAPerson(null);
        }
    }, [formik.values.general_tsc]);



    useEffect(() => {
        fetchPatentData();
    }, []);

    if (loading) {
        return (
            <SimpleLoader />
        )
    }

    return (

        <form onSubmit={formik.handleSubmit} style={{ width: 'auto' }}>
            {errorMessage && (
                <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                    {errorMessage}
                </Typography>
            )}

            {/* Sección: Registro de nuevo negocio Tipo de Persona Jurídica y Patente */}
            <Box>
                <Typography
                    variant="h2"
                    sx={{
                        marginY: '1.5rem !important',
                        fontSize: '1rem',
                        textAlign: isMobile ? 'center' : 'start',
                    }}
                >
                    Registro de nuevo negocio Tipo de Persona Jurídica y Patente
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Tipo de Registro" />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder="Tipo de Registro"
                                name="record_type"
                                variant="outlined"
                                value={formik.values.record_type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.record_type && Boolean(formik.errors.record_type)}
                                helperText={formik.touched.record_type && formik.errors.record_type}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Tipo de Patente" />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder="Tipo de Patente"
                                name="patent_type"
                                variant="outlined"
                                value={formik.values.patent_type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.patent_type && Boolean(formik.errors.patent_type)}
                                helperText={formik.touched.patent_type && formik.errors.patent_type}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {/* Sección: Registro de nuevo negocio Datos generales de la patente */}
            <Box>
                <Typography variant="h2"
                    sx={{
                        marginY: '1.5rem !important',
                        fontSize: '1rem',
                        textAlign: isMobile ? 'center' : 'left',
                    }}>
                    Registro de nuevo negocio Datos generales de la patente
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>

                        <FormControl fullWidth margin="normal"  >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem', // Menor espacio entre los botones y el texto
                                }}
                            >
                                <Box sx={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                    <Button
                                        variant={formik.values.general_tsc === '0' ? 'contained' : 'outlined'}
                                        color={formik.values.general_tsc === '0' ? 'primary' : 'secondary'}
                                        onClick={() => formik.setFieldValue('general_tsc', '0')}
                                        sx={{ minWidth: '120px' }}
                                    >
                                        Persona
                                    </Button>
                                    <Button
                                        variant={formik.values.general_tsc === '1' ? 'contained' : 'outlined'}
                                        color={formik.values.general_tsc === '1' ? 'primary' : 'secondary'}
                                        onClick={() => formik.setFieldValue('general_tsc', '1')}
                                        sx={{ minWidth: '120px' }}
                                    >
                                        Organización
                                    </Button>
                                </Box>
                                {/* Texto debajo indicando la opción seleccionada */}
                                <Typography
                                    sx={{
                                        fontSize: '0.8rem',
                                        color: 'rgb(34,139,34)',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {formik.values.general_tsc === '0'
                                        ? 'Ha seleccionado: Persona'
                                        : formik.values.general_tsc === '1'
                                            ? 'Ha seleccionado: Organización'
                                            : ''}
                                </Typography>
                            </Box>
                            {formik.touched.general_tsc && formik.errors.general_tsc && (
                                <Typography color="error" sx={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                    {formik.errors.general_tsc}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Año Fiscal en que comenzó operaciones:" />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <YearSelect
                                name="general_fiscal_year_business_startup"
                                placeholder="Año Fiscal"
                                formik={formik}
                                defaultOption='Seleccione Año Fiscal'
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Teléfono" />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <PhoneInput
                                name="general_phone"
                                formik={formik}
                                placeholder='Teléfono'
                                id="general_phone"
                                variant="outlined"
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Seguro Social" />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder="Seguro Social"
                                name="general_social_security"
                                variant="outlined"
                                value={formik.values.general_social_security}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.general_social_security && Boolean(formik.errors.general_social_security)}
                                helperText={formik.touched.general_social_security && formik.errors.general_social_security}
                                inputProps={{
                                    maxLength: 9
                                }}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem', display: isAPerson ? 'none' : 'block' }}>
                        <CustomLabel name="Nombre de la organización" />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder="Nombre de la organización"
                                name="general_company_name"
                                variant="outlined"
                                value={formik.values.general_company_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.general_company_name && Boolean(formik.errors.general_company_name)}
                                helperText={formik.touched.general_company_name && formik.errors.general_company_name}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem', display: isAPerson ? 'block' : 'none' }}>
                        <CustomLabel name="Nombre" />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder="Nombre"
                                name="general_first_name"
                                variant="outlined"
                                value={formik.values.general_first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.general_first_name && Boolean(formik.errors.general_first_name)}
                                helperText={formik.touched.general_first_name && formik.errors.general_first_name}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem', display: isAPerson ? 'block' : 'none' }}>
                        <CustomLabel name="Apellido" />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder="Apellido"
                                name="general_last_name"
                                variant="outlined"
                                value={formik.values.general_last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.general_last_name && Boolean(formik.errors.general_last_name)}
                                helperText={formik.touched.general_last_name && formik.errors.general_last_name}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </Box >

            <Box sx={{ my: '2rem !important', display: 'flex', justifyContent: 'center' }}>
                {handleBack && (
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                            width: "120px",
                            height: "40px",
                            padding: "8px 15px",
                            borderRadius: "32px",
                            border: "1px solid",
                            fontSize: '0.8rem !important',
                            marginRight: "1rem !important",
                        }}
                        onClick={handleBack}
                    >
                        Volver
                    </Button>
                )}
                <Button
                    sx={{
                        width: "120px",
                        height: "40px",
                        padding: "8px 15px",
                        borderRadius: "32px",
                        border: "1px solid",
                        fontSize: '0.8rem !important',
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!formik.isValid}
                >
                    {isLastStep ? 'Enviar Solicitud' : 'Siguiente'}
                </Button>
            </Box>
        </form >


    );
};

export default StepForm1;
