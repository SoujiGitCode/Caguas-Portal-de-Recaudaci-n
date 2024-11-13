import React, { useState, useEffect } from 'react';
import { TextField, IconButton, InputAdornment } from "@mui/material";


const SocialSecurityInput = ({ formik, name = 'social_security', setSocialSecurityArray, socialSecurityArray, id = 'social_security' }) => {
  // Estado para almacenar el valor real (numérico) del SSN
  const [realSSN, setRealSSN] = useState('');
  // Estado para almacenar el valor enmascarado y formateado para visualización
  const [displaySSN, setDisplaySSN] = useState('');

  // Función para enmascarar y formatear el SSN para la visualización
  const maskAndFormatSSN = (ssn) => {
    // Enmascara los primeros 5 números y mantiene los últimos 4 dígitos visibles
    let masked = ssn.slice(0, 5).replace(/\d/g, 'X') + ssn.slice(5);
    // Añade guiones para el formato
    if (masked.length > 3) masked = masked.slice(0, 3) + '-' + masked.slice(3);
    if (masked.length > 6) masked = masked.slice(0, 6) + '-' + masked.slice(6);
    return masked;
  };

  // Manejador para cambios en el input
  const handleChange = (e) => {

    const input = e.target.value.replace(/-/g, ''); // Elimina guiones para manejar solo números
    if (input.length <= 9) { // Asegura no exceder la longitud del SSN
      setRealSSN(input); // Actualiza el estado con el valor real
      setDisplaySSN(maskAndFormatSSN(input)); // Actualiza el estado con el valor enmascarado y formateado
    }
  };


  // Manejador para cambios en el input
  const handleChange2 = (e) => {
    const { value: currentValue } = e.target;
    // Elimina guiones para simplificar la detección de cambios
    let inputWithoutHyphens = currentValue.replace(/-/g, '');


    if (displaySSN.length > 10 && inputWithoutHyphens.length > realSSN.length) {
      console.log("Límite alcanzado. Solo se permite borrar.");
      // Permite solo la acción de borrado ajustando `inputWithoutHyphensAndX` para reflejar el estado anterior
      inputWithoutHyphens = realSSN;
    }



    // Detecta si se ha añadido un nuevo dígito o si se está borrando
    if (inputWithoutHyphens.length > realSSN.length) {
      // Se ha añadido un dígito
      const newDigit = inputWithoutHyphens.charAt(inputWithoutHyphens.length - 1);
      console.log("Nuevo dígito ingresado:", newDigit);


      if (newDigit.match(/\d/)) {
        if (realSSN.length < 9) setRealSSN(realSSN + newDigit);
      }

    } else if (inputWithoutHyphens.length < realSSN.length) {
      // Se ha borrado un dígito
      console.log("Se ha borrado un dígito");
      setRealSSN(inputWithoutHyphens);
    }

    // Continúa con la lógica de enmascaramiento y formateo
    const maskedValue = maskAndFormatSSN(inputWithoutHyphens);
    if (realSSN.length < 9) setDisplaySSN(maskedValue);
    setDisplaySSN(maskedValue);
  };


  // Detecta específicamente la acción de borrar
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      setRealSSN((prev) => prev.slice(0, -1));
    }

    if (!e.key.match(/[0-9]/) && e.key.length === 1) {
      console.log('new val')
      e.preventDefault();
    }
  };

  // Efecto para actualizar Formik cuando cambia el realSSN
  useEffect(() => {
    // console.log(realSSN)
    setSocialSecurityArray(realSSN.split('')); // Opcional: Actualiza un array externo si es necesario
    setDisplaySSN(maskAndFormatSSN(realSSN));
  }, [realSSN]);

  useEffect(() => {
    console.log(socialSecurityArray)
    formik.setFieldValue("social_security", socialSecurityArray.join(""));
  }, [socialSecurityArray]);

  useEffect(() => {
    // console.log('render on ssi')
    // console.log(socialSecurityArray.join(""))
    // setDisplaySSN(socialSecurityArray.join("").split(''));
    setDisplaySSN(maskAndFormatSSN(socialSecurityArray.join("")));
    console.log(socialSecurityArray.join(''))
    setRealSSN(socialSecurityArray.join(''));
  }, []);

  return (
    <>
      <TextField
        id='social_security'
        name='social_security'
        value={displaySSN}
        onChange={handleChange2}
        onKeyDown={handleKeyDown}
        placeholder="XXX-XX-XXXX"
        onBlur={formik.handleBlur}
        error={formik.touched.social_security && Boolean(formik.errors.social_security)}
        helperText={formik.touched.social_security && typeof formik.errors.social_security === 'string' ? formik.errors.social_security : undefined}
      />
    </>

  );
};

export default SocialSecurityInput;
