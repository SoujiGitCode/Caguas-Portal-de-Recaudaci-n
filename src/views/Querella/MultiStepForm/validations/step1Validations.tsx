import * as Yup from 'yup';

export const step1Validations = Yup.object().shape({

    /*--- Querellante Datos --- */
    complainant_name: Yup.string()
        // .matches(/^[\p{L}]+$/u, "El Nombre solo debe contener letras")
        .matches(/^[\p{L}]+( [\p{L}]+)*$/u, "El nombre solo debe contener letras y espacios simples entre palabras")
        .required("Nombre requerido")
        .max(20, "máximo 20 caracteres"),

    complainant_last_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Apellido solo debe contener letras")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    complainant_phone: Yup.string()
        .required("Teléfono requerido")
        .matches(/^[0-9*]+$/, "El formato del teléfono debe ser (XXX) XXX-XXXX")
        .max(14, "El teléfono no debe exceder 10 caracteres"),

    complainant_address: Yup.string()
        .required("Dirección requerida")
        .max(40, "máximo 40 caracteres"),


    complainant_email: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .required("Correo electrónico es requerido")
        .max(100, "máximo 100 caracteres"),


    // confirm_complainant_emai: Yup.string()
    //     .required("Confirmar correo electrónico no puede estar vacío")
    //     .oneOf([Yup.ref('email')], 'Los correos electrónicos deben coincidir')
    //     .max(100, "máximo 100 caracteres"),

    /*--- Fin Quierellante Datos --- */

    /*--- Querellado  Datos --- */
    defendant_name: Yup.string()
        // .matches(/^[\p{L}]+$/u, "El Nombre solo debe contener letras")
        .matches(/^[\p{L}]+( [\p{L}]+)*$/u, "El nombre solo debe contener letras y espacios simples entre palabras")
        .required("Nombre requerido")
        .max(20, "máximo 20 caracteres"),

    defendant_last_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Apellido solo debe contener letras")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    defendant_phone: Yup.string()
        .required("Teléfono requerido")
        .matches(/^[0-9*]+$/, "El formato del teléfono debe ser (XXX) XXX-XXXX")
        .max(14, "El teléfono no debe exceder 10 caracteres"),

    defendant_address: Yup.string()
        .required("Dirección requerida")
        .max(40, "máximo 40 caracteres"),


    defendant_email: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .required("Correo electrónico es requerido")
        .max(100, "máximo 100 caracteres"),


    // confirm_defendant_emai: Yup.string()
    //     .required("Confirmar correo electrónico no puede estar vacío")
    //     .oneOf([Yup.ref('email')], 'Los correos electrónicos deben coincidir')
    //     .max(100, "máximo 100 caracteres"),

    /*--- Fin  Querellado Datos --- */

    /*--- Datos de la Querella --- */
    case_number: Yup.string()
        .required("Número de Caso requerido")
        .matches(/^[0-9]+$/, "solo debe contener números")
        .max(20, "máximo 20 caracteres"),

    topic: Yup.string()
        .required("Asunto requerido")
        .max(20, "máximo 20 caracteres"),

    license_issued_number: Yup.string()
        .required("Número de licencia requerido")
        .matches(/^[0-9]+$/, "solo debe contener números")
        .max(20, "máximo 20 caracteres"),

    event_date: Yup.string().required("Fecha de ocurrencia de los hechos"),

    complaint_date: Yup.string().required("Fecha de la querella	"),

    event_place: Yup.string()
        .required("Lugar de ocurrencia de los hechos requerido")
        .max(40, "máximo 40 caracteres"),

    reject_comment: Yup.string()
        .required("Comentario de Rechazo requerido")
        .max(40, "máximo 40 caracteres"),

    witness_1: Yup.string()
        // .matches(/^[\p{L}]+$/u, "El Nombre solo debe contener letras")
        .matches(/^[\p{L}]+( [\p{L}]+)*$/u, "El nombre solo debe contener letras y espacios simples entre palabras")
        // .required("Nombre requerido")
        .max(20, "máximo 20 caracteres"),


    witness_1_last_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Apellido solo debe contener letras")
        // .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    witness_2: Yup.string()
        // .matches(/^[\p{L}]+$/u, "El Nombre solo debe contener letras")
        .matches(/^[\p{L}]+( [\p{L}]+)*$/u, "El nombre solo debe contener letras y espacios simples entre palabras")
        // .required("Nombre requerido")
        .max(20, "máximo 20 caracteres"),

    witness_2_last_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Apellido solo debe contener letras")
        // .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    witness_3: Yup.string()
        // .matches(/^[\p{L}]+$/u, "El Nombre solo debe contener letras")
        .matches(/^[\p{L}]+( [\p{L}]+)*$/u, "El nombre solo debe contener letras y espacios simples entre palabras")
        // .required("Nombre requerido")
        .max(20, "máximo 20 caracteres"),

    witness_3_last_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Apellido solo debe contener letras")
        // .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    witness_4: Yup.string()
        // .matches(/^[\p{L}]+$/u, "El Nombre solo debe contener letras")
        .matches(/^[\p{L}]+( [\p{L}]+)*$/u, "El nombre solo debe contener letras y espacios simples entre palabras")
        // .required("Nombre requerido")
        .max(20, "máximo 20 caracteres"),

    witness_4_last_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Apellido solo debe contener letras")
        // .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),
    /*--- Fin  Datosde la Querella --- */


});
