import { Grid, Typography, Box, Button, useTheme, useMediaQuery, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import styles from "./styles.module.scss";
import Footer from "../Footer";
import PurpleHeader from "@/components/PurpleHeader";


const TermsandConditionsLayout = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <>
            <Box sx={{ width: '100% !important' }}>
                <Grid item xs={12}>
                    <PurpleHeader />
                </Grid>

                <Outlet />

                <Grid item xs={12}>
                    <Footer isMobile={isMobile} />
                </Grid>

            </Box>
        </>

    );
};



export default TermsandConditionsLayout;
