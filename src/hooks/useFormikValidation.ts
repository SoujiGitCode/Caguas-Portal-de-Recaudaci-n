import { useEffect } from 'react';
import { FormikProps } from 'formik';

const useFormikValidation = <T>(formik: FormikProps<T>) => {
    useEffect(() => {
        console.log('Formik Errors:', formik.errors);
        console.log('Formik isValid:', formik.isValid);

        if (formik.isValid) {
            console.log('Formulario válido');
        } else {
            console.log('Formulario inválido');
        }
    }, [formik.errors, formik.isValid]);
};

export default useFormikValidation;
