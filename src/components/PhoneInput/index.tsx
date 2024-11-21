import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { TextField } from '@mui/material';

// Definición de la prop interface para PhoneInput
interface PhoneInputProps {
    name: string;
    label?: string;
    id?: string;
    variant?: 'outlined' | 'standard' | 'filled';
    placeholder?: string;
    formik: any; // Asume que formik es pasado como prop para acceso directo
}

const PhoneInput = ({ name, label, id, variant = 'outlined', placeholder, formik }: PhoneInputProps) => {
    const [displayValue, setDisplayValue] = useState("");
    // Inicializa el input con el formato deseado
    useEffect(() => {
        setDisplayValue(formik.values[name] || ""); // Usa el campo específico de Formik
    }, [formik.values[name]]);


    function cleanPhoneNumber(phoneNumber) {
        // Elimina todo lo que no sea dígitos
        const onlyNumbers = phoneNumber.replace(/\D/g, '');
        return onlyNumbers;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = event.target.value; // Formato con paréntesis y guiones
        setDisplayValue(formattedValue);
        formik.setFieldValue(name, cleanPhoneNumber(formattedValue)); // Valor limpio para Yup
    };




    return (
        <InputMask
            mask="(999) 999-9999"
            value={displayValue}
            onChange={handleChange}
            onBlur={formik.handleBlur} // Correcto manejo de onBlur
            maskChar="_"
        >
            {() => (
                <TextField
                    fullWidth
                    id={id || name}
                    name={name}
                    label={label || ''}
                    placeholder={placeholder || "(XXX) XXX-XXXX"}
                    variant={variant}
                    error={formik.touched[name] && Boolean(formik.errors[name])}
                    helperText={formik.touched[name] && formik.errors[name]}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                        sx: { letterSpacing: '2px' },
                    }}
                />
            )}
        </InputMask>
    );
};

export default PhoneInput;
