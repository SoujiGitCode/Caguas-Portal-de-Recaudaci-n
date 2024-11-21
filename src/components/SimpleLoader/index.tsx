import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const SimpleLoader = () => (
    <Box style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={0}>
            <Grid item xs={11} sx={{ marginTop: "2.5em !important", marginBottom: "2.5em !important", textAlign: 'center' }}>
                <Typography variant="body1" gutterBottom sx={{ fontSize: '1em !important', fontWeight: 'bolder', marginBottom: "1em !important", marginTop: "2em !important" }}>
                    Cargando
                </Typography>
                <br /><br />
                <CircularProgress />
            </Grid>
        </Grid>
    </Box>
);

export default SimpleLoader;
