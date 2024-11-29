import * as Yup from 'yup';

export const Step4Validation = Yup.object().shape({
    // Información del Representante (Agent Info)
    agent_info_name: Yup.string()
        // .required("Nombre y Apellido del representante requerido")
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/, "Nombre inválido (solo letras y espacios)")
        .max(50, "Máximo 100 caracteres"),
    agent_info_email: Yup.string()
        // .required("Correo electrónico del representante requerido")
        .email("Debe ser un correo electrónico válido")
        .max(100, "Máximo 100 caracteres"),
    agent_info_role: Yup.string()
        // .required("Rol del representante requerido")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Rol inválido (solo letras, números y espacios)")
        .max(50, "Máximo 50 caracteres"),
    agent_info_social_security: Yup.string()
        .required("Número de Seguro Social del representante requerido")
        .matches(/^[0-9*]+$/, "Solo debe contener números")
        .test('len', 'Deben ser 9 caracteres', val => val.length === 9),

    // Información de los Propietarios (Owner Info)
    owner_info_name: Yup.string()
        // .required("Nombre del propietario requerido")
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/, "Nombre inválido (solo letras y espacios)")
        .max(50, "Máximo 100 caracteres"),
    owner_info_email: Yup.string()
        // .required("Correo electrónico del propietario requerido")
        .email("Debe ser un correo electrónico válido")
        .max(100, "Máximo 100 caracteres"),
    owner_info_role: Yup.string()
        // .required("Rol del propietario requerido")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Rol inválido (solo letras, números y espacios)")
        .max(50, "Máximo 50 caracteres"),
    owner_info_social_security: Yup.string()
        .required("Número de Seguro Social del propietario requerido")
        .matches(/^[0-9*]+$/, "Solo debe contener números")
        .test('len', 'Deben ser 9 caracteres', val => val.length === 9),
});
