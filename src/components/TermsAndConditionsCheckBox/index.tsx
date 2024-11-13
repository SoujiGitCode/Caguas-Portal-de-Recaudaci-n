import { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button, useTheme, useMediaQuery, Stack, Checkbox } from "@mui/material";
import { PATH } from '@/routes/constants';
import styles from './styles.module.scss';

interface TermsandConditionsProps {
    checkStatus: boolean;
    setCheckStatus: (status: boolean) => void;
}



const TermsandConditionsCheckBox = ({ checkStatus, setCheckStatus }: TermsandConditionsProps) => {


    return (
        <>

            {/* <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                <Box display="flex" alignItems="center" sx={{ marginBottom: '1.5em !important', marginTop: '1.5em !important' }}>
                    <IconButton color="warning">
                        <WarningIcon />
                    </IconButton>
                    <Typography variant="body1" ml={2}>
                        Al presionar el botón de continuar, confirma que ha leído las advertencias y acepta las <a style={{ color: '#1FAEEB', textDecorationColor: '#1FAEEB' }} href={PATH.TERMS_AND_CONDITIONS} target='_blank'>Condiciones de Uso</a>.
                    </Typography>
                </Box>

            </Grid> */}

            <Grid container justifyContent="start" alignItems="center" spacing={0} >
                <Grid item xs={12} lg={12} sx={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="checkbox"
                        checked={checkStatus}
                        onChange={(e) => setCheckStatus(e.target.checked)}
                        className={styles.checkboxInput}
                    />

                    {/* <Typography variant="body1" color="textSecondary">
                        Acepto y confirmo que he leído las advertencias y acepto las  <a style={{ color: '#0000FF', textDecorationColor: '#0000FF' }} href={PATH.TERMS_AND_CONDITIONS} target='_blank'>Condiciones de Uso</a>. Información Académica que comprenda desde el 2006
                        hasta el presente puede acceder al siguiente enlace <a style={{ color: '#0000FF', textDecorationColor: '#0000FF' }} href="https://srx.dde.pr/" target='_blank'>SRX | Home (dde.pr)</a>.
                    </Typography> */}


                    <Typography variant="body1" color="textSecondary">
                        Acepto y confirmo que he leído las advertencias y acepto las  <span style={{ color: '#0000FF', textDecorationColor: '#0000FF' }}>Condiciones de Uso</span>.
                    </Typography>
                </Grid>

            </Grid>
        </>
    )


}


export default TermsandConditionsCheckBox;