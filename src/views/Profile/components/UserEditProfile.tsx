
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { UserDetails } from "..";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import SocialSecurityInput from "@/components/SocialSecurityInput";
import { FormControl, Grid, MenuItem } from "@mui/material";
import { CustomLabel } from "@/components";
import PhoneInput from "@/components/PhoneInput";

interface UserProfileInfoProps {
  formik: FormikProps<UserDetails>;
  isMobile: boolean;
}

const UserEditProfile = ({ formik, isMobile }: UserProfileInfoProps) => {


  const [socialSecurityArray, setSocialSecurityArray] = useState(new Array(9).fill("") ?? null);
  const [showSocialSecurity, setShowSocialSecurity] = useState(false);

  const customText = {
    // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "pink",
    //   borderRadius: 0,
    //   border: "2px solid " + "#a09c9c92",
    // },
    // width: "100%",
  };

  const genderList = [
    { value: 'notAValidGender', label: 'Seleccione Género' },
    { value: 'F', label: 'Femenino' },
    { value: 'M', label: 'Masculino' },
    { value: 'N', label: 'No Indica' }
  ];

  useEffect(() => {
    setSocialSecurityArray(formik.values.social_security ? formik.values.social_security.split("") : new Array(9).fill(""));
  }, [])

  return (
    <>
      {/* Name */}

      <Box>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
            <CustomLabel name="Primer Nombre" required={true} />
            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
              <TextField
                placeholder='Primer Nombre'
                name="depr_first_name"
                id="depr_first_name"
                type="text"
                variant="outlined"
                value={formik.values.depr_first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.depr_first_name && Boolean(formik.errors.depr_first_name)}
                helperText={formik.touched.depr_first_name && formik.errors.depr_first_name}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
            <CustomLabel name="Segundo Nombre" required={false} />
            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
              <TextField
                placeholder='Segundo Nombre'
                name="middleName"
                id="middleName"
                type="text"
                variant="outlined"
                value={formik.values.depr_second_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.depr_second_name && Boolean(formik.errors.depr_second_name)}
                helperText={formik.touched.depr_second_name && formik.errors.depr_second_name}
              />
            </FormControl>
          </Grid>

        </Grid>
      </Box>

      <Box>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
            <CustomLabel name="Primer Apellido" required={true} />
            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
              <TextField
                placeholder='Primer Apellido DEPR'
                name="depr_last_name "
                id="depr_last_name "
                type="text"
                variant="outlined"
                value={formik.values.depr_last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.depr_last_name && Boolean(formik.errors.depr_last_name)}
                helperText={formik.touched.depr_last_name && formik.errors.depr_last_name}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
            <CustomLabel name="Segundo Apellido" required={true} />
            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
              <TextField
                placeholder='Segundo Apellido DEPR'
                name="depr_second_last_name"
                id="depr_second_last_name"
                type="text"
                variant="outlined"
                value={formik.values.depr_second_last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.depr_second_last_name && Boolean(formik.errors.depr_second_last_name)}
                helperText={formik.touched.depr_second_last_name && formik.errors.depr_second_last_name}
              />
            </FormControl>
          </Grid>

        </Grid>
      </Box>


      <Box>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
            <CustomLabel name="Fecha de Nacimiento" required={true} />
            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
              <TextField
                placeholder='Fecha de Nacimiento'
                id="depr_birthdate "
                name="depr_birthdate "
                type="date"
                value={formik.values.depr_birthdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.depr_birthdate && Boolean(formik.errors.depr_birthdate)}
                helperText={formik.touched.depr_birthdate && formik.errors.depr_birthdate}
                inputProps={{
                  max: new Date().toISOString().split("T")[0],  // Limita la fecha a hoy
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
            <CustomLabel name="Seguro Social" required={true} />
            <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
              <SocialSecurityInput
                formik={formik}
                socialSecurityArray={socialSecurityArray}
                setSocialSecurityArray={setSocialSecurityArray}
              />
            </FormControl>
          </Grid>

        </Grid>
      </Box>


      {isMobile &&
        <>
          <Box>
            <Grid container spacing={0}>
              <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                <CustomLabel name="Teléfono" required={true} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <PhoneInput
                    placeholder='Teléfono'
                    name="depr_phone"
                    id="depr_phon"
                    variant="outlined"
                    formik={formik}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                <CustomLabel name="Género" required={false} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    select
                    name="depr_gender"
                    id="depr_gender"
                    type="text"
                    variant="outlined"
                    value={formik.values.depr_gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.depr_gender && Boolean(formik.errors.depr_gender)}
                    helperText={formik.touched.depr_gender && formik.errors.depr_gender ? formik.errors.depr_gender : ''}

                  >
                    {genderList.map((option) => (
                      <MenuItem key={option.value} value={option.value} disabled={option.value === 'notAValidGender'}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Grid container spacing={0}>
              <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
                <CustomLabel name="Licencia / Real ID" required={true} />
              </Grid>

              <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1em !important" }}>
                  <TextField
                    placeholder="Número de identificación"
                    name="identification"
                    id="identification"
                    type="text"
                    variant="outlined"
                    value={formik.values.identification}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.identification && Boolean(formik.errors.identification)}
                    helperText={formik.touched.identification && formik.errors.identification}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                <CustomLabel name="Correo Electrónico" required={true} />
                <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                  <TextField
                    placeholder='Correo Electrónico'
                    name="email"
                    id="email"
                    type="text"
                    variant="filled"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    inputProps={
                      { readOnly: true, }
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </>

      }
    </>
  );
};

export default UserEditProfile;
