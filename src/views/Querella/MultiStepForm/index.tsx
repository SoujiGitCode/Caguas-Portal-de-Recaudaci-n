import React, { useEffect, useState } from 'react';
import Step1 from './step1';
import Step2 from './step2';

import { Box, Button, Grid } from '@mui/material';
import { CreateRequest } from '../functions';
import useAlert from "@/hooks/useAlert";
import useAuthStore from "@/hooks/useAuthStore";
import { PATH } from '@/routes/constants';
import { ConfirmationModal } from '@/components';
import { useNavigate } from 'react-router-dom';



interface FormData {
    complainant_name: string;
    complainant_phone: string;
    complainant_address: string;
    complainant_email: string;

    defendant_name: string;
    defendant_phone: string;
    defendant_address: string;
    defendant_email: string;

    case_number: string;
    topic: string;
    license_issued_number: string;
    event_date: string;
    event_place: string;
    complaint_date: string;
    reject_comment: string;
    witness_1: string;
    witness_2: string;
    witness_3: string;
    witness_4: string;

    token: string

}


interface MultiStepFormProps {
    onBack: () => void;
    currentStep: number;
    changeStep: (step: number) => void;
    isStepValid: boolean;
    setStepValid: (valid: boolean) => void;
    formData: FormData;
    updateFormData: (data: Partial<FormData>, reset: boolean) => void;
    isAuthenticated: boolean;
}



const MultiStepForm = ({
    onBack,
    currentStep,
    changeStep,
    isStepValid,
    setStepValid,
    formData,
    updateFormData,
    isAuthenticated
}: MultiStepFormProps) => {

    const { setAlert } = useAlert();
    const [onSendingData, setOnSendingData] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<'error' | 'success'>('error');
    const [termsandConditionsCheckBox, seetTermsandConditionsCheckBox] = useState(false);

    const customContent = {
        success: {
            title: "Solicitud enviada",
            text: (
                <>
                    Próximamente recibirá un correo electrónico relacionado al proceso de su solicitud.
                </>
            )
        },
        error: {
            title: "Error",
            text: (
                <>
                    Ha ocurrido un error al enviar su solicitud, por favor, revise sus datos y vuelva a intentarlo.
                    <br />
                    Si persiste el error, contacte a Soporte.
                </>
            )
        }
    };


    const navigate = useNavigate();
    // Función para avanzar al siguiente paso
    const onSendRequest = async () => {
        changeStep(1);
        try {
            console.log(formData);
            setOnSendingData(true);
            await CreateRequest(formData);
            updateFormData({}, true);  // o cualquier otro valor inicial
            setAlert("Solicitud completada!", "success");
            modalTriger('success');
            changeStep(0);
        } catch (error) {
            setAlert("La solicitud no pudo ser completada, intente nuevamente", "error");
            modalTriger('error');
            changeStep(0);
        }
    };

    const modalTriger = (type: 'error' | 'success') => {
        setOpenModal(true);
        setModalType(type)
    }


    // Función para manejar los datos recopilados en un paso
    const handleStepData = (data: Partial<FormData>) => {
        updateFormData(data, false);
    };

    useEffect(() => {
        console.log(formData)

    }, [formData]);



    return (
        <Box sx={{ padding: '1rem !important', width: '100%' }}>
            <Grid container >
                <Grid item xs={12} style={{ marginBottom: '3rem !important' }}>
                    {currentStep === 0 && (
                        <Step1
                            termsandConditionsCheckBox={termsandConditionsCheckBox}
                            setTermsandConditionsCheckBox={seetTermsandConditionsCheckBox}
                            isStepValid={isStepValid}
                            setStepValid={setStepValid}
                            updateFormData={updateFormData}
                            onStepCompleted={handleStepData}
                            formData={formData} />
                    )}
                    {currentStep === 1 && (
                        <Step2 />

                    )}

                    <Box mt={2} sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '3em !important', marginTop: '3em !important' }}>
                        {currentStep !== 1 &&

                            <>
                                <Button
                                    disabled={!isStepValid}
                                    type='submit'
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        width: '241.5px',
                                        height: '48px',
                                        padding: '8px 40px',
                                        borderRadius: '4px',
                                        marginRight: '16px',
                                        fontSize: '0.7em'
                                    }}
                                    onClick={() => onSendRequest()}
                                >
                                    Crear Solicitud
                                </Button>
                            </>
                        }
                    </Box>
                </Grid>
            </Grid>
            <ConfirmationModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                content={customContent}
                type={modalType}
            />
        </Box>
    );
};

export default MultiStepForm;
