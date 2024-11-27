import { useEffect } from 'react';
import { FormikProps } from 'formik';

const useFormikValidation = <T>(formik: FormikProps<T>) => {
    useEffect(() => {

        if (formik.isValid) {
            console.log('Formulario válido');
        } else {
            console.log('Formik Errors:', formik.errors);
            console.log('Formulario inválido');
        }
    }, [formik.errors, formik.isValid]);
};

export default useFormikValidation;
