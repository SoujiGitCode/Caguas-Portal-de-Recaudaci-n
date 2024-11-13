import * as yup from "yup";

export const validationSchema = yup.object().shape({
  id: yup.string(),
  email: yup
    .string()
    .email("Debe ser una dirección de correo electrónico válida"),
  depr_first_name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Debe contener solo letras y espacios")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  depr_second_name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Debe contener solo letras y espacios")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  depr_last_name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Debe contener solo letras y espacios")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  depr_second_last_name: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Debe contener solo letras y espacios")
    .min(2, "Mínimo 2 caracteres")
    .max(50, "Máximo 50 caracteres"),
  depr_birthdate: yup
    .date()
    .test(
      "age",
      "Debes ser mayor de 18 años y menor de 80 años",
      function (value) {
        if (value) {
          const birthDate = new Date(value);
          const currentDate = new Date();
          let age = currentDate.getFullYear() - birthDate.getFullYear();
          if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
              currentDate.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          return age >= 18 && age < 80;
        }
        return true;
      }
    ),
  depr_gender: yup.string(),
  depr_phone: yup.string().matches(/^[0-9]+$/, "Debe contener solo números"),
  social_security: yup
    .string()
    .required("Seguro Social requerido")
    .matches(/^[0-9*]+$/, "Solo debe contener números")
    .test('len', 'Deben ser 9 caracteres', val => val.length === 9)
    .matches(/^[0-9]+$/, "Debe contener solo números"),
});
