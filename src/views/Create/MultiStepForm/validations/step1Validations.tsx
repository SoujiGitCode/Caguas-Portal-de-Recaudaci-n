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

    captcha: Yup.string(),
    // .required("Captcha es requerido")

    identification: Yup.string()
        .required("Número de identificación requerido")
        .matches(/^[0-9]+$/, "solo debe contener números")
        .max(20, "máximo 20 caracteres"),

    first_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Primer Nombre solo debe contener letras")
        .required("Primer Nombre requerido")
        .max(20, "máximo 20 caracteres"),

    second_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Segundo Nombre solo debe contener letras")
        .max(20, "máximo 20 caracteres"),

    last_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Apellido solo debe contener letras")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    second_last_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Segundo Apellido solo debe contener letras")
        .required("Segund Apellido requerido")
        .max(20, "máximo 20 caracteres"
        ),

    depr_first_name: Yup.string()
        .matches(/^[\p{L}]+( [\p{L}]+)*$/u, "El nombre solo debe contener letras y espacios simples entre palabras")
        .required("Primer nombre requerido")
        .max(20, "máximo 20 caracteres"),

    depr_second_name: Yup.string()
        .matches(/^[\p{L}]+( [\p{L}]+)*$/u, "El Segundo nombre solo debe contener letras y espacios simples entre palabras")
        .max(20, "máximo 20 caracteres"),

    depr_last_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Apellido solo debe contener letras")
        .required("Apellido requerido")
        .max(20, "máximo 20 caracteres"),

    depr_second_last_name: Yup.string()
        .matches(/^[\p{L}]+$/u, "El Segundo Apellido solo debe contener letras")
        .required("Segund Apellido requerido")
        .max(20, "máximo 20 caracteres"
        ),


    birthdate: Yup.string().required("Fecha de nacimiento requerida"),

    phone: Yup.string()
        .required("Teléfono requerido")
        .matches(/^[0-9*]+$/, "El formato del teléfono debe ser (XXX) XXX-XXXX")
        .max(14, "El teléfono no debe exceder 10 caracteres"),

    social_security: Yup.string()
        .required("Seguro Social requerido")
        .matches(/^[0-9*]+$/, "Solo debe contener números")
        .test('len', 'Deben ser 9 caracteres', val => val.length === 9),


    email1: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .max(100, "máximo 100 caracteres")
        .test('email1-duplicate-check-email2', 'El correo electrónico no puede repetirse con email2', function (value) {
            const { email2 } = this.parent;
            if (value && value === email2) {
                return false;
            }
            return true;
        })
        .test('email1-duplicate-check-email', 'El correo electrónico no puede repetirse con email', function (value) {
            const { email } = this.parent;
            if (value && value === email) {
                return false;
            }
            return true;
        }),

    email2: Yup.string()
        .email("Dirección de correo electrónico no válida")
        .max(100, "máximo 100 caracteres")
        .test('email2-duplicate-check-email1', 'El correo electrónico no puede repetirse con email1', function (value) {
            const { email1 } = this.parent;
            if (value && value === email1) {
                return false;
            }
            return true;
        })
        .test('email2-duplicate-check-email', 'El correo electrónico no puede repetirse con email', function (value) {
            const { email } = this.parent;
            if (value && value === email) {
                return false;
            }
            return true;
        }),

    confirmEmail1: Yup.string()
        .test('is-email1-confirm-required', 'Confirmar correo electrónico no puede estar vacío', function (value) {
            const { email1 } = this.parent;
            if (email1 && typeof email1 === 'string' && email1.trim().length > 0 && (!value || value.trim().length === 0)) {
                return false;
            }
            return true;
        })
        .oneOf([Yup.ref('email1')], 'Los correos electrónicos deben coincidir')
        .max(100, "Máximo 100 caracteres"),

    confirmEmail2: Yup.string()
        .test('is-email2-confirm-required', 'Confirmar correo electrónico no puede estar vacío', function (value) {
            const { email2 } = this.parent;
            if (email2 && typeof email2 === 'string' && email2.trim().length > 0 && (!value || value.trim().length === 0)) {
                return false;
            }
            return true;
        })
        .oneOf([Yup.ref('email2')], 'Los correos electrónicos deben coincidir')
        .max(100, "Máximo 100 caracteres"),

    schoolTown: Yup.string()
        .required('Este campo es requerido')
        .notOneOf([''], 'Por favor, seleccione un Pueblo  válido'),

    school_code: Yup.string()
        .required('Este campo es requerido')
        .notOneOf([''], 'Por favor, seleccione una Escuela  válida'),

    grade: Yup.string()
        .required('Este campo es requerido')
        .notOneOf([''], 'Por favor, seleccione una Nivel Académico válido'),

    grade_year: Yup.string()
        .required('Este campo es requerido')
        .matches(/^\d{4}$/, 'Debe contener exactamente 4 números')
        .notOneOf([''], 'Por favor, seleccione un año válido'),

    certification_type_id: Yup.string()
        .required('Este campo es requerido')
        .notOneOf([''], 'Por favor, seleccione una Certificado válido'),

});
