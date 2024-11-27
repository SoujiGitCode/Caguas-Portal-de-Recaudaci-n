import React, { FC, ReactNode } from 'react';
import { Box, Stepper, Step, StepLabel, styled, StepConnector } from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';

interface StepIconProps {
    active?: boolean;
    completed?: boolean;
    error?: boolean;
    icon: React.ReactNode;
}

const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`& .MuiStepConnector-line`]: {
        position: 'relative',
        height: 3,
        backgroundColor: theme.palette.mode === 'dark' ? '#eaeaf0' : '#eaeaf0',
        borderRadius: 3,
        marginTop: -1.5,
        overflow: 'hidden',
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 0,
            height: '100%',
            backgroundColor: theme.palette.primary.main,
            transition: 'width 0.5s ease',
        },
    },
    [`&.${stepConnectorClasses.active} .MuiStepConnector-line::after`]: {
        width: '100%',
    },
    [`&.${stepConnectorClasses.completed} .MuiStepConnector-line::after`]: {
        width: '100%',
        backgroundColor: theme.palette.success.main,
    },
}));

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

const CustomStepIcon: FC<StepIconProps> = ({ active, completed, icon }) => {
    return (
        <CustomStepIconRoot
            className={`${active ? 'active' : ''} ${completed ? 'completed' : 'future'}`}
        >
            {icon}
        </CustomStepIconRoot>
    );
};

interface CustomStepperProps {
    isMobile: boolean,
    steps: { label: string; icon: ReactNode }[];
    activeStep: number;
    stepValidity: boolean[];
    onStepClick?: (index: number) => void;
}

const CustomStepper: FC<CustomStepperProps> = ({
    isMobile,
    steps,
    activeStep,
    stepValidity,
    onStepClick,
}) => {
    return (
        <Stepper
            activeStep={activeStep}
            connector={<CustomConnector />}
            alternativeLabel={!isMobile}
            orientation={isMobile ? 'vertical' : 'horizontal'}
            sx={{
                '& .MuiStep-root': {
                    cursor: 'pointer',
                },
            }}
        >
            {steps.map((step, index) => {
                if (isMobile && activeStep !== index) {
                    // Renderiza solo el paso activo en mobile
                    return null;
                }

                return (
                    <Step key={index}>
                        <StepLabel
                            StepIconComponent={() => (
                                <CustomStepIcon
                                    active={activeStep === index}
                                    completed={stepValidity[index]}
                                    icon={step.icon}
                                />
                            )}
                            onClick={() => onStepClick && stepValidity[index] && onStepClick(index)}
                            sx={(theme) => ({
                                [theme.breakpoints.down('md')]: {
                                    justifyContent: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                    '& .MuiStepLabel-label': {
                                        marginTop: '1rem !important',
                                        fontSize: '1.2rem',
                                    },
                                },
                                '& .MuiStepLabel-label': {
                                    fontSize: '0.8rem',
                                    color: stepValidity[index]
                                        ? theme.palette.text.primary
                                        : 'rgba(0, 0, 0, 0.4)',
                                },
                            })}
                        >
                            {step.label}
                        </StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
};
