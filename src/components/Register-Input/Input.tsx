import React from 'react';
import { Grid, TextField, InputAdornment } from '@mui/material';
import stylesInput from './Input.module.sass'

interface Props {
  id: string;
  htmlFor: string;
  placeholder: string;
  size?: string; 
  type?: string;
  icon?: React.ReactNode; // Prop para el icono
}

const Input: React.FC<Props> = ({ id, htmlFor, placeholder, size, type, icon }) => {
  const inputProps = {
    style: { width: size },
  };

  return (
    <Grid item>
      <div className={stylesInput.imputForms}>
        <div className={stylesInput.inputTextUp}>
          <label htmlFor={htmlFor} className={stylesInput.inputLabeldiv}>{htmlFor}</label>
        </div>
        <div>
          <TextField
            id={id}
            placeholder={placeholder}
            variant="outlined"
            className={stylesInput.inputTextUp}
            type={type}
            inputProps={inputProps}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {icon}
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </Grid>
  );
};

export default Input;
