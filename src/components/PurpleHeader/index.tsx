import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import icon from "../../assets/images/icon.png"
// import logo from "@/assets/images/logo.png"
import logo from "@/assets/images/logo-caguas.png"
const PurpleHeader = () => {
    return (
        <>
            {/* Header */}
            <Box sx={{ bgcolor: '#ffffff', width: '100%', marginBottom: '2rem !important' }}>
                <Grid container
                    justifyContent="center"
                    alignItems="center"
                    textAlign={'center'}
                    sx={{
                        alignItems: 'center', // Alineación vertical
                        paddingY: '1em'
                    }}
                >
                    <Grid item xs>
                        {/* Contenido del Header */}
                        <img
                            src={logo}
                            alt="logo"
                            width={"15%"}
                        // style={{ width: "100%", height: "auto" }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default PurpleHeader;


