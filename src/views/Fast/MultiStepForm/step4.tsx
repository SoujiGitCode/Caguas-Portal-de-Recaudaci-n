import { useState, useEffect } from 'react';

import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    FormHelperText,
    FormControl,
    InputLabel,
    MenuItem,
    IconButton,
    InputAdornment,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';



const Step4 = () => {

    return (
        <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={2}>
                <Grid item xs={11} sx={{ marginTop: "2.5em !important", marginBottom: "2.5em !important", textAlign: 'center' }}>
                    <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5em !important', fontWeight: 'bolder', marginBottom: "1em !important", marginTop: "2em !important" }}>
                        Cargando
                    </Typography>
                    <br /><br />
                    <CircularProgress />
                </Grid>

                <Grid item xs={11} sx={{ marginBottom: "2.5em !important" }}>

                    <Grid container alignItems="center" spacing={3}>
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Typography variant="body1" color="textPrimary">
                                Validando sus datos, por favor espere. No cierre ni recargue esta página.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Box>

    );
};

export default Step4;
