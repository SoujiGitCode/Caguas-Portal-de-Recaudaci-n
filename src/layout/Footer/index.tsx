import { Box } from '@mui/system';
import { Grid, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import styles from './Footer.module.scss';

export default function Footer({ isMobile }: { isMobile: boolean }) {
    return (
        <>
            {/* Footer */}
            <Box className={styles.footerContainer}>
                <Grid container>
                    {/* Línea Horizontal */}
                    <Grid item xs={12}>
                        <hr className={styles.horizontalLine} />
                    </Grid>
                    {/* Segundo Contenedor */}
                    <Grid item xs={12}>
                        <Box display="flex" sx={{ padding: '2.5rem', }}>
                            <Typography variant="body2" component="footer" sx={{ backgroundColor: '#fff', color: '#7e8890', textAlign: 'start', paddingX: '30px', fontSize: '12px' }}>
                                Municipio Autónomo de Caguas © 2020 | Todos los Derechos Reservados.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
