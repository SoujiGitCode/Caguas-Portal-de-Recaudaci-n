import React, { useState } from 'react';
import { Box, Grid, Typography, FormControl, TextField, Button } from '@mui/material';

const OtpForm = ({ handleOtpSubmit }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // Verifica que solo se ingresen números
            setOtp(value);
        }
    };

    const handleSubmit = () => {
        if (otp.length === 6) {
            setError('');
            handleOtpSubmit(otp);
        } else {
            setError('El OTP debe tener 6 números');
        }
    };

    return (
        <form>
            <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Typography variant="h2">Ingrese el código enviado a su correo electrónico</Typography>
                <FormControl fullWidth margin="normal" sx={{ marginY: '3rem !important' }}>
                    <TextField
                        placeholder="Ingrese el código"
                        value={otp}
                        onChange={handleChange}
                        error={!!error}
                        helperText={error}
                        variant="outlined"
                        sx={{ textAlign: 'center' }}
                        inputProps={{ maxLength: 6, style: { textAlign: 'center' } }}
                    />
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ marginTop: '1rem' }}
                >
                    Aceptar
                </Button>
            </Box>
        </form>
    );
};

export default OtpForm;
