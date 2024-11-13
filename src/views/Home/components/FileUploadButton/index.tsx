import React, { useState, useRef, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FileUploadButton = () => {
    const [fileName, setFileName] = useState('');
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = (): void => {
        hiddenFileInput.current?.click();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files && event.target.files.length > 0) {
            const fileUploaded = event.target.files[0];
            setFileName(fileUploaded.name); // Actualiza el estado con el nombre del archivo
        }
    };

    return (
        <>
            <TextField
                variant="filled"
                disabled
                value={fileName}
                placeholder="Nombre del archivo..."
                InputProps={{
                    endAdornment: (
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<UploadFileIcon />}
                            onClick={handleClick}
                            sx={{ fontSize: '0.8rem !important', width: '40%', margin: '0px !important' }}
                        >
                            Subir
                        </Button>
                    ),
                }}
                sx={{
                    maxWidth: '100%', // Ajusta según sea necesario
                    marginRight: '0px !important', // Espaciado entre el TextField y el botón, ajusta según sea necesario
                    padding: '0 !important'
                }}
            />
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    );
};

export default FileUploadButton;
