import { MenuItem, TextField, Box, Avatar } from '@mui/material';
import USFlag from '../../assets/flags/us.svg';
import CAFlag from '@/assets/flags/ca.svg';
import PRFlag from '@/assets/flags/pr.svg';
import { FormikProps } from 'formik';

interface CountrySelectProps<T> {
    name: keyof T; // Clave del objeto de Formik que representa el campo
    formik: FormikProps<T>; // Objeto Formik para manejar el estado y validaciones
}

function CountrySelect<T>({
    name,
    formik,
}: CountrySelectProps<T>) {
    const countries = [
        { label: 'Estados Unidos', value: 'US', flag: USFlag },
        { label: 'Canada', value: 'CA', flag: CAFlag },
        { label: 'Puerto Rico', value: 'PR', flag: PRFlag },
    ];

    // Validamos si el valor actual está entre los países permitidos
    const value = formik.values[name] as string;
    const isValidCountry = countries.some((country) => country.value === value);

    return (
        <Box sx={{ width: '100%' }}>
            <TextField
                select
                name={String(name)}
                // value={!value ? '' : isValidCountry ? value : 'invalid'} // Manejamos valor inválido
                value={isValidCountry ? formik.values[name] : 'none'} // Mostrar la opción predeterminada si el valor no es válido
                onChange={formik.handleChange} // Directamente desde Formik
                onBlur={formik.handleBlur} // Directamente desde Formik
                error={Boolean(formik.touched[name] && formik.errors[name])} // Validación de error
                helperText={formik.touched[name] && formik.errors[name] ? String(formik.errors[name]) : ''} // Texto de error
                fullWidth
                variant="outlined"
            >
                {/* Opción predeterminada */}
                <MenuItem value="none" disabled>
                    Selecciona un país
                </MenuItem>

                {/* Opciones válidas */}
                {countries.map((country) => (
                    <MenuItem key={country.value} value={country.value}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Avatar
                                src={country.flag}
                                alt={country.label}
                                sx={{
                                    width: 24,
                                    height: 16,
                                    borderRadius: 0, // Rectangular
                                }}
                            />
                            {country.label}
                        </Box>
                    </MenuItem>
                ))}

                {/* Opción de país inválido */}
                {!isValidCountry && value && (
                    <MenuItem value="invalid" disabled>
                        País inválido
                    </MenuItem>
                )}
            </TextField>
        </Box>
    );
}

export default CountrySelect;
