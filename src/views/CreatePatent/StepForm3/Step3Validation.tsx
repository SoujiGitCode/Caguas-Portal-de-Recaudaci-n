import * as Yup from 'yup';

import { VALID_COUNTRIES, MAIN_COUNTRY } from "../functions"


export const Step3Validation = Yup.object().shape({
    // Dirección Residencial del Contribuyente
    taxpayerhome_address_line1: Yup.string()
        // .required("Dirección 1 requerida")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s,.#-]+$/, "Formato inválido (solo letras, números, espacios y caracteres válidos como ,. # -)")
        .max(100, "Máximo 100 caracteres"),
    taxpayerhome_address_line2: Yup.string()
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s,.#-]*$/, "Formato inválido (solo letras, números, espacios y caracteres válidos como ,. # -)")
        .max(100, "Máximo 100 caracteres")
        .notRequired(),
    taxpayerhome_address_number: Yup.string()
        // .required("Número de Propiedad requerido")
        .matches(/^[0-9]+$/, "Solo debe contener números"),
    taxpayerhome_address_country: Yup.string()
        // .required('País requerido')
        .oneOf(VALID_COUNTRIES, 'Debes seleccionar un país válido'),
    taxpayerhome_address_state: Yup.string()
        .when('taxpayerhome_address_country', {
            is: (value: string) => value === MAIN_COUNTRY,
            then: (schema) =>
                schema.required('Estado requerido').matches(/^[a-zA-Z\s]+$/, 'Formato inválido (solo letras y espacios)').max(50, 'Máximo 50 caracteres'),
            otherwise: (schema) => schema.notRequired(),
        }),
    taxpayerhome_address_city: Yup.string()
        .when('taxpayerhome_address_country', {
            is: (value: string) => value === MAIN_COUNTRY,
            then: (schema) =>
                schema.required('Ciudad requerida').matches(/^[a-zA-Z\s]+$/, 'Formato inválido (solo letras y espacios)').max(50, 'Máximo 50 caracteres'),
            otherwise: (schema) => schema.notRequired(),
        }),
    taxpayerhome_address_zipcode: Yup.string()
        // .required("Código Postal requerido")
        .matches(/^[0-9]{5}$/, "Debe ser un código postal válido de 5 dígitos"),

    // Dirección de Oficina del Contribuyente
    taxpayerwork_address_line1: Yup.string()
        // .required("Dirección 1 requerida")
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s,.#-]+$/, "Formato inválido (solo letras, números, espacios y caracteres válidos como ,. # -)")
        .max(100, "Máximo 100 caracteres"),
    taxpayerwork_address_line2: Yup.string()
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s,.#-]*$/, "Formato inválido (solo letras, números, espacios y caracteres válidos como ,. # -)")
        .max(100, "Máximo 100 caracteres")
        .notRequired(),
    taxpayerwork_address_number: Yup.string()
        // .required("Número de Propiedad requerido")
        .matches(/^[0-9]+$/, "Solo debe contener números"),
    taxpayerwork_address_country: Yup.string()
        // .required('País requerido')
        .oneOf(VALID_COUNTRIES, 'Debes seleccionar un país válido'),
    taxpayerwork_address_state: Yup.string()
        .when('taxpayerwork_address_country', {
            is: (value: string) => value === MAIN_COUNTRY,
            then: (schema) =>
                schema
                    .required('Estado requerido')
                    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Formato inválido (solo letras y espacios)'),
            otherwise: (schema) => schema.notRequired(),
        }),
    taxpayerwork_address_city: Yup.string()
        .when('taxpayerwork_address_country', {
            is: (value: string) => value === MAIN_COUNTRY,
            then: (schema) =>
                schema
                    .required('Ciudad requerida')
                    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Formato inválido (solo letras y espacios)'),
            otherwise: (schema) => schema.notRequired(),
        }),
    taxpayerwork_address_zipcode: Yup.string()
        // .required("Código Postal requerido")
        .matches(/^[0-9]{5}$/, "Debe ser un código postal válido de 5 dígitos"),
});
