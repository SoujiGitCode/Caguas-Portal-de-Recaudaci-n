import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import group from "@/assets/images/icon-group.png"

const AccessibilityWidget = () => {
    return (
        <div style={{
            position: 'fixed',
            left: 'calc(100vw - 70px)', // 20px (margen) + 45px (tamaño del botón)
            bottom: '21px',
            zIndex: 2147483647,
        }}>
            <Tooltip title="Menú de accesibilidad" arrow>
                <IconButton
                    sx={{
                        backgroundColor: "#003d68",
                        padding: '3px',
                        transition: 'transform 0.5s, backgroundColor 1s',
                        '&:hover': {
                            backgroundColor: "#003d68",
                            transform: 'scale(1.1)',
                            boxShadow: 'none'
                        },
                        '&.Mui-focusVisible': {
                            boxShadow: 'none'
                        }
                    }}
                    onClick={() => {
                        // Acción cuando se haga clic en el botón (puede abrir el iframe de UserWay o cualquier otra acción)
                    }}
                >
                    <img
                        src="https://cdn.userway.org/widgetapp/images/body_wh.svg"
                        width="45"
                        height="45"
                        alt="Menú de accesibilidad"
                        style={{ maxWidth: '100%' }}
                    />
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default AccessibilityWidget;
