import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, Grid, IconButton, Typography, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from "./styles.module.scss"

import slider1 from "../../assets/images/slider-1.png"
import slider2 from "../../assets/images/slider-2.png"
import slider3 from "../../assets/images/slider-3.png"
import { useNavigate } from "react-router-dom";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1200, min: 600 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
    },
};

const MyCarousel = ({ isMobile }: { isMobile: boolean }) => {


    const titleOne = "Ingresar Datos"
    const paragraphOne = "Para crear una solicitud debe ingresar sus datos personales e información de la escuela donde cursó el grado a ser considerado para la emisión de sus certificados de graduación."

    const titleTwo = "Crear Solicitud"
    const paragraphTwo = "Para crear una solicitud solo debe oprimir el botón de Crear solicitud completar el formulario y enviar la solicitud."

    const titleThree = "¡Listo! reciba el certificado en su Correo Electrónico"
    const paragraphThree = "Enviaremos un correo electrónico de confirmación al correo provisto en el formulario."

    return (
        <Box position="relative">
            <Carousel
                responsive={responsive}
                arrows={true}
                renderButtonGroupOutside={true}
            >
                <SlideContent title={titleOne} paragraph={paragraphOne} imgSrc={slider1} isMobile={isMobile} />
                <SlideContent title={titleTwo} paragraph={paragraphTwo} imgSrc={slider2} button={true} isMobile={isMobile} />
                <SlideContent title={titleThree} paragraph={paragraphThree} imgSrc={slider3} isMobile={isMobile} />

            </Carousel>
        </Box>
    );
};

const SlideContent = ({ title, paragraph, imgSrc, button = false, isMobile }: any) => {

    const navigate = useNavigate();

    return (
        <Box>
            <Grid container justifyContent="center" alignItems="center" gap={3}>
                <Grid item xs={12} lg={3} >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        <Typography className={styles.carouselTitle} sx={{ textAlign: isMobile ? 'center' : 'left' }} >{title}</Typography>
                        <Typography className={styles.carouselText} sx={{ textAlign: isMobile ? 'center' : 'left' }}>{paragraph}</Typography>

                        {button && (
                            <Button className={styles.carouselButton} onClick={() => navigate("/fast")} sx={{ width: isMobile ? '100%' : '240px' }} >
                                Crear Solicitud
                            </Button>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} lg={3} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                    <img src={imgSrc} alt={title} />
                </Grid>
            </Grid>
        </Box >
    );
};

const ButtonGroup = () => {
    return (
        <>
            <IconButton style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}>
                <ChevronLeft />
            </IconButton>
            <IconButton style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                <ChevronRight />
            </IconButton>
        </>
    );
};

export default MyCarousel;
