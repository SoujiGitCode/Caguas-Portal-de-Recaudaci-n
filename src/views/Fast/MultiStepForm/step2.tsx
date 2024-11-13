import { useState, useEffect } from 'react';

import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    FormHelperText,
    FormControl,
    InputLabel,
    MenuItem,
    IconButton,
    InputAdornment,
} from '@mui/material';
import CustomLabel from "@/components/CustomLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { step2Validations } from './validations/step2Validations';
import { requestSchools, requestTowns } from '../functions';
import { convertLength } from '@mui/material/styles/cssUtils';

interface ItemData {
    id: string;
    name: string;
}

interface StepProps {
    isStepValid: boolean;
    setStepValid: (valid: boolean) => void;
    onStepCompleted: (data: any) => void;
    formData: any;
    updateFormData: (data: any, reset: boolean) => void;
}

const Step2 = ({ isStepValid, setStepValid, onStepCompleted, formData, updateFormData }: StepProps) => {
    const [townsData, setTownsData] = useState<ItemData[]>([{ id: '0', name: 'Seleccione Pueblo' }]);
    const [schoolsData, setSchoolsData] = useState<ItemData[]>([{ id: '0', name: 'Seleccione Escuela' }]);

    const gradesList = [
        { value: 'notAValidGrade', label: 'Seleccione un Nivel Académico ' },
        { value: 'ELEMENTAL', label: 'Primaria / Elemental' },
        { value: 'INTERMEDIA', label: 'Intermedia' },
        { value: 'SUPERIOR', label: 'Secundaria / Superior' },
    ];

    const certificatesList = [
        { value: '1', label: 'Certificado de Graduación' },
        { value: '2', label: 'Transcripción de Creditos' },
        { value: '3', label: 'Certificado de Horas Taller' },
    ];

    const formik = useFormik({
        validateOnMount: true,

        initialValues: {
            schoolTown: formData.schoolTown || townsData[0].id,
            school_code: formData.school_code || schoolsData[0].id,
            grade: formData.grade || gradesList[0].value,
            grade_year: formData.grade_year || '',
            certificateToRequest: certificatesList[0].value,
        },
        validationSchema: step2Validations,
        onSubmit: async () => {
            // await sendUserForRegister();
        },
        validateOnChange: true,
        validateOnBlur: true,
    });



    useEffect(() => {
        if (!formik.isValid) {
            console.log(formik.errors);
            setStepValid(false)
        }
        if (formik.isValid) {
            setStepValid(true)
            console.log(formik.values.school_code)
            updateFormData({
                schoolTown: formik.values.schoolTown,
                school_code: formik.values.school_code,
                grade: formik.values.grade,
                grade_year: formik.values.grade_year,
            }, false);
        }


        console.log('isStepValid ' + isStepValid)
    }, [formik.values, formik.touched, formik.isValid]);



    useEffect(() => {
        // Función que trae la data de las ciudades.
        const fetchTowns = async () => {
            try {
                const responseTowns = await requestTowns();
                setTownsData([{ id: '0', name: 'Seleccione Pueblo' }, ...responseTowns]);
            } catch (error) {
                console.error("Error fetching towns:", error);
            }
        };

        // Función que trae la data de las escuelas basada en el townId.
        const fetchSchools = async (townId: string) => {

            if (townId == '0') {
                setSchoolsData([{ id: '0', name: 'Seleccione Escuela' }])
                return
            }
            console.log('school code antes de fetch schools: ', formData.school_code)
            try {
                const responseSchools = await requestSchools(townId);
                setSchoolsData([{ id: '0', name: 'Seleccione Escuela' }, ...responseSchools])
                formik.setFieldValue('school_code', schoolsData[0]?.id || '');
                // Actualizamos el valor de school_code en el estado de Formik.
                if (formData.school_code === '0') {
                    formik.setFieldValue('school_code', responseSchools[0].id || '');
                }

            } catch (error) {
                console.error("Error fetching schools:", error);
            }
        };

        fetchTowns();
        // Llamamos a fetchSchools con el town id 1 al iniciar el componente.
        fetchSchools(formData.schoolTown);
    }, []);


    // Cada vez que cambia el valor de schoolTown en Formik, actualizamos las escuelas.
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const responseSchools = await requestSchools(formik.values.schoolTown);
                setSchoolsData(responseSchools);
                setSchoolsData([{ id: '0', name: 'Seleccione Escuela' }, ...responseSchools])
                formik.setFieldValue('school_code', schoolsData[0]?.id || '');
            } catch (error) {
                console.error("Error fetching schools:", error);
            }
        };

        fetchSchools();
    }, [formik.values.schoolTown, formData.school_town]);


    useEffect(() => {
        // Asegurarse de que schoolsData esté actualizado antes de asignar el valor a school_code
        if (schoolsData.length > 0 && formData.school_code !== '0') {
            formik.setFieldValue('school_code', formData.school_code);
        } else if (schoolsData.length > 0) {
            formik.setFieldValue('school_code', schoolsData[0].id);
        }
    }, [schoolsData]);



    return (
        <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
            <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5em !important', fontWeight: 'bolder', marginBottom: "1em !important" }}>
                Datos de la Escuela
            </Typography>

            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Pueblo de la Escuela" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                select
                                name="schoolTown"
                                id="schoolTown"
                                type="text"
                                variant="outlined"
                                value={formik.values.schoolTown}
                                onChange={(e) => {
                                    formik.handleChange(e);  // handle formik's change
                                    // formik.setFieldValue('school_code', '');  // reset school value
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.schoolTown && Boolean(formik.errors.schoolTown)}
                                helperText={formik.touched.schoolTown && typeof formik.errors.schoolTown === 'string' ? formik.errors.schoolTown : undefined}

                            >
                                {townsData.map((option: ItemData) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Escuela" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            {
                                schoolsData.length > 0 && (
                                    <TextField
                                        select
                                        name="school_code"
                                        id="school_code"
                                        type="text"
                                        variant="outlined"
                                        value={formik.values.school_code}
                                        onChange={(e) => {
                                            formik.handleChange(e);  // handle formik's change
                                        }}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.school_code && Boolean(formik.errors.school_code)}
                                        helperText={formik.touched.school_code && typeof formik.errors.school_code === 'string' ? formik.errors.school_code : undefined}
                                    >
                                        {schoolsData.map((option: ItemData) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )
                            }

                        </FormControl>
                    </Grid>

                </Grid>
            </Box>

            <Box>
                <Grid container spacing={0}>
                    <Grid xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Nivel Académico " required={false} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                select
                                name="grade"
                                id="grade"
                                type="text"
                                variant="outlined"
                                value={formik.values.grade}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.grade && Boolean(formik.errors.grade)}
                                helperText={formik.touched.grade && typeof formik.errors.grade === 'string' ? formik.errors.grade : undefined}

                            >
                                {gradesList.map((option, index) => (
                                    <MenuItem key={index} value={option.value} disabled={option.value === 'notAValidGrade'}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} lg={6} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Año de Graduación o Último Año Cursado" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                placeholder=''
                                name="grade_year"
                                id="grade_year"
                                type="text"
                                variant="outlined"
                                value={formik.values.grade_year}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.grade_year && Boolean(formik.errors.grade_year)}
                                helperText={formik.touched.grade_year && typeof formik.errors.grade_year === 'string' ? formik.errors.grade_year : undefined}
                                inputProps={{ maxLength: 4 }}

                            />
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>


            <Box>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12} sx={{ paddingX: '1rem' }}>
                        <CustomLabel name="Certificado a Solicitar" required={true} />
                        <FormControl fullWidth margin="normal" required sx={{ marginBottom: "1.5em !important" }}>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                variant="filled"
                                select
                                name="certificateToRequest"
                                id="certificateToRequest"
                                type="text"
                                value={formik.values.certificateToRequest}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.certificateToRequest && Boolean(formik.errors.certificateToRequest)}
                                helperText={formik.touched.certificateToRequest && formik.errors.certificateToRequest}

                            >
                                {certificatesList.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>

                </Grid>
            </Box>


        </form >


    );
};

export default Step2;
