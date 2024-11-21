import { useState, useEffect } from 'react';
import { Box, Grid, Typography, FormControl, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import { makeStepAvailable, StepFormProps } from '@/views/CreatePatent/functions';
import { registerPatentPage3, getPatentData } from '@/views/CreatePatent/functions';
import { Step3Validation } from './Step3Validation';
import { CustomLabel } from '@/components';
import SimpleLoader from '@/components/SimpleLoader';
import useFormikValidation from '@/hooks/useFormikValidation';

const StepForm3 = ({ handleNext, handleBack, isLastStep, token, isMobile, setStepValidity, currentStep }: StepFormProps) => {
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
        taxpayerhome_address_line1: '',
        taxpayerhome_address_line2: '',
        taxpayerhome_address_number: '',
        taxpayerhome_address_country: '',
        taxpayerhome_address_state: '',
        taxpayerhome_address_city: '',
        taxpayerhome_address_zipcode: '',
        taxpayerwork_address_line1: '',
        taxpayerwork_address_line2: '',
        taxpayerwork_address_number: '',
        taxpayerwork_address_country: '',
        taxpayerwork_address_state: '',
        taxpayerwork_address_city: '',
        taxpayerwork_address_zipcode: '',
        token: token,
    };

    const formik = useFormik({
        validateOnMount: true,
        initialValues: { ...initialFormData, ...patentData, token },
        enableReinitialize: true,
        validationSchema: Step3Validation,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const response = await registerPatentPage3(values);
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

            {/* Sección: Dirección Residencial del Contribuyente */}
            <Box>
                <Typography
                    variant="h2"
                    sx={{
                        marginY: '1.5rem !important',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Registro de nuevo negocio Sección Direcciones: Dirección Residencial del contribuyente (Natural u Organización)
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Dirección 1" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Dirección 1"
                                name="taxpayerhome_address_line1"
                                variant="outlined"
                                value={formik.values.taxpayerhome_address_line1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerhome_address_line1 && Boolean(formik.errors.taxpayerhome_address_line1)}
                                helperText={formik.touched.taxpayerhome_address_line1 && formik.errors.taxpayerhome_address_line1}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Dirección 2" />
                        <FormControl fullWidth margin="normal">
                            <TextField
                                placeholder="Dirección 2"
                                name="taxpayerhome_address_line2"
                                variant="outlined"
                                value={formik.values.taxpayerhome_address_line2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerhome_address_line2 && Boolean(formik.errors.taxpayerhome_address_line2)}
                                helperText={formik.touched.taxpayerhome_address_line2 && formik.errors.taxpayerhome_address_line2}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Número de Propiedad" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Número de Propiedad"
                                name="taxpayerhome_address_number"
                                variant="outlined"
                                value={formik.values.taxpayerhome_address_number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerhome_address_number && Boolean(formik.errors.taxpayerhome_address_number)}
                                helperText={formik.touched.taxpayerhome_address_number && formik.errors.taxpayerhome_address_number}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="País" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="País"
                                name="taxpayerhome_address_country"
                                variant="outlined"
                                value={formik.values.taxpayerhome_address_country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerhome_address_country && Boolean(formik.errors.taxpayerhome_address_country)}
                                helperText={formik.touched.taxpayerhome_address_country && formik.errors.taxpayerhome_address_country}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Estado" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Estado"
                                name="taxpayerhome_address_state"
                                variant="outlined"
                                value={formik.values.taxpayerhome_address_state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerhome_address_state && Boolean(formik.errors.taxpayerhome_address_state)}
                                helperText={formik.touched.taxpayerhome_address_state && formik.errors.taxpayerhome_address_state}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Ciudad/Condado" />
                        <FormControl fullWidth margin="normal">
                            <TextField
                                placeholder="Ciudad/Condado"
                                name="taxpayerhome_address_city"
                                variant="outlined"
                                value={formik.values.taxpayerhome_address_city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerhome_address_city && Boolean(formik.errors.taxpayerhome_address_city)}
                                helperText={formik.touched.taxpayerhome_address_city && formik.errors.taxpayerhome_address_city}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Código Postal" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Código Postal"
                                name="taxpayerhome_address_zipcode"
                                variant="outlined"
                                value={formik.values.taxpayerhome_address_zipcode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerhome_address_zipcode && Boolean(formik.errors.taxpayerhome_address_zipcode)}
                                helperText={formik.touched.taxpayerhome_address_zipcode && formik.errors.taxpayerhome_address_zipcode}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {/* Sección: Dirección de Oficina del Contribuyente */}
            <Box>
                <Typography
                    variant="h2"
                    sx={{
                        marginY: '1.5rem !important',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Registro de nuevo negocio Sección Direcciones: Dirección de Oficina del contribuyente (Natural u Organización)
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Dirección 1" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Dirección 1"
                                name="taxpayerwork_address_line1"
                                variant="outlined"
                                value={formik.values.taxpayerwork_address_line1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerwork_address_line1 && Boolean(formik.errors.taxpayerwork_address_line1)}
                                helperText={formik.touched.taxpayerwork_address_line1 && formik.errors.taxpayerwork_address_line1}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Dirección 2" />
                        <FormControl fullWidth margin="normal">
                            <TextField
                                placeholder="Dirección 2"
                                name="taxpayerwork_address_line2"
                                variant="outlined"
                                value={formik.values.taxpayerwork_address_line2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerwork_address_line2 && Boolean(formik.errors.taxpayerwork_address_line2)}
                                helperText={formik.touched.taxpayerwork_address_line2 && formik.errors.taxpayerwork_address_line2}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Número de Propiedad" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Número de Propiedad"
                                name="taxpayerwork_address_number"
                                variant="outlined"
                                value={formik.values.taxpayerwork_address_number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerwork_address_number && Boolean(formik.errors.taxpayerwork_address_number)}
                                helperText={formik.touched.taxpayerwork_address_number && formik.errors.taxpayerwork_address_number}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="País" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="País"
                                name="taxpayerwork_address_country"
                                variant="outlined"
                                value={formik.values.taxpayerwork_address_country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerwork_address_country && Boolean(formik.errors.taxpayerwork_address_country)}
                                helperText={formik.touched.taxpayerwork_address_country && formik.errors.taxpayerwork_address_country}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Estado" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Estado"
                                name="taxpayerwork_address_state"
                                variant="outlined"
                                value={formik.values.taxpayerwork_address_state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerwork_address_state && Boolean(formik.errors.taxpayerwork_address_state)}
                                helperText={formik.touched.taxpayerwork_address_state && formik.errors.taxpayerwork_address_state}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Ciudad/Condado" />
                        <FormControl fullWidth margin="normal">
                            <TextField
                                placeholder="Ciudad/Condado"
                                name="taxpayerwork_address_city"
                                variant="outlined"
                                value={formik.values.taxpayerwork_address_city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerwork_address_city && Boolean(formik.errors.taxpayerwork_address_city)}
                                helperText={formik.touched.taxpayerwork_address_city && formik.errors.taxpayerwork_address_city}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Código Postal" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Código Postal"
                                name="taxpayerwork_address_zipcode"
                                variant="outlined"
                                value={formik.values.taxpayerwork_address_zipcode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.taxpayerwork_address_zipcode && Boolean(formik.errors.taxpayerwork_address_zipcode)}
                                helperText={formik.touched.taxpayerwork_address_zipcode && formik.errors.taxpayerwork_address_zipcode}
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

export default StepForm3;
