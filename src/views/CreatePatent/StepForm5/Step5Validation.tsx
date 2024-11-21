import * as Yup from 'yup';

export const Step5Validation = Yup.object().shape({
    business_info_startup_date: Yup.date()
        .required('Fecha de inicio es requerida')
        .typeError('Formato inválido (yyyy-mm-dd)'),

    business_info_location_name: Yup.string()
        .required('Nombre de la localidad es requerido')
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Formato inválido (solo letras, números y espacios)')
        .max(100, 'Máximo 100 caracteres'),

    business_info_industry: Yup.string()
        .required('Industria es requerida')
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Formato inválido (solo letras, números y espacios)')
        .max(100, 'Máximo 100 caracteres'),

    business_info_activity: Yup.string()
        .required('Actividad del negocio es requerida')
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Formato inválido (solo letras, números y espacios)')
        .max(100, 'Máximo 100 caracteres'),

    business_info_register_number: Yup.string()
        .required('Número de registro es requerido')
        .matches(/^[0-9]+$/, 'Formato inválido (solo números)')
        .max(15, 'Máximo 15 caracteres'),

    business_info_register_number_expiration_date: Yup.date()
        .required('Fecha de vencimiento del registro es requerida')
        .typeError('Formato inválido (yyyy-mm-dd)'),

    business_info_withholding_agent: Yup.string()
        .required('¿Es agente de retención? es requerido')
        .oneOf(['0', '1'], 'Debe seleccionar una opción válida'),

    business_info_employees: Yup.string()
        .required('Cantidad de empleados es requerida')
        .matches(/^[0-9]+$/, 'Formato inválido (solo números)')
        .max(10, 'Máximo 10 caracteres'),

    business_info_total_annual_labor_costs: Yup.string()
        .required('Costo anual de nómina es requerido')
        .matches(/^[0-9]+$/, 'Formato inválido (solo números)')
        .max(15, 'Máximo 15 caracteres'),

    business_info_cadastral_reference_number: Yup.string()
        .matches(/^[0-9]+$/, 'Formato inválido (solo números)')
        .max(20, 'Máximo 20 caracteres')
        .notRequired(),

    business_info_require_permit_use: Yup.string()
        .required('¿Requiere permiso de uso? es requerido')
        .oneOf(['0', '1'], 'Debe seleccionar una opción válida'),

    business_info_permit_use_number: Yup.string()
        .matches(/^[0-9]+$/, 'Formato inválido (solo números)')
        .max(15, 'Máximo 15 caracteres')
        .notRequired(),

    business_info_permit_use_number_expiration_date: Yup.date()
        .typeError('Formato inválido (yyyy-mm-dd)')
        .notRequired(),

    business_info_permit_use_number_description: Yup.string()
        .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]+$/, 'Formato inválido (solo letras, números y espacios)')
        .max(80, 'Máximo 80 caracteres')
        .notRequired(),
});
