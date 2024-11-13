import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { UserDetails } from "..";
import { FormikProps } from "formik";

interface UserProfileInfoProps {
  formik: FormikProps<UserDetails>;
  isMobile: boolean;
}

const UserAdditionalInfo: React.FC<UserProfileInfoProps> = ({ formik, isMobile }) => {

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

  const genderDictionary = {
    'F': 'Femenino',
    'M': 'Masculino',
    'N': 'No indicado'
  };


  return (
    <>
      <Box sx={{ display: "flex", marginTop: '6.22rem !important', paddingBottom: "1.3rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Teléfono: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}>
          {formatPhoneNumber(formik.values.depr_phone)}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", paddingBottom: "1rem" }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
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
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Documento de identidad: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}>
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
        <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          Correo electrónico: &nbsp;
        </Typography>
        <Typography sx={{ lineBreak: "anywhere", fontSize: "1.2rem" }}>
          {formik.values.email}
        </Typography>
      </Box>
    </>
  );
};

export default UserAdditionalInfo;
