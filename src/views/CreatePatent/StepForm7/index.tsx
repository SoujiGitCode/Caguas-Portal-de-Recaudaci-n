import { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, FormControl, TextField } from '@mui/material';
import { submitPatentRequest, getPatentData, StepForm7Request } from '@/views/CreatePatent/functions';
import { StepFormProps } from '@/views/CreatePatent/functions';
import SimpleLoader from '@/components/SimpleLoader';
import { patent } from '@/utils';
import { CustomLabel, PatentDataTable } from '@/components';
import { useFormik } from 'formik';
import { Step7Validation } from './Step7Validations';
import useFormikValidation from '@/hooks/useFormikValidation';
import ConfirmationDialog from '../ConfirmationDialog';

const StepForm7 = ({ handleNext, handleBack, isLastStep, token, isMobile }: StepFormProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [patentData, setPatentData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(null);

    const initialFormData = {
        patent_id: patentData?.id || '',
        signature_date: '',
        signature_time: '',
        signature_location: '',
        signature_first_name: '',
        signature_last_name: '',
        signature: '',
        owner_info_social_security: '',
        token: token
    };

    const formik = useFormik<StepForm7Request>({
        validateOnMount: true,
        initialValues: { ...initialFormData, ...patentData, token },
        enableReinitialize: true, // Reinitialize if `patentData` changes after loading
        validationSchema: Step7Validation,
        onSubmit: async (values) => {
            try {
                console.log('patent data')
                console.log(patentData)

                setLoading(true)
                const response = await submitPatentRequest(values);
                if (response.code === 200) {
                    // Si la solicitud fue exitosa, limpiamos el mensaje de error (si había) y pasamos al siguiente paso
                    setErrorMessage(null);
                    setTimeout(() => {
                        setLoading(false)
                    }, 400)
                    handleNext();
                } else {
                    setLoading(false)
                    // Si hay algún código diferente, establecemos un mensaje de error
                    setErrorMessage('Hubo un problema al procesar la solicitud. Intente nuevamente.');
                }
            } catch (error) {
                setLoading(false)
                // En caso de error en la solicitud, mostramos un mensaje de error
                setErrorMessage('Error en el servidor. Intente nuevamente más tarde.');
            }
        },
    });


    useEffect(() => {
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
        fetchPatentData();

    }, [token]);

    const handleRegisterClick = () => {
        setOpenConfirm(true);
    };

    const handleDialogClose = () => {
        setOpenConfirm(false);
    };

    const validateCredentials = async (): Promise<boolean> => {
        // Simula una llamada a un endpoint
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true); // Retorna true siempre por ahora
            }, 1000);
        });
    };

    const handleConfirmSubmit = async () => {
        setOpenConfirm(false); // Cierra el diálogo de confirmación
        await formik.submitForm(); // Llama al onSubmit de Formik
    };

    useFormikValidation(formik);

    if (loading) {
        return <SimpleLoader />;
    }

    return (
        <Box
            sx={{
                maxWidth: "100%",
                textAlign: "center",
            }}
        >
            {submissionSuccess === true && (
                <Box sx={{ marginBottom: "2rem", backgroundColor: "#d4edda", padding: "1rem", borderRadius: "8px" }}>
                    <Typography sx={{ color: "#155724", fontWeight: "bold" }}>
                        ¡Registro exitoso!
                    </Typography>
                    <Typography sx={{ color: "#155724" }}>
                        La patente ha sido registrada correctamente.
                    </Typography>
                </Box>
            )}
            {submissionSuccess === false && (
                <Box sx={{ marginBottom: "2rem", backgroundColor: "#f8d7da", padding: "1rem", borderRadius: "8px" }}>
                    <Typography sx={{ color: "#721c24", fontWeight: "bold" }}>
                        Error en el registro
                    </Typography>
                    <Typography sx={{ color: "#721c24" }}>
                        Hubo un problema al registrar la patente. Por favor, inténtelo de nuevo.
                    </Typography>
                </Box>
            )}


            {submissionSuccess === null &&
                <>
                    <PatentDataTable data={patentData} isMobile={isMobile} />

                    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                        <Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    marginY: "1rem !important",
                                    fontSize: "1rem",
                                    textAlign: "center",
                                }}
                            >
                                Sección Firma
                            </Typography>
                            <Grid container spacing={0}>
                                <Grid item xs={12} lg={4} sx={{ paddingX: "1rem" }}>
                                    <CustomLabel name="Fecha" />
                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                            type="date"
                                            name="signature_date"
                                            variant="outlined"
                                            value={formik.values.signature_date}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.signature_date &&
                                                Boolean(formik.errors.signature_date)
                                            }
                                            helperText={
                                                formik.touched.signature_date &&
                                                formik.errors.signature_date
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} lg={4} sx={{ paddingX: "1rem" }}>
                                    <CustomLabel name="Hora" />
                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                            type="time"
                                            name="signature_time"
                                            variant="outlined"
                                            value={formik.values.signature_time}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.signature_time &&
                                                Boolean(formik.errors.signature_time)
                                            }
                                            helperText={
                                                formik.touched.signature_time &&
                                                formik.errors.signature_time
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} lg={4} sx={{ paddingX: "1rem" }}>
                                    <CustomLabel name="Ubicación" />
                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                            placeholder="Ubicación"
                                            name="signature_location"
                                            variant="outlined"
                                            value={formik.values.signature_location}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.signature_location &&
                                                Boolean(formik.errors.signature_location)
                                            }
                                            helperText={
                                                formik.touched.signature_location &&
                                                formik.errors.signature_location
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} lg={4} sx={{ paddingX: "1rem" }}>
                                    <CustomLabel name="Primer Nombre" />
                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                            placeholder="Primer Nombre"
                                            name="signature_first_name"
                                            variant="outlined"
                                            value={formik.values.signature_first_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.signature_first_name &&
                                                Boolean(formik.errors.signature_first_name)
                                            }
                                            helperText={
                                                formik.touched.signature_first_name &&
                                                formik.errors.signature_first_name
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} lg={4} sx={{ paddingX: "1rem" }}>
                                    <CustomLabel name="Apellido" />
                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                            placeholder="Apellido"
                                            name="signature_last_name"
                                            variant="outlined"
                                            value={formik.values.signature_last_name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.signature_last_name &&
                                                Boolean(formik.errors.signature_last_name)
                                            }
                                            helperText={
                                                formik.touched.signature_last_name &&
                                                formik.errors.signature_last_name
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} lg={4} sx={{ paddingX: "1rem" }}>
                                    <CustomLabel name="Firma" />
                                    <FormControl fullWidth margin="normal">
                                        <TextField
                                            placeholder="Firma"
                                            name="signature"
                                            variant="outlined"
                                            value={formik.values.signature}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.signature &&
                                                Boolean(formik.errors.signature)
                                            }
                                            helperText={
                                                formik.touched.signature &&
                                                formik.errors.signature
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>

                    </form>

                    <Typography
                        sx={{
                            fontFamily: "GothamMedium",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#333",
                            marginTop: "3rem !important",
                            marginBottom: '1.5rem !important'
                        }}
                    >
                        Confirmación de Registro de Patente!
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "1rem",
                            color: "#666",
                            marginBottom: "2rem",
                        }}
                    >
                        Por favor, asegúrese de que toda la información ingresada es correcta antes de registrar la patente.
                    </Typography>

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
                            disabled={!formik.isValid}
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
                            onClick={handleRegisterClick}
                        >
                            Enviar
                        </Button>
                    </Box>

                </>


            }
            <ConfirmationDialog
                open={openConfirm}
                onClose={handleDialogClose}
                // onSubmit={validateCredentials}
                onConfirm={handleConfirmSubmit}
                isMobile={isMobile}
            />
        </Box>
    );
};

export default StepForm7;
