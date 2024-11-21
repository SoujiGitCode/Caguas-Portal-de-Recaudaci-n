import * as Yup from 'yup';

export const Step1Validation = Yup.object().shape({
    record_type: Yup.string()
        .required("Tipo de Registro requerido")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Formato inválido (solo letras, números y espacios)")
        .max(100, "Máximo 100 caracteres"),

    patent_type: Yup.string()
        .required("Tipo de Patente requerido")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Formato inválido (solo letras, números y espacios)")
        .max(100, "Máximo 100 caracteres"),

    general_fiscal_year_business_startup: Yup.string()
        .required("Año Fiscal requerido")
        .notOneOf(["0"], "Debe seleccionar un año fiscal válido"),

    general_phone: Yup.string()
        .required("Teléfono requerido")
        .test(
            "is-valid-phone",
            "El formato del teléfono es invalido",
            (value) => {
                if (!value) return false; // Si el valor está vacío, retorna falso
                return value.replace(/\D/g, "").length === 10; // Valida que el número limpio tenga 10 dígitos
            }
        ),

    general_social_security: Yup.string()
        .required("Seguro Social requerido")
        .matches(/^[0-9*]+$/, "Solo debe contener números")
        .test('len', 'Deben ser 9 caracteres', val => val.length === 9),


    general_company_name: Yup.string()
        .required("Nombre de la organización requerido")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Formato inválido (solo letras, números y espacios)")
        .max(100, "Máximo 100 caracteres"),

    general_first_name: Yup.string()
        .required("Nombre del contribuyente requerido")
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/, "Nombre inválido (solo letras y espacios)")
        .max(50, "Máximo 50 caracteres"),

    general_last_name: Yup.string()
        .required("Apellidos del contribuyente requeridos")
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/, "Apellidos inválidos (solo letras y espacios)")
        .max(50, "Máximo 50 caracteres"),

    general_second_name: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/, "Segundo nombre inválido (solo letras y espacios)")
        .max(50, "Máximo 50 caracteres")
        .notRequired(),

    general_second_last_name: Yup.string()
        .matches(/^[^\d_!¡?÷?¿/\\+=@#$%^&*(){}|~<>;:[\]]+$/, "Segundo apellido inválido (solo letras y espacios)")
        .max(50, "Máximo 50 caracteres")
        .notRequired(),
});
