import * as Yup from 'yup';

export const Step2Validation = Yup.object().shape({
    // Dirección Postal
    postal_address_line1: Yup.string()
        .required("Dirección 1 requerida")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s,.#-]+$/, "Formato inválido (solo letras, números, espacios y caracteres válidos como ,. # -)")
        .max(100, "Máximo 100 caracteres"),
    postal_address_line2: Yup.string()
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s,.#-]*$/, "Formato inválido (solo letras, números, espacios y caracteres válidos como ,. # -)")
        .max(100, "Máximo 100 caracteres")
        .notRequired(),
    postal_address_number: Yup.string()
        .required("Número de Propiedad requerido")
        .matches(/^[0-9]+$/, "Solo debe contener números"),
    postal_address_country: Yup.string()
        .required("País requerido")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Formato inválido (solo letras y espacios)")
        .max(50, "Máximo 50 caracteres"),
    postal_address_state: Yup.string()
        .required("Estado requerido")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Formato inválido (solo letras y espacios)")
        .max(50, "Máximo 50 caracteres"),
    postal_address_city: Yup.string()
        .required("Ciudad requerida")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Formato inválido (solo letras y espacios)")
        .max(50, "Máximo 50 caracteres"),
    postal_address_zipcode: Yup.string()
        .required("Código Postal requerido")
        .matches(/^[0-9]{5}$/, "Debe ser un código postal válido de 5 dígitos"),

    // Dirección Física
    address_line1: Yup.string()
        .required("Dirección 1 requerida")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s,.#-]+$/, "Formato inválido (solo letras, números, espacios y caracteres válidos como ,. # -)")
        .max(100, "Máximo 100 caracteres"),
    address_line2: Yup.string()
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s,.#-]*$/, "Formato inválido (solo letras, números, espacios y caracteres válidos como ,. # -)")
        .max(100, "Máximo 100 caracteres")
        .notRequired(),
    address_number: Yup.string()
        .required("Número de Propiedad requerido")
        .matches(/^[0-9]+$/, "Solo debe contener números"),
    address_country: Yup.string()
        .required("País requerido")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Formato inválido (solo letras y espacios)")
        .max(50, "Máximo 50 caracteres"),
    address_state: Yup.string()
        .required("Estado requerido")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Formato inválido (solo letras y espacios)")
        .max(50, "Máximo 50 caracteres"),
    address_city: Yup.string()
        .required("Ciudad requerida")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, "Formato inválido (solo letras y espacios)")
        .max(50, "Máximo 50 caracteres"),
    address_zipcode: Yup.string()
        .required("Código Postal requerido")
        .matches(/^[0-9]{5}$/, "Debe ser un código postal válido de 5 dígitos"),
});
