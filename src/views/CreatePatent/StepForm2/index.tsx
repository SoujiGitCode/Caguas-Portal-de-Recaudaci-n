import { useState, useEffect } from 'react';
import { Box, Grid, Typography, FormControl, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { makeStepAvailable, StepFormProps } from '@/views/CreatePatent/functions';
import { registerPatentPage2, getPatentData } from '@/views/CreatePatent/functions';
import { Step2Validation } from './Step2Validation';
import { CustomLabel } from '@/components';
import SimpleLoader from '@/components/SimpleLoader';
import useFormikValidation from '@/hooks/useFormikValidation';

const StepForm2 = ({ handleNext, handleBack, isLastStep, token, isMobile, setStepValidity, currentStep }: StepFormProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [patentData, setPatentData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const initialFormData = {
        postal_address_line1: '',
        postal_address_line2: '',
        postal_address_number: '',
        postal_address_country: '',
        postal_address_state: '',
        postal_address_city: '',
        postal_address_zipcode: '',
        address_line1: '',
        address_line2: '',
        address_number: '',
        address_country: '',
        address_state: '',
        address_city: '',
        address_zipcode: '',
        token: token
    };

    const formik = useFormik({
        validateOnMount: true,
        initialValues: { ...initialFormData, ...patentData, token },
        enableReinitialize: true,
        validationSchema: Step2Validation,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const response = await registerPatentPage2(values);
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
            setLoading(false);
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
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
            {/* <Typography variant="h1" gutterBottom sx={{ marginBottom: "1rem !important", textAlign: 'center' }}>
                Dirección Postal y Física
            </Typography> */}

            {errorMessage && (
                <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                    {errorMessage}
                </Typography>
            )}

            {/* Sección: Dirección Postal */}
            <Box>
                <Typography
                    variant="h2"
                    sx={{
                        marginY: '1rem !important',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        textAlign: isMobile ? 'center' : 'left',
                    }}>
                    Registro de nuevo negocio Sección Direcciones: Dirección Postal (Obligatorio)
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Dirección 1" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Dirección 1"
                                name="postal_address_line1"
                                variant="outlined"
                                value={formik.values.postal_address_line1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.postal_address_line1 && Boolean(formik.errors.postal_address_line1)}
                                helperText={formik.touched.postal_address_line1 && formik.errors.postal_address_line1}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Dirección 2" />
                        <FormControl fullWidth margin="normal">
                            <TextField
                                placeholder="Dirección 2"
                                name="postal_address_line2"
                                variant="outlined"
                                value={formik.values.postal_address_line2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.postal_address_line2 && Boolean(formik.errors.postal_address_line2)}
                                helperText={formik.touched.postal_address_line2 && formik.errors.postal_address_line2}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Número de Propiedad" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Número de Propiedad"
                                name="postal_address_number"
                                variant="outlined"
                                value={formik.values.postal_address_number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.postal_address_number && Boolean(formik.errors.postal_address_number)}
                                helperText={formik.touched.postal_address_number && formik.errors.postal_address_number}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="País" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="País"
                                name="postal_address_country"
                                variant="outlined"
                                value={formik.values.postal_address_country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.postal_address_country && Boolean(formik.errors.postal_address_country)}
                                helperText={formik.touched.postal_address_country && formik.errors.postal_address_country}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Estado" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Estado"
                                name="postal_address_state"
                                variant="outlined"
                                value={formik.values.postal_address_state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.postal_address_state && Boolean(formik.errors.postal_address_state)}
                                helperText={formik.touched.postal_address_state && formik.errors.postal_address_state}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Ciudad" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Ciudad"
                                name="postal_address_city"
                                variant="outlined"
                                value={formik.values.postal_address_city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.postal_address_city && Boolean(formik.errors.postal_address_city)}
                                helperText={formik.touched.postal_address_city && formik.errors.postal_address_city}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Código Postal" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Código Postal"
                                name="postal_address_zipcode"
                                variant="outlined"
                                value={formik.values.postal_address_zipcode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.postal_address_zipcode && Boolean(formik.errors.postal_address_zipcode)}
                                helperText={formik.touched.postal_address_zipcode && formik.errors.postal_address_zipcode}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {/* Sección: Dirección Física */}
            <Box>
                <Typography
                    variant="h2"
                    sx={{
                        marginY: '1rem !important',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        textAlign: isMobile ? 'center' : 'left',
                    }}>
                    Registro de nuevo negocio Sección Direcciones: Dirección Física (Obligatorio)
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Dirección 1" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Dirección 1"
                                name="address_line1"
                                variant="outlined"
                                value={formik.values.address_line1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address_line1 && Boolean(formik.errors.address_line1)}
                                helperText={formik.touched.address_line1 && formik.errors.address_line1}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Dirección 2" />
                        <FormControl fullWidth margin="normal">
                            <TextField
                                placeholder="Dirección 2"
                                name="address_line2"
                                variant="outlined"
                                value={formik.values.address_line2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address_line2 && Boolean(formik.errors.address_line2)}
                                helperText={formik.touched.address_line2 && formik.errors.address_line2}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Número de Propiedad" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Número de Propiedad"
                                name="address_number"
                                variant="outlined"
                                value={formik.values.address_number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address_number && Boolean(formik.errors.address_number)}
                                helperText={formik.touched.address_number && formik.errors.address_number}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="País" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="País"
                                name="address_country"
                                variant="outlined"
                                value={formik.values.address_country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address_country && Boolean(formik.errors.address_country)}
                                helperText={formik.touched.address_country && formik.errors.address_country}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Estado" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Estado"
                                name="address_state"
                                variant="outlined"
                                value={formik.values.address_state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address_state && Boolean(formik.errors.address_state)}
                                helperText={formik.touched.address_state && formik.errors.address_state}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Ciudad" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Ciudad"
                                name="address_city"
                                variant="outlined"
                                value={formik.values.address_city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address_city && Boolean(formik.errors.address_city)}
                                helperText={formik.touched.address_city && formik.errors.address_city}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Código Postal" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Código Postal"
                                name="address_zipcode"
                                variant="outlined"
                                value={formik.values.address_zipcode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address_zipcode && Boolean(formik.errors.address_zipcode)}
                                helperText={formik.touched.address_zipcode && formik.errors.address_zipcode}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

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
        </form>

    );
};

export default StepForm2;