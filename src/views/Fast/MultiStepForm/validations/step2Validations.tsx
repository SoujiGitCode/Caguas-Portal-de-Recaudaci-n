import * as Yup from 'yup';

export const step2Validations = Yup.object().shape({
    schoolTown: Yup.string()
        .required('Este campo es requerido')
        .notOneOf(['0'], 'Por favor, seleccione un Pueblo  válido'),

    school_code: Yup.string()
        .required('Este campo es requerido')
        .notOneOf(['0'], 'Por favor, seleccione una Escuela  válida'),

    grade: Yup.string()
        .required('Este campo es requerido')
        .notOneOf(['notAValidGrade'], 'Por favor, seleccione una Nivel Académico válido'),


    grade_year: Yup.string()
        .required('Este campo es requerido')
        .matches(/^\d{4}$/, 'Debe contener exactamente 4 números')
        .notOneOf([''], 'Por favor, seleccione un año válido'),

    certificateToRequest: Yup.string()
        .required('Este campo es requerido')
        .notOneOf([''], 'Por favor, seleccione una Certificado válido'),

});
