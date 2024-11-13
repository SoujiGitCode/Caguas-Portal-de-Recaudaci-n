import React from 'react';
import { Box, Grid, Typography, FormControl, TextField, MenuItem, Button, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PhoneInput from '@/components/PhoneInput';
import SocialSecurityInput from '@/components/SocialSecurityInput';
import { PATH } from "@/routes/constants";
import TermsandConditionsCheckBox from '@/components/TermsAndConditionsCheckBox';
import { CustomLabel } from '@/components';

const UserRegistrationForm = ({ formik, questionsList, showPassword, setShowPassword, checkStatus, setCheckStatus, socialSecurityArray, setSocialSecurityArray, isMobile }) => {
    return (
        <form style={{ width: isMobile ? '100%' : '60%' }} onSubmit={formik.handleSubmit}>
            <Typography variant="h1"
                gutterBottom sx={{ color: '#3A3A3C', fontSize: '2rem !important', fontWeight: 'bolder', marginBottom: "1em !important", textAlign: 'center' }}>

                Registro de nueva cuenta información general del usuario

            </Typography>

            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Primer Nombre" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Primer Nombre'
                                name="firstName"
                                id="firstName"
                                type="text"
                                variant="outlined"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Segundo Nombre" required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Segundo Nombre'
                                name="middleName"
                                id="middleName"
                                type="text"
                                variant="outlined"
                                value={formik.values.middleName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                                helperText={formik.touched.middleName && formik.errors.middleName}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>

            <Box>
                <Grid container spacing={0}>

                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Primer Apellido" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Primer Apellido'
                                name="lastName"
                                id="lastName"
                                type="text"
                                variant="outlined"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Segundo Apellido" required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Segundo Apellido'
                                name="secondLastName"
                                id="secondLastName"
                                type="text"
                                variant="outlined"
                                value={formik.values.secondLastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.secondLastName && Boolean(formik.errors.secondLastName)}
                                helperText={formik.touched.secondLastName && formik.errors.secondLastName}
                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>

            <Box>
                <Grid container spacing={0} sx={{ marginBottom: '1.5em !important' }}>

                </Grid>
            </Box>

            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Teléfono" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <PhoneInput
                                placeholder='Teléfono'
                                name="phone"
                                id="phone"
                                variant="outlined"
                                formik={formik}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
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

            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} sx={{ paddingX: '1rem', marginBottom: '1rem !important' }}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <CustomLabel name="Pregunta de Seguridad 1" required={true} />
                            <TextField
                                inputProps={{ readOnly: false }}
                                select
                                name="security_question1"
                                id="security_question1"
                                type="text"
                                variant="outlined"
                                // label="Seleccione una pregunta de Seguridad"
                                value={formik.values.security_question1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // error={formik.touched.security_question1 && Boolean(formik.errors.security_question1)}
                                // helperText={formik.touched.security_question1 && formik.errors.security_question1}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '32px', // Borde redondeado
                                        '& fieldset': {
                                            borderRadius: '32px', // Borde redondeado en el contorno
                                        },
                                    },
                                }}
                            >
                                {questionsList.map((question, index) => (
                                    <MenuItem key={index} value={question.title}>
                                        {question.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Respuesta a la pregunta de Seguridad 1" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder=''
                                name="security_answer1"
                                id="security_answer1"
                                type="text"
                                variant="outlined"
                                value={formik.values.security_answer1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.security_answer1 && Boolean(formik.errors.security_answer1)}
                                helperText={formik.touched.security_answer1 && formik.errors.security_answer1}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

            </Box>

            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} sx={{ paddingX: '1rem', marginBottom: '1rem !important' }}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <CustomLabel name="Pregunta de Seguridad 2" required={true} />
                            <TextField
                                inputProps={{ readOnly: false }}
                                select
                                name="security_question2"
                                id="security_question2"
                                type="text"
                                variant="outlined"
                                value={formik.values.security_question2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '32px', // Borde redondeado
                                        '& fieldset': {
                                            borderRadius: '32px', // Borde redondeado en el contorno
                                        },
                                    },
                                }}
                            >
                                {questionsList.map((question, index) => (
                                    <MenuItem key={index} value={question.title}>
                                        {question.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Respuesta a la pregunta de Seguridad 2" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder=''
                                name="security_answer2"
                                id="security_answer2"
                                type="text"
                                variant="outlined"
                                value={formik.values.security_answer2}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.security_answer2 && Boolean(formik.errors.security_answer2)}
                                helperText={formik.touched.security_answer2 && formik.errors.security_answer2}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

            </Box>

            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} sx={{ paddingX: '1rem', marginBottom: '1rem !important' }}>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <CustomLabel name="Pregunta de Seguridad 3" required={true} />
                            <TextField
                                inputProps={{ readOnly: false }}
                                select
                                name="security_question3"
                                id="security_question3"
                                type="text"
                                variant="outlined"
                                value={formik.values.security_question3}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '32px', // Borde redondeado
                                        '& fieldset': {
                                            borderRadius: '32px', // Borde redondeado en el contorno
                                        },
                                    },
                                }}
                            >
                                {questionsList.map((question, index) => (
                                    <MenuItem key={index} value={question.title}>
                                        {question.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Respuesta a la pregunta de Seguridad 3" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder=''
                                name="security_answer3"
                                id="security_answer3"
                                type="text"
                                variant="outlined"
                                value={formik.values.security_answer3}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.security_answer3 && Boolean(formik.errors.security_answer3)}
                                helperText={formik.touched.security_answer3 && formik.errors.security_answer3}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

            </Box>


            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Correo Electrónico" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Correo Electrónico'
                                name="email"
                                id="email"
                                type="text"
                                variant="outlined"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Contraseña" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Contraseña'
                                name="password"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Confirmar Contraseña" required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder='Confirmar Contraseña'
                                name="repeatPassword"
                                id="repeatPassword"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                value={formik.values.repeatPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                                helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                        </FormControl>
                    </Grid>

                </Grid>
            </Box>


            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} sx={{ paddingX: '1rem', marginY: '2rem !important' }}>
                        <TermsandConditionsCheckBox checkStatus={checkStatus} setCheckStatus={setCheckStatus} />
                    </Grid>

                    <Grid item xs={12} sx={{ paddingX: '1rem' }}>
                        <Grid container spacing={0} justifyContent={'center'} textAlign={'center'}>

                            <Grid item xs={12} xl={4} sx={{ marginBottom: "1rem !important" }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{
                                        // width: '241.5px',
                                        width: "97%",
                                        height: "45px",
                                        padding: "8px 15px",
                                        borderRadius: "32px",
                                        border: "1px solid",
                                        marginRight: "16px",
                                    }}
                                    href={PATH.LOGIN}
                                >
                                    Ya Tengo una cuenta
                                </Button>
                            </Grid>

                            <Grid item xs={12} xl={4} sx={{ justifyContent: 'center', marginBottom: "1rem !important" }}>
                                <Button
                                    type='submit'
                                    variant="contained"
                                    color="primary"
                                    disabled={!formik.isValid || !checkStatus}
                                    style={{
                                        width: "97%",
                                        height: "45px",
                                        padding: "8px 15px",
                                        borderRadius: "32px",
                                        border: "2px solid",
                                        marginRight: "16px",
                                    }}
                                // onClick={() => modalTriger('success')}
                                >
                                    Registrarme
                                </Button>
                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default UserRegistrationForm;
