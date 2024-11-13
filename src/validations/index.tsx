
import * as Yup from 'yup';

export const validationSet1 = {
    field1: Yup.string().required('Campo 1 es requerido'),
    field2: Yup.number().required('Campo 2 es requerido'),
    // Otras validaciones para este conjunto...
};