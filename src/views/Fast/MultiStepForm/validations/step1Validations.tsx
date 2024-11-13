import * as Yup from 'yup';

export const step1Validations = Yup.object().shape({
    email: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .required("Correo electrónico es requerido")
        .max(100, "máximo 100 caracteres"),

    confirmEmail: Yup.string()
        .required("Confirmar correo electrónico no puede estar vacío")
        .oneOf([Yup.ref('email')], 'Los correos electrónicos deben coincidir')
        .max(100, "máximo 100 caracteres"),

    captcha: Yup.string()
    // .required("Captcha es requerido")
});
