import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { UserDetails } from "..";
import { FormikProps } from "formik";
import { FormControl, Grid } from "@mui/material";
import { CustomLabel } from "@/components";
import PhoneInput from "@/components/PhoneInput";

interface ListItem {
  value: string;
  label: string;
}

interface UserProfileInfoProps {
  formik: FormikProps<UserDetails>;
  listGenre: ListItem[];
  listId: ListItem[];
  isEditMode: boolean;
}

const UserEditAdditionalInfo = ({
  formik,
  listGenre,
  listId,
  isEditMode,
}: UserProfileInfoProps) => {

  const genderList = [
    { value: 'notAValidGender', label: 'Seleccione Género' },
    { value: 'F', label: 'Femenino' },
    { value: 'M', label: 'Masculino' },
    { value: 'N', label: 'No Indica' }
  ];


  return (
    <>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
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
          <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
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

          <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
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
  );
};

export default UserEditAdditionalInfo;
