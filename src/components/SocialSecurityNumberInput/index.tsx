import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CSSProperties, useEffect, useState } from "react";
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import InputMask from 'react-input-mask';


const CustomBox = styled(Box)(() => ({
    verticalAlign: 'top',
    padding: '0.05rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '0px', // Ajusta el espacio entre los campos si es necesario
    border: `2px solid #658A86`, // Utiliza el color de tu tema
    borderRadius: '4px 4px 0px 0px',
    '&:hover': {
        borderColor: '#658A86', // Cambia según tu tema
    },
    '& .MuiTextField-root': {
        '& .MuiInputBase-input': {
            textAlign: 'center !important', // Centra el texto
        },
        '& fieldset': {
            border: 'none !important', // Elimina los bordes
        },
        '&:hover fieldset': {
            border: 'none !important', // Mantiene los bordes eliminados en :hover
        },
        '&.Mui-focused fieldset': {
            border: 'none !important', // Mantiene los bordes eliminados en :focus
        },
    },
}));



// Define the props for the SocialSecurityInput component
interface SocialSecurityInputProps {
    value: any;
    variant?: "outlined";
    name: string;
    type?: string;
    placeholder?: string;
    id: string; // The id is required
    sx?: CSSProperties;
    formik: any; // The formik object is required
    setSocialSecurityArray: (value: any[]) => void; // The function to update the social security array is required
    visibilityPassword: boolean; // The visibility state of the password is required
    setVisibilityPassword: React.Dispatch<React.SetStateAction<boolean>>; // The function to update the visibility state of the password is required
    form_social_security: string;
    disableToggleVisibility?: boolean;
}

const SocialSecurityNumberInput = ({
    value,
    variant,
    name,
    type,
    placeholder,
    id,
    sx,
    formik,
    setSocialSecurityArray,
    visibilityPassword,
    setVisibilityPassword,
    form_social_security,
    disableToggleVisibility = false
}: SocialSecurityInputProps) => {

    const [part1, setPart1] = useState('');
    const [part2, setPart2] = useState('');
    const [part3, setPart3] = useState('');

    const theme = useTheme();

    // Estilos personalizados para TextField que ajustan el ancho dinámicamente
    const getTextFieldWidth = (chars: number) => 20 * chars;

    const getHiddenFieldWidth = (maxLength: number) => {
        // Base width per character + padding + border
        const baseWidthPerCharacter = 12; // Estima cuánto espacio ocupa cada carácter
        const totalPaddingAndBorder = 14; // Estimación del padding y border total
        return maxLength * baseWidthPerCharacter + totalPaddingAndBorder;
    };




    return (
        <CustomBox>

            <InputMask
                mask="***"
                value={part1}
                onChange={(e) => setPart1(e.target.value)}
                maskChar="_"
            >
                {() => (
                    <TextField
                        type="text"
                        placeholder="xxx"
                        inputProps={{ maxLength: 10 }}
                        sx={{
                            letterSpacing: '0.1rem',
                            textAlign: 'right',
                            width: `${getTextFieldWidth(3)}px`, // Ajusta el ancho
                        }}
                    />
                )}
            </InputMask>


            <InputMask
                mask="**"
                value={part2}
                onChange={(e) => setPart2(e.target.value)}
                maskChar="_"
            >
                {() => (
                    <TextField
                        type="text"
                        placeholder="xx"
                        inputProps={{ maxLength: 10 }}
                        sx={{
                            letterSpacing: '0.1rem',
                            textAlign: 'center',
                            width: `${getTextFieldWidth(2)}px`, // Ajusta el ancho
                        }}
                    />
                )}

            </InputMask>

            <InputMask
                mask="****"
                value={part3}
                onChange={(e) => setPart3(e.target.value)}
                maskChar="_"
            >
                {() => (
                    <TextField
                        type="text"
                        placeholder="xxxx"
                        inputProps={{ maxLength: 10 }}
                        sx={{
                            letterSpacing: '0.1rem',
                            textAlign: 'left',
                            width: `${getTextFieldWidth(4)}px`, // Ajusta el ancho
                        }}
                    />
                )}
            </InputMask>
        </CustomBox>
    );
};

export default SocialSecurityNumberInput;