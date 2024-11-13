import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "../profile.module.scss"; // Asegúrate de importar tus estilos correctamente

function TitleSection() {
  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: "2rem",
        paddingBottom: "2rem"
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: '#697FAA', fontSize: '2em !important' }}>
        Perfil
      </Typography>
    </Box>
  );
}

export default TitleSection;
