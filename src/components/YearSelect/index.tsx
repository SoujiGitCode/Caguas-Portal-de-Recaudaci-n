import React from 'react';
import { TextField, MenuItem } from '@mui/material';

interface YearSelectProps {
    name: string;
    placeholder?: string;
    required?: boolean;
    formik: any; // El objeto formik se pasa explícitamente
    defaultOption?: string;
}

const YearSelect = ({ name, placeholder, required = false, formik, defaultOption = "Seleccione Año" }: YearSelectProps) => {
    const years = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => 1900 + i);

    return (
        <TextField
            select
            fullWidth
            variant="outlined"
            placeholder={placeholder}
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            required={required}
        >
            {/* Opción por defecto */}
            <MenuItem value="0">
                {defaultOption}
            </MenuItem>
            {years.map((year) => (
                <MenuItem key={year} value={year}>
                    {year}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default YearSelect;
