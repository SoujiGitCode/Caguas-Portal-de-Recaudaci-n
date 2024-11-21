import { useState, memo } from 'react';
import { Box, Stepper, Step, StepLabel, Paper, Typography, Button, useTheme, useMediaQuery, StepConnector, styled, stepConnectorClasses } from '@mui/material';
import StepForm1 from './StepForm1';
import StepForm2 from './StepForm2';
import StepForm3 from './StepForm3';
import StepForm4 from './StepForm4';
import StepForm5 from './StepForm5';
import StepForm6 from './StepForm6';
import StepForm7 from './StepForm7';
import useAuthStore from "@/hooks/useAuthStore";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BusinessIcon from '@mui/icons-material/Business';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DoneIcon from '@mui/icons-material/Done';
import React from 'react';

const steps = [
    { label: 'Datos Generales', Component: memo(StepForm1), icon: <AccountBoxIcon /> },
    { label: 'Dirección Postal y Física', Component: memo(StepForm2), icon: <HomeIcon /> },
    { label: 'Dirección Contribuyente', Component: memo(StepForm3), icon: <AssignmentIndIcon /> },
    { label: 'Información Dueños y Representante', Component: memo(StepForm4), icon: <BusinessIcon /> },
    { label: 'Información Negocio', Component: memo(StepForm5), icon: <BusinessIcon /> },
    { label: 'Documentos', Component: memo(StepForm6), icon: <AttachFileIcon /> },
    { label: 'Enviar', Component: memo(StepForm7), icon: <DoneIcon /> },
];

// Custom Connector for styling
const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`& .MuiStepConnector-line`]: {
        position: 'relative',
        height: 3, // Altura de la línea
        backgroundColor: theme.palette.mode === 'dark' ? '#eaeaf0' : '#eaeaf0',
        borderRadius: 3, // Redondea los bordes de la línea
        marginTop: -1.5, // Centra la línea verticalmente respecto a los círculos
        overflow: 'hidden',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0, // Comienza vacío
            height: '100%',
            backgroundColor: theme.palette.primary.main,
            transition: 'width 0.5s ease', // Efecto de llenado progresivo
        },
    },
    [`&.${stepConnectorClasses.active} .MuiStepConnector-line::after`]: {
        width: '100%', // Llena completamente la línea
    },
    [`&.${stepConnectorClasses.completed} .MuiStepConnector-line::after`]: {
        width: '100%', // Llena completamente la línea
        backgroundColor: theme.palette.success.main, // Diferente color para completado
    },
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22, // Ajuste general para centrado en desktop
    },
    [`&.${stepConnectorClasses.alternativeLabel} .MuiStepConnector-line`]: {
        marginTop: 0, // Corrige el centrado para diseño alternativo
    },
}));



// Custom Step Icon
const CustomStepIconRoot = styled('div')(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    '&.active': {
        backgroundImage: 'linear-gradient(136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    '&.completed': {
        backgroundImage: 'linear-gradient(136deg, rgb(153,204,50) 0%, rgb(76,175,80) 50%, rgb(34,139,34) 100%)',
    },
    '&.future': {
        backgroundColor: '#eaeaf0',
        color: '#9e9e9e',
    },
}));


function CustomStepIcon({
    icon,
    active,
    completed,
    index,
    activeStep,
}: {
    icon: React.ReactNode;
    active: boolean;
    completed: boolean;
    index: number;
    activeStep: number;
}) {
    const isPastStep = index < activeStep; // Pasos previos al actual
    const isActiveStep = index === activeStep; // Paso actual
    const isFutureStep = index > activeStep; // Pasos futuros

    return (
        <CustomStepIconRoot
            className={`${isActiveStep ? 'active' : ''} ${isPastStep && completed ? 'completed' : ''
                } ${isFutureStep ? 'future' : ''}`}
        >
            {icon}
        </CustomStepIconRoot>
    );
}

export default function CreatePatent() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const token = useAuthStore((state: any) => state.token);

    const [activeStep, setActiveStep] = useState(0);
    const [stepValidity, setStepValidity] = useState<boolean[]>(Array(steps.length).fill(false)); // Initialize all as invalid

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setStepValidity(Array(steps.length).fill(false)); // Reset validity
    };

    const handleStepClick = (index: number) => {
        if (stepValidity.slice(0, index).every((isValid) => isValid)) {
            setActiveStep(index);
        }
    };

    const StepComponent = steps[activeStep]?.Component;


    return (
        <Box sx={{ width: '100%', paddingX: '2rem !important' }}>
            {/* Stepper Labels */}
            <Stepper
                activeStep={activeStep}
                alternativeLabel={!isMobile}
                orientation={isMobile ? 'vertical' : 'horizontal'}
                connector={<CustomConnector />}
                sx={{
                    '& .MuiStep-root': {
                        cursor: 'pointer',
                    },
                    marginY: '2rem !important',
                }}
            >
                {steps.map((step, index) => {
                    if (isMobile && activeStep !== index) {
                        // Solo renderizar el paso activo en mobile
                        return null;
                    }

                    return (
                        <Step key={index}>
                            <StepLabel
                                StepIconComponent={() =>
                                    <CustomStepIcon
                                        icon={step.icon}
                                        active={activeStep === index}
                                        completed={stepValidity[index]}
                                        index={index}
                                        activeStep={activeStep}
                                    />
                                }
                                sx={{
                                    cursor: stepValidity[index] ? 'pointer !important' : 'not-allowed !important',
                                    '& .MuiStepLabel-label': {
                                        color: stepValidity[index] ? 'inherit' : 'rgba(0, 0, 0, 0.38)',
                                    },
                                }}
                                onClick={() => {
                                    if (stepValidity[index]) {
                                        handleStepClick(index);
                                    }
                                }}
                            >
                                {step.label}
                            </StepLabel>
                        </Step>
                    );
                })}

            </Stepper>

            {/* Step Content */}
            {activeStep < steps.length && StepComponent && (
                <Box
                    sx={{
                        mt: 4,
                        minHeight: '110dvh'
                    }}
                >
                    <StepComponent
                        token={token}
                        handleNext={handleNext}
                        handleBack={activeStep === 0 ? null : handleBack}
                        isLastStep={activeStep === steps.length - 1}
                        isMobile={isMobile}
                        setStepValidity={setStepValidity}
                        currentStep={activeStep}
                    />
                </Box>
            )}


            {/* Final Message */}
            {activeStep === steps.length && (
                <Paper
                    square
                    elevation={0}
                    sx={{ p: 3, mt: 2, textAlign: 'center', background: '#f9f9f9' }}
                >
                    <Typography>Todos los pasos completados - ¡Has terminado!</Typography>
                </Paper>
            )}
        </Box>
    );
}
