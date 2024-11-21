import * as Yup from 'yup';

export const registerValidation = Yup.object().shape({

    firstName: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Nombre invalido")
        .required("Primer Nombre requerido")
        .max(20, "máximo 20 caracteres"),

    middleName: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo Nombre invalido")
        .max(20, "máximo 20 caracteres"),

    lastName: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Apellido invalido")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    secondLastName: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/u, "Segundo Apellido invalido")
        .max(20, "máximo 20 caracteres"
        ),

    email: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .required("Correo electrónico es requerido")
        .max(100, "máximo 100 caracteres"),

    phone: Yup.string()
        .required("Teléfono requerido")
        .matches(/^[0-9*]+$/, "El formato del teléfono debe ser (XXX) XXX-XXXX")
        .max(14, "El teléfono no debe exceder 10 caracteres"),

    social_security: Yup.string()
        .required("Seguro Social requerido")
        .matches(/^[0-9*]+$/, "Solo debe contener números")
        .test('len', 'Deben ser 9 caracteres', val => val.length === 9),

    security_answer1: Yup.string()
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Respuesta con formato inválido")
        .required("Respuesta requerida")
        .max(30, "Máximo 30 caracteres"),

    security_answer2: Yup.string()
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Respuesta con formato inválido")
        .required("Respuesta requerida")
        .max(30, "Máximo 30 caracteres"),

    security_answer3: Yup.string()
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Respuesta con formato inválido")
        .required("Respuesta requerida")
        .max(30, "Máximo 30 caracteres"),

    password: Yup.string()
        .required("Contraseña no puede estar vacío")
        .matches(
            /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\;])[a-zA-Z\d!@#$%^&*();]{8,}$/,
            "La contraseña debe tener al menos 8 caracteres, un número, una letra mayúscula y un símbolo"
        )
        .max(20, "máximo 20 caracteres"),
    repeatPassword: Yup.string()
        .required("Confirmar Contraseña no puede estar vacío")
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        .max(20, "máximo 20 caracteres"),

    num_reg_merchant: Yup.string()
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Registro Comercial inválido")
        .required("N° Registro Comercial Requerido")
        .max(20, "Máximo 20 caracteres"),

    num_reg_municipal: Yup.string()
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Registro Municipal inválido")
        .required("N° Registro Municipal Requerido")
        .max(20, "Máximo 20 caracteres"),


});
