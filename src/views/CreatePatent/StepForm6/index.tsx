import { useEffect, useState } from 'react';
import { Grid, Typography, Button, Box, CircularProgress } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import { uploadPatentFiles, getPatentData, getPatentFiles, makeStepAvailable } from '@/views/CreatePatent/functions';
import { StepFormProps } from '@/views/CreatePatent/functions';

interface DocumentData {
    id: string;
    title: string;
    required: string;
    upload: string;
}


const StepForm6 = ({ handleNext, handleBack, isLastStep, token, isMobile, setStepValidity, currentStep }: StepFormProps) => {
    const [documents, setDocuments] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [patentId, setPatentId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPatentData = async () => {
            try {
                const patentData = await getPatentData(token);
                if (patentData && patentData.data && patentData.data.id) {
                    const patentId = patentData.data.id;
                    setPatentId(patentId);
                    await fetchPatentFiles(patentId);
                }
            } catch (error) {
                console.error("Error fetching patent data:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPatentFiles = async (patentId: string) => {
            try {
                const patentFilesData = await getPatentFiles(token, patentId);
                if (patentFilesData && patentFilesData.data) {
                    setDocuments(patentFilesData.data);
                }
            } catch (error) {
                console.error("Error fetching patent files:", error);
            }
        };

        fetchPatentData();
    }, [token]);

    const handleFileUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        if (event.target.files && patentId) {
            const file = event.target.files[0];
            try {
                await uploadPatentFiles({
                    document: file,
                    patent_id: patentId,
                    file_id: documents[index].id,
                    token,
                });
                setDocuments((prevDocuments) =>
                    prevDocuments.map((doc, i) =>
                        i === index ? { ...doc, upload: "1" } : doc
                    )
                );
            } catch (error: any) {
                if (error?.message) {
                    setError("Extension not allowed, please choose a PNG, PDF, JPG, or DOC file.");
                } else {
                    console.error("Error uploading file:", error);
                }
            }
        }
    };

    if (loading) {
        return <CircularProgress />;
    }


    useEffect(() => {
        makeStepAvailable(currentStep, setStepValidity);
    }, [])
    return (
        <Box sx={{ padding: "1.5rem", marginBottom: "2rem" }}>
            <Typography
                sx={{
                    fontFamily: "GothamMedium",
                    fontSize: isMobile ? "1rem" : "1.2rem",
                    fontWeight: "bolder",
                    marginBottom: "1rem",
                }}
            >
                Subir Archivos (4 Documentos Fijos)
            </Typography>

            <Grid container spacing={2}>
                {documents.map((doc, index) => (
                    <Grid container item xs={12} key={doc.id} sx={{
                        padding: "1rem",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        marginBottom: "0.5rem",
                        alignItems: "center",
                        backgroundColor: "transparent",
                    }}>
                        <Grid item xs={6} md={6}>
                            <Typography sx={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                                {doc.title} {doc.required === "1" && "*"}
                            </Typography>
                        </Grid>
                        <Grid item xs={3} md={2} sx={{ textAlign: 'center' }}>
                            <Button
                                component="label"
                                sx={{
                                    minWidth: "16px",
                                    padding: "0px",
                                }}
                                startIcon={<UploadIcon sx={{ color: "#f7941d", fontSize: "24px" }} />}
                            >
                                <input
                                    type="file"
                                    accept=".png,.pdf,.jpg,.doc"
                                    hidden
                                    onChange={(e) => handleFileUpload(index, e)}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={3} md={2} sx={{ textAlign: 'center' }}>
                            {doc.upload === "1" ? (
                                <>
                                    <VisibilityIcon sx={{ color: "#f7941d", cursor: "pointer", fontSize: "24px" }} />
                                    <CheckIcon sx={{ color: "#f7941d", fontSize: "24px", marginLeft: "8px" }} />
                                </>
                            ) : (
                                <Typography sx={{ fontSize: "0.8rem", color: "#ccc" }}>
                                    Sin Archivo
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={3} md={2} sx={{ textAlign: 'center' }}>
                            <Button
                                sx={{
                                    minWidth: "16px",
                                    padding: "0px",
                                }}
                                startIcon={<DeleteIcon sx={{ color: "red", fontSize: "24px", cursor: "pointer" }} />}
                            />
                        </Grid>
                        {index === 0 && error && (
                            <Grid item xs={12} sx={{ textAlign: "center", marginTop: "0.5rem" }}>
                                <Typography sx={{ color: "red", fontSize: "0.9rem" }}>
                                    {error}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                ))}
            </Grid>

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
                    onClick={handleNext}
                >
                    {isLastStep ? 'Enviar Solicitud' : 'Siguiente'}
                </Button>
            </Box>
        </Box>
    );
};

export default StepForm6;
