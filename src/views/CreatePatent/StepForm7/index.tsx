import { useState, useEffect } from 'react';
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { submitPatentRequest, getPatentData } from '@/views/CreatePatent/functions';
import { StepFormProps } from '@/views/CreatePatent/functions';
import SimpleLoader from '@/components/SimpleLoader';
import { patent } from '@/utils';

const StepForm7 = ({ handleNext, handleBack, isLastStep, token, isMobile }: StepFormProps) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [patentId, setPatentId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchPatentId = async () => {
            try {
                const patentData = await getPatentData(token);
                if (patentData && patentData.data && patentData.data.id) {
                    setPatentId(patentData.data.id);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching patent data:", error);
            }
        };

        fetchPatentId();
    }, [token]);

    const handleRegisterClick = () => {
        setOpenConfirm(true);
    };

    const handleConfirmClose = () => {
        setOpenConfirm(false);
    };

    const handleConfirmSubmit = async () => {
        setOpenConfirm(false);
        setLoading(true);
        setSubmissionSuccess(null);

        if (patentId) {
            try {
                // Pasar un objeto con `patent_id` y `token` como lo espera `submitPatent`
                await submitPatentRequest(patentId, token);
                setSubmissionSuccess(true);
            } catch (error) {
                setSubmissionSuccess(false);
                console.error("Error submitting patent:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <SimpleLoader />;
    }

    return (
        <Box
            sx={{
                padding: "2rem",
                maxWidth: "800px",
                margin: "2rem auto",
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
                    <Typography
                        sx={{
                            fontFamily: "GothamMedium",
                            fontSize: "1.4rem",
                            fontWeight: "bold",
                            color: "#333",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Confirmación de Registro de Patente
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

            <Dialog
                open={openConfirm}
                onClose={handleConfirmClose}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
            >
                <DialogTitle id="confirm-dialog-title">Confirmación de Envío</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">
                        ¿Está seguro que desea enviar la patente? No podrá hacer cambios una vez enviada.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
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
                        onClick={handleConfirmClose}>
                        Cancelar
                    </Button>
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
                        onClick={handleConfirmSubmit}
                        autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default StepForm7;
