import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
    Grid,
    FormControl,
    Box,
    FormHelperText,
    Typography,
    Checkbox,
    FormControlLabel,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { CustomLabel } from "@/components";

interface ConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void; // Lógica a ejecutar después de la validación
    isMobile: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    onClose,
    onConfirm,
    isMobile
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);
        const isPasswordValid = password.trim() !== "";

        setIsFormValid(isEmailValid && isPasswordValid);
    }, [email, password]);

    const handleConfirm = () => {
        if (isFormValid) {
            onConfirm();
            onClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
            sx={{
                "& .MuiDialog-paper": {
                    padding: "2rem", // Más espacio interno
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                },
            }}
        >
            <DialogTitle
                id="confirm-dialog-title"
                sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.5rem", // Tamaño de fuente más claro
                }}
            >
                Confirmación de Envío
            </DialogTitle>
            <DialogContent sx={{ justifyContent: 'center', display: 'flex' }}>

                <Box
                    component="form"
                    sx={{
                        width: isMobile ? "100%" : '400px',
                        alignItems: "center", // Centramos todo el contenido
                    }}
                >
                    <Typography
                        variant="body1"
                        sx={{
                            marginBottom: "1.5rem",
                            fontSize: "1rem",
                            color: "#555",
                        }}
                    >
                        ¿Está seguro de que desea enviar la información? Una vez enviada, no podrá
                        realizar cambios. Por favor, ingrese su correo electrónico y contraseña
                        para confirmar.
                    </Typography>

                    <FormControl
                        fullWidth
                        margin="normal"
                        required
                        sx={{ marginBottom: "0.5em !important" }}
                    >
                        <CustomLabel name="Correo Electrónico" required={true} />
                        <TextField
                            placeholder="correo"
                            name="email"
                            id="email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl
                        fullWidth
                        margin="normal"
                        required
                    >
                        <CustomLabel name="Contraseña" required={true} />
                        <TextField
                            name="password"
                            id="password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions
                sx={{
                    justifyContent: "center",
                    marginTop: "1rem",
                    gap: "1rem", // Espaciado uniforme entre botones
                }}
            >
                <Button
                    variant="outlined"
                    color="error"
                    onClick={onClose}
                    sx={{
                        width: "150px",
                        height: "45px",
                        borderRadius: "32px",
                        fontWeight: "bold",
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleConfirm}
                    disabled={!isFormValid}
                    sx={{
                        width: "150px",
                        height: "45px",
                        borderRadius: "32px",
                        fontWeight: "bold",
                    }}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>

    );
};

export default ConfirmationDialog;
