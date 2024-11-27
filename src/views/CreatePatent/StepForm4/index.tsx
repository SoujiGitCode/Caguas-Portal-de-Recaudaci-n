import { useState, useEffect } from 'react';
import { Box, Grid, Typography, FormControl, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { makeStepAvailable, StepFormProps } from '@/views/CreatePatent/functions';
import { registerPatentPage4, getPatentData } from '@/views/CreatePatent/functions';
import { Step4Validation } from './Step4Validation';
import { CustomLabel } from '@/components';
import SimpleLoader from '@/components/SimpleLoader';
import useFormikValidation from '@/hooks/useFormikValidation';

interface FormValuesStep4 {
    agent_info_name: string;
    agent_info_email: string;
    agent_info_role: string;
    agent_info_social_security: string;
    owner_info_name: string;
    owner_info_email: string;
    owner_info_role: string;
    owner_info_social_security: string;
    token: string;
}



const StepForm4 = ({ handleNext, handleBack, isLastStep, token, isMobile, setStepValidity, currentStep }: StepFormProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [patentData, setPatentData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const initialFormData = {
        agent_info_name: '',
        agent_info_email: '',
        agent_info_role: '',
        agent_info_social_security: '',
        owner_info_name: '',
        owner_info_email: '',
        owner_info_role: '',
        owner_info_social_security: '',
        token: token
    };

    const formik = useFormik<FormValuesStep4>({
        validateOnMount: true,
        initialValues: { ...initialFormData, ...patentData, token },
        enableReinitialize: true,
        validationSchema: Step4Validation,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const response = await registerPatentPage4(values);
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
        setLoading(true);
        try {
            const response = await getPatentData(token);
            if (response.code === 200) {
                setPatentData(response.data);
            } else {
                console.log('Hubo un problema al cargar los datos. Intente nuevamente.');
            }
            setTimeout(() => {
                setLoading(false)
            }, 400)
        } catch (error) {
            setLoading(false);
            console.log('Error en el servidor al cargar los datos. Intente nuevamente más tarde.');
        }
    };

    useFormikValidation(formik);

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

            {/* Sección: Información de Dueño o Presidente */}
            <Box>
                <Typography
                    variant="h2"
                    sx={{
                        marginY: '1.5rem !important',
                        fontSize: '1rem',
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Registro de nuevo negocio Sección Información de Dueño o Presidente
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Nombre" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Nombre"
                                name="agent_info_name"
                                variant="outlined"
                                value={formik.values.agent_info_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.agent_info_name && Boolean(formik.errors.agent_info_name)}
                                helperText={formik.touched.agent_info_name && formik.errors.agent_info_name}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Correo Electrónico" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Correo Electrónico"
                                name="agent_info_email"
                                variant="outlined"
                                value={formik.values.agent_info_email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.agent_info_email && Boolean(formik.errors.agent_info_email)}
                                helperText={formik.touched.agent_info_email && formik.errors.agent_info_email}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Posición del Dueño o Representante" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Posición del Dueño o Representante"
                                name="agent_info_role"
                                variant="outlined"
                                value={formik.values.agent_info_role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.agent_info_role && Boolean(formik.errors.agent_info_role)}
                                helperText={formik.touched.agent_info_role && formik.errors.agent_info_role}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Seguro Social" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Seguro Social"
                                name="agent_info_social_security"
                                variant="outlined"
                                value={formik.values.agent_info_social_security}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.agent_info_social_security && Boolean(formik.errors.agent_info_social_security)}
                                helperText={formik.touched.agent_info_social_security && formik.errors.agent_info_social_security}
                                inputProps={{
                                    maxLength: 9
                                }}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {/* Sección: Información del Presidente (Solo aplica para Organizaciones) */}
            <Box>
                <Typography
                    variant="h2"
                    sx={{
                        marginY: '1.5rem !important',
                        fontSize: '1rem',
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Información del Presidente (Solo aplica para Organizaciones)
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Nombre" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Nombre"
                                name="owner_info_name"
                                variant="outlined"
                                value={formik.values.owner_info_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.owner_info_name && Boolean(formik.errors.owner_info_name)}
                                helperText={formik.touched.owner_info_name && formik.errors.owner_info_name}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Apellido" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Apellido"
                                name="owner_info_last_name"
                                variant="outlined"
                                value={formik.values.owner_info_last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.owner_info_last_name && Boolean(formik.errors.owner_info_last_name)}
                                helperText={formik.touched.owner_info_last_name && formik.errors.owner_info_last_name}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Correo Electrónico" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Correo Electrónico"
                                name="owner_info_email"
                                variant="outlined"
                                value={formik.values.owner_info_email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.owner_info_email && Boolean(formik.errors.owner_info_email)}
                                helperText={formik.touched.owner_info_email && formik.errors.owner_info_email}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Posición del Dueño o Representante" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Posición del Dueño o Representante"
                                name="owner_info_role"
                                variant="outlined"
                                value={formik.values.owner_info_role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.owner_info_role && Boolean(formik.errors.owner_info_role)}
                                helperText={formik.touched.owner_info_role && formik.errors.owner_info_role}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Seguro Social" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Seguro Social"
                                name="owner_info_social_security"
                                variant="outlined"
                                value={formik.values.owner_info_social_security}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.owner_info_social_security && Boolean(formik.errors.owner_info_social_security)}
                                helperText={formik.touched.owner_info_social_security && formik.errors.owner_info_social_security}
                                inputProps={{
                                    maxLength: 9
                                }}
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

export default StepForm4;
