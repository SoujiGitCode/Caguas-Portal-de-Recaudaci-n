import * as Yup from 'yup';

export const Step7Validation = Yup.object().shape({
    signature_date: Yup.date()
        .required('La fecha de inicio es requerida')
        .typeError('Debe ser una fecha válida (yyyy-mm-dd)'),

    signature_time: Yup.string()
        .required('La hora es requerida')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato inválido (hh:mm)'), // Validación de formato de hora

    signature_location: Yup.string()
        .required('La ubicación es requerida')
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Formato inválido (solo letras, números y espacios)')
        .max(100, 'Máximo 100 caracteres'),

    signature_first_name: Yup.string()
        .required('El primer nombre es requerido')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Formato inválido (solo letras y espacios)')
        .max(100, 'Máximo 100 caracteres'),

    signature_last_name: Yup.string()
        .required('El apellido es requerido')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Formato inválido (solo letras y espacios)')
        .max(100, 'Máximo 100 caracteres'),

    signature: Yup.string()
        .required('La firma es obligatoria')
        .max(100, 'Máximo 100 caracteres'), // Si es texto
});
