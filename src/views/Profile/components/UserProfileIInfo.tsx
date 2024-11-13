import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getFormattedDate } from "@/utils/helpers";
import { UserDetails } from "..";
import { FormikProps } from "formik";

interface UserProfileInfoProps {
  formik: FormikProps<UserDetails>;
  isMobile: boolean;
}

const UserProfileInfo = ({ formik, isMobile }: UserProfileInfoProps) => {

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, ''); // Elimina todo lo que no sea dígito
    const match = cleanPhoneNumber.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const part1 = match[1] ? `(${match[1]}` : '';
      const part2 = match[2] ? `) ${match[2]}` : '';
      const part3 = match[3] ? `-${match[3]}` : '';
      return `${part1}${part2}${part3}`.trim();
    }
    return phoneNumber; // Retorna el original si no hay dígitos
  };



  const maskAndFormatSSN = (ssn: string) => {
    // Enmascara los primeros 5 números y mantiene los últimos 4 dígitos visibles
    let masked = ssn.slice(0, 5).replace(/\d/g, 'X') + ssn.slice(5);
    // Añade guiones para el formato
    if (masked.length > 3) masked = masked.slice(0, 3) + '-' + masked.slice(3);
    if (masked.length > 6) masked = masked.slice(0, 6) + '-' + masked.slice(6);
    return masked;
  };

  const genderList = [
    { value: 'notAValidGender', label: 'Seleccione Género' },
    { value: 'F', label: 'Femenino' },
    { value: 'M', label: 'Masculino' },
    { value: 'N', label: 'No Indica' }
  ];


  const genderDictionary = {
    'F': 'Femenino',
    'M': 'Masculino',
    'N': 'No indicado'
  };



  return (
    <>
      <Box sx={{ display: "flex", paddingBottom: "1.3rem", paddingTop: "2rem" }}>

        <Typography sx={{ fontWeight: "bold", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
          Primer Nombre: &nbsp;
        </Typography>
        <Typography
          sx={{
            lineBreak: "anywhere",
            fontSize: isMobile ? '0.7rem' : "1.2rem",
          }}
        >
          {formik.values.depr_first_name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
          Segundo Nombre: &nbsp;
        </Typography>
        <Typography
          sx={{
            lineBreak: "anywhere",
            fontSize: isMobile ? '0.7rem' : "1.2rem",
          }}
        >
          {formik.values.depr_second_name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
          Primer Apellido: &nbsp;
        </Typography>
        <Typography
          sx={{
            lineBreak: "anywhere",
            fontSize: isMobile ? '0.7rem' : "1.2rem",
          }}
        >
          {formik.values.depr_last_name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
          Segundo Apellido: &nbsp;
        </Typography>
        <Typography
          sx={{
            lineBreak: "anywhere",
            fontSize: isMobile ? '0.7rem' : "1.2rem",
          }}
        >
          {formik.values.depr_second_last_name}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
          Seguro Social: &nbsp;
        </Typography>
        <Typography
          sx={{
            lineBreak: "anywhere",
            fontSize: isMobile ? '0.7rem' : "1.2rem",
          }}
        >
          {maskAndFormatSSN(formik.values.social_security)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
          Fecha de nacimiento: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
          {getFormattedDate(formik.values.depr_birthdate)}
        </Typography>
      </Box>


      {isMobile &&
        <>
          <Box sx={{ display: "flex", paddingBottom: "1.3rem" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
              Número de Teléfono: &nbsp;
            </Typography>
            <Typography sx={{ lineBreak: "anywhere", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
              {formatPhoneNumber(formik.values.depr_phone)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
              Género: &nbsp;
            </Typography>
            <Typography sx={{ lineBreak: "anywhere", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
              {genderDictionary[formik.values.depr_gender.toString()] || "No indicado"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              paddingBottom: "1.3rem",
              width: "140%",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
              Documento de identidad: &nbsp;
            </Typography>
            <Typography sx={{ lineBreak: "anywhere", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
              {formik.values.identification}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              paddingBottom: "1.3rem",
              width: "140%",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
              Correo electrónico: &nbsp;
            </Typography>
            <Typography sx={{ lineBreak: "anywhere", fontSize: isMobile ? '0.7rem' : "1.2rem" }}>
              {formik.values.email}
            </Typography>
          </Box>
        </>}
    </>
  );
};

export default UserProfileInfo;
