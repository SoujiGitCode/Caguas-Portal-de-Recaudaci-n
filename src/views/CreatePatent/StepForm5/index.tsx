import { useState, useEffect } from 'react';
import { Box, Grid, Typography, FormControl, TextField, Button, InputLabel, MenuItem, styled } from '@mui/material';
import { useFormik } from 'formik';
import { makeStepAvailable, StepFormProps } from '@/views/CreatePatent/functions';
import { registerPatentPage5, getPatentData } from '@/views/CreatePatent/functions';
import { Step5Validation } from './Step5Validation';
import { CustomLabel } from '@/components';
import SimpleLoader from '@/components/SimpleLoader';
import useFormikValidation from '@/hooks/useFormikValidation'


// Estilo del TextareaAutosize
const TextareaAutosize = styled('textarea')(({ theme }) => `
    box-sizing: border-box;
    width: 100%; // Asegura que ocupe el ancho completo del contenedor
    font-family: 'Roboto', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? '#E0E0E0' : '#333'};
    background: ${theme.palette.mode === 'dark' ? '#333' : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? '#555' : '#ccc'};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? '#000' : '#f4f4f4'};

        &:hover {
        border-color: ${theme.palette.primary.main};
        }

        &:focus {
        border-color: ${theme.palette.primary.main};
        box-shadow: 0 0 0 3px ${theme.palette.primary.light};
        }

        // Elimina el borde extra en Firefox
        &:focus-visible {
        outline: 0;
        }

        // Desactiva el resize manual
        resize: none;
        `);


const StepForm5 = ({ handleNext, handleBack, isLastStep, token, isMobile, setStepValidity, currentStep }: StepFormProps) => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [patentData, setPatentData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const initialFormData = {
        business_info_startup_date: '',
        business_info_location_name: '',
        business_info_industry: '',
        business_info_activity: '',
        business_info_register_number: '',
        business_info_register_number_expiration_date: '',
        business_info_withholding_agent: '',
        business_info_employees: '',
        business_info_total_annual_labor_costs: '',
        business_info_cadastral_reference_number: '',
        business_info_require_permit_use: '',
        business_info_permit_use_number: '',
        business_info_permit_use_number_expiration_date: '',
        business_info_permit_use_number_description: '',
        token: token
    };

    const formik = useFormik({
        validateOnMount: true,
        initialValues: { ...initialFormData, ...patentData, token },
        enableReinitialize: true,
        validationSchema: Step5Validation,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                const response = await registerPatentPage5(values);
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
        <form onSubmit={formik.handleSubmit} style={{ width: 'auto' }}>
            {errorMessage && (
                <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                    {errorMessage}
                </Typography>
            )}

            {/* Sección: Información del Negocio */}
            <Box>
                <Typography
                    variant="h2"
                    sx={{
                        marginY: '1rem !important',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        textAlign: isMobile ? 'center' : 'left',
                    }}
                >
                    Registro de nuevo negocio Sección Información del Negocio
                </Typography>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Fecha de comienzo de operaciones" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Fecha de comienzo de operaciones"
                                name="business_info_startup_date"
                                variant="outlined"
                                value={formik.values.business_info_startup_date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_startup_date && Boolean(formik.errors.business_info_startup_date)}
                                helperText={formik.touched.business_info_startup_date && formik.errors.business_info_startup_date}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Nombre de la localidad (Según Registro de Comerciante)" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Nombre de la localidad"
                                name="business_info_location_name"
                                variant="outlined"
                                value={formik.values.business_info_location_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_location_name && Boolean(formik.errors.business_info_location_name)}
                                helperText={formik.touched.business_info_location_name && formik.errors.business_info_location_name}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Clase de Industria (Código Naics)" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Clase de Industria"
                                name="business_info_industry"
                                variant="outlined"
                                value={formik.values.business_info_industry}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_industry && Boolean(formik.errors.business_info_industry)}
                                helperText={formik.touched.business_info_industry && formik.errors.business_info_industry}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Actividad del Negocio" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Actividad del Negocio"
                                name="business_info_activity"
                                variant="outlined"
                                value={formik.values.business_info_activity}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_activity && Boolean(formik.errors.business_info_activity)}
                                helperText={formik.touched.business_info_activity && formik.errors.business_info_activity}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Número de Registro de Comerciante" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Número de Registro de Comerciante"
                                name="business_info_register_number"
                                variant="outlined"
                                value={formik.values.business_info_register_number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_register_number && Boolean(formik.errors.business_info_register_number)}
                                helperText={formik.touched.business_info_register_number && formik.errors.business_info_register_number}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Fecha de vencimiento del Registro de Comerciante" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Fecha de vencimiento"
                                name="business_info_register_number_expiration_date"
                                variant="outlined"
                                value={formik.values.business_info_register_number_expiration_date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_register_number_expiration_date && Boolean(formik.errors.business_info_register_number_expiration_date)}
                                helperText={formik.touched.business_info_register_number_expiration_date && formik.errors.business_info_register_number_expiration_date}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="¿Es agente de retención?" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                select
                                placeholder="¿Es agente de retención?"
                                name="business_info_withholding_agent"
                                variant="outlined"
                                value={formik.values.business_info_withholding_agent}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_withholding_agent && Boolean(formik.errors.business_info_withholding_agent)}
                                helperText={formik.touched.business_info_withholding_agent && formik.errors.business_info_withholding_agent}
                            >
                                <MenuItem value="0">No</MenuItem>
                                <MenuItem value="1">Sí</MenuItem>
                            </TextField>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Cantidad de empleados" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Cantidad de empleados"
                                name="business_info_employees"
                                variant="outlined"
                                value={formik.values.business_info_employees}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_employees && Boolean(formik.errors.business_info_employees)}
                                helperText={formik.touched.business_info_employees && formik.errors.business_info_employees}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Costo anual de nómina" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Costo anual de nómina"
                                name="business_info_total_annual_labor_costs"
                                variant="outlined"
                                value={formik.values.business_info_total_annual_labor_costs}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_total_annual_labor_costs && Boolean(formik.errors.business_info_total_annual_labor_costs)}
                                helperText={formik.touched.business_info_total_annual_labor_costs && formik.errors.business_info_total_annual_labor_costs}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Número de Catastro (Si aplica)" />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Número de Catastro"
                                name="business_info_cadastral_reference_number"
                                variant="outlined"
                                value={formik.values.business_info_cadastral_reference_number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_cadastral_reference_number && Boolean(formik.errors.business_info_cadastral_reference_number)}
                                helperText={formik.touched.business_info_cadastral_reference_number && formik.errors.business_info_cadastral_reference_number}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="¿Requiere Permiso de Uso?" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                select
                                placeholder="¿Requiere Permiso de Uso?"
                                name="business_info_require_permit_use"
                                variant="outlined"
                                value={formik.values.business_info_require_permit_use}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_require_permit_use && Boolean(formik.errors.business_info_require_permit_use)}
                                helperText={formik.touched.business_info_require_permit_use && formik.errors.business_info_require_permit_use}
                            >
                                <MenuItem value="0">No</MenuItem>
                                <MenuItem value="1">Sí</MenuItem>
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Número del Permiso de Uso" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Número del Permiso de Uso"
                                name="business_info_permit_use_number"
                                variant="outlined"
                                value={formik.values.business_info_permit_use_number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_permit_use_number && Boolean(formik.errors.business_info_permit_use_number)}
                                helperText={formik.touched.business_info_permit_use_number && formik.errors.business_info_permit_use_number}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Fecha de vencimiento del Permiso de Uso" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextField
                                placeholder="Fecha de vencimiento"
                                name="business_info_permit_use_number_expiration_date"
                                variant="outlined"
                                value={formik.values.business_info_permit_use_number_expiration_date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.business_info_permit_use_number_expiration_date && Boolean(formik.errors.business_info_permit_use_number_expiration_date)}
                                helperText={formik.touched.business_info_permit_use_number_expiration_date && formik.errors.business_info_permit_use_number_expiration_date}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={4} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Descripción del Permiso de Uso (80 Caracteres)" required />
                        <FormControl fullWidth margin="normal" required>
                            <TextareaAutosize
                                name="business_info_permit_use_number_description"
                                value={formik.values.business_info_permit_use_number_description}
                                onChange={(event) => {
                                    const value = event.target.value.slice(0, 80); // Limitar caracteres
                                    formik.setFieldValue('business_info_permit_use_number_description', value); // Actualizar Formik
                                }}
                                onBlur={formik.handleBlur}
                                placeholder="Describe el permiso de uso aquí..."
                                rows={3}
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ccc',
                                    fontSize: '0.875rem',
                                    resize: 'none',
                                }}
                            />
                            {formik.touched.business_info_permit_use_number_description &&
                                typeof formik.errors.business_info_permit_use_number_description === 'string' && (
                                    <Typography color="error" variant="body2">
                                        {formik.errors.business_info_permit_use_number_description}
                                    </Typography>
                                )}
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

export default StepForm5;
