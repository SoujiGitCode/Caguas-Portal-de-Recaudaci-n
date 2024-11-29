import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

// Definimos la interfaz para un mapeo de etiquetas
interface LabelMapping {
    label: string;
    requestLabel: string;
    step: string;
    subtitle: string;
}

interface FormStepLabel {
    step: string;
    title: string;
}

// Props del componente
interface PatentDataTableProps {
    data: Record<string, any>; // Objeto con la información a renderizar
    labels?: LabelMapping[]; // Array de etiquetas (opcional)
    formStepLabels?: FormStepLabel[]; // Títulos de los pasos
    isMobile?: boolean; // Prop para manejar estilos responsivos
}

const defaultLabels: LabelMapping[] = [
    // Step 1: Registro de nuevo negocio Tipo de Persona Jurídica y Patente
    { label: "Tipo de Registro", requestLabel: "record_type", step: "1", subtitle: "Registro de nuevo negocio Tipo de Persona Jurídica y Patente" },
    { label: "Tipo de Patente", requestLabel: "patent_type", step: "1", subtitle: "Registro de nuevo negocio Tipo de Persona Jurídica y Patente" },

    // Step 1: Registro de nuevo negocio Datos generales de la patente
    { label: "Personal Natural o Empresa", requestLabel: "general_tsc", step: "1", subtitle: "Registro de nuevo negocio Datos generales de la patente" },
    { label: "Año Fiscal en que comenzó operaciones", requestLabel: "general_fiscal_year_business_startup", step: "1", subtitle: "Registro de nuevo negocio Datos generales de la patente" },
    { label: "Teléfono", requestLabel: "general_phone", step: "1", subtitle: "Registro de nuevo negocio Datos generales de la patente" },
    { label: "Seguro Social", requestLabel: "general_social_security", step: "1", subtitle: "Registro de nuevo negocio Datos generales de la patente" },
    { label: "Nombre de la organización", requestLabel: "general_company_name", step: "1", subtitle: "Registro de nuevo negocio Datos generales de la patente" },
    { label: "Nombre", requestLabel: "general_first_name", step: "1", subtitle: "Registro de nuevo negocio Datos generales de la patente" },
    { label: "Apellido", requestLabel: "general_last_name", step: "1", subtitle: "Registro de nuevo negocio Datos generales de la patente" },
    { label: "Segundo Nombre", requestLabel: "general_second_name", step: "1", subtitle: "Registro de nuevo negocio Datos generales de la patente" },

    // Step 2: Registro de nuevo negocio Sección Direcciones: Dirección Postal
    { label: "Dirección 1", requestLabel: "postal_address_line1", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Postal" },
    { label: "Dirección 2", requestLabel: "postal_address_line2", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Postal" },
    { label: "Número de Propiedad", requestLabel: "postal_address_number", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Postal" },
    { label: "País", requestLabel: "postal_address_country", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Postal" },
    { label: "Ciudad/Condado", requestLabel: "postal_address_city", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Postal" },
    { label: "Código Postal", requestLabel: "postal_address_zipcode", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Postal" },

    // Step 2: Registro de nuevo negocio Sección Direcciones: Dirección Física (Obligatorio)
    { label: "Dirección 1", requestLabel: "address_line1", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Física (Obligatorio)" },
    { label: "Dirección 2", requestLabel: "address_line2", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Física (Obligatorio)" },
    { label: "Número de Propiedad", requestLabel: "address_number", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Física (Obligatorio)" },
    { label: "País", requestLabel: "address_country", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Física (Obligatorio)" },
    { label: "Estado", requestLabel: "address_state", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Física (Obligatorio)" },
    { label: "Ciudad/Condado", requestLabel: "address_city", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Física (Obligatorio)" },
    { label: "Código Postal", requestLabel: "address_zipcode", step: "2", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Física (Obligatorio)" },

    // Step 3: Registro de nuevo negocio Sección Direcciones: Dirección Residencial del contribuyente (Natural u Organización)
    { label: "Dirección 1", requestLabel: "taxpayerhome_address_line1", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Residencial del contribuyente (Natural u Organización)" },
    { label: "Dirección 2", requestLabel: "taxpayerhome_address_line2", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Residencial del contribuyente (Natural u Organización)" },
    { label: "Número de Propiedad", requestLabel: "taxpayerhome_address_number", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Residencial del contribuyente (Natural u Organización)" },
    { label: "País", requestLabel: "taxpayerhome_address_country", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Residencial del contribuyente (Natural u Organización)" },
    { label: "Estado", requestLabel: "taxpayerhome_address_state", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Residencial del contribuyente (Natural u Organización)" },
    { label: "Ciudad/Condado", requestLabel: "taxpayerhome_address_city", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Residencial del contribuyente (Natural u Organización)" },
    { label: "Código Postal", requestLabel: "taxpayerhome_address_zipcode", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección Residencial del contribuyente (Natural u Organización)" },

    // Step 3: Registro de nuevo negocio Sección Direcciones: Dirección de Oficina del contribuyente (Natural u Organización)" 
    { label: "Dirección 1", requestLabel: "taxpayerwork_address_line1", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección de Oficina del contribuyente (Natural u Organización)" },
    { label: "Dirección 2", requestLabel: "taxpayerwork_address_line2", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección de Oficina del contribuyente (Natural u Organización)" },
    { label: "Número de Propiedad", requestLabel: "taxpayerwork_address_number", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección de Oficina del contribuyente (Natural u Organización)" },
    { label: "País", requestLabel: "taxpayerwork_address_country", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección de Oficina del contribuyente (Natural u Organización)" },
    { label: "Estado", requestLabel: "taxpayerwork_address_state", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección de Oficina del contribuyente (Natural u Organización)" },
    { label: "Ciudad/Condado", requestLabel: "taxpayerwork_address_city", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección de Oficina del contribuyente (Natural u Organización)" },
    { label: "Código Postal", requestLabel: "taxpayerwork_address_zipcode", step: "3", subtitle: "Registro de nuevo negocio Sección Direcciones: Dirección de Oficina del contribuyente (Natural u Organización)" },

    // Step 4: Registro de nuevo negocio Sección Información de Dueño o Presidente
    { label: "Nombre", requestLabel: "agent_info_name", step: "4", subtitle: "Registro de nuevo negocio Sección Información de Dueño o Presidente" },
    { label: "Correo Electrónico", requestLabel: "agent_info_email", step: "4", subtitle: "Registro de nuevo negocio Sección Información de Dueño o Presidente" },
    { label: "Posición del Dueño o Representante", requestLabel: "agent_info_role", step: "4", subtitle: "Registro de nuevo negocio Sección Información de Dueño o Presidente" },
    { label: "Seguro Social", requestLabel: "agent_info_social_security", step: "4", subtitle: "Registro de nuevo negocio Sección Información de Dueño o Presidente" },
    // Step 4: Información del Presidente (Solo aplica para Organizaciones)
    { label: "Nombre", requestLabel: "owner_info_name", step: "4", subtitle: "Información del Presidente (Solo aplica para Organizaciones)" },
    { label: "Correo Electrónico", requestLabel: "owner_info_email", step: "4", subtitle: "Información del Presidente (Solo aplica para Organizaciones)" },
    { label: "Posición del Dueño o Representante", requestLabel: "owner_info_role", step: "4", subtitle: "Información del Presidente (Solo aplica para Organizaciones)" },
    { label: "Seguro Social", requestLabel: "owner_info_social_security", step: "4", subtitle: "Información del Presidente (Solo aplica para Organizaciones)" },

    // Step 5: Registro de nuevo negocio Sección Información del Negocio
    { label: "Fecha de comienzo de operaciones", requestLabel: "business_info_startup_date", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "Nombre de la localidad (Según Registro de Comerciante)", requestLabel: "business_info_location_name", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "Clase de Industria (Código Naics)", requestLabel: "business_info_industry", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "Actividad del Negocio", requestLabel: "business_info_activity", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "Número de Registro de Comerciante", requestLabel: "business_info_register_number", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "Fecha de vencimiento del Registro de Comerciante", requestLabel: "business_info_register_number_expiration_date", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "¿Es agente de retención?", requestLabel: "business_info_withholding_agent", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "Cantidad de empleados", requestLabel: "business_info_employees", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "Costo anual de nómina", requestLabel: "business_info_total_annual_labor_costs", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "Número de Catastro (Si aplica)", requestLabel: "business_info_cadastral_reference_number", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "¿Requiere Permiso de Uso?", requestLabel: "business_info_require_permit_use", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "Número del Permiso de Uso", requestLabel: "business_info_permit_use_number", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "Fecha de vencimiento del Permiso de Uso", requestLabel: "business_info_permit_use_number_expiration_date", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" },
    { label: "Descripción del Permiso de Uso (80 Caracteres)", requestLabel: "business_info_permit_use_number_description", step: "5", subtitle: "Registro de nuevo negocio Sección Información del Negocio" }

];

// Default titles for steps
const defaultFormStepLabels: FormStepLabel[] = [
    { step: "1", title: "Datos Generales" },
    { step: "2", title: "Dirección Postal y Física" },
    { step: "3", title: "Dirección Contribuyente" },
    { step: "4", title: "Información Dueños y Representante" },
    { step: "5", title: "Información Negocio" },
];

const PatentDataTable = ({
    data,
    labels = defaultLabels,
    formStepLabels = defaultFormStepLabels,
    isMobile,
}: PatentDataTableProps) => {

    // Agrupamos las etiquetas por 'step' y luego por 'subtitle'
    const groupedLabels = labels.reduce((acc, label) => {
        acc[label.step] = acc[label.step] || {};
        acc[label.step][label.subtitle] = acc[label.step][label.subtitle] || [];
        acc[label.step][label.subtitle].push(label);
        return acc;
    }, {} as Record<string, Record<string, LabelMapping[]>>);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column", // Coloca los pasos en una sola columna
                alignItems: "center", // Centra el contenido
                width: "100%",
                margin: "0 auto",
                padding: isMobile ? "0.5rem" : "4rem",
            }}
        >
            {Object.entries(groupedLabels).map(([step, subtitles]) => {
                const stepTitle =
                    formStepLabels.find((formStep) => formStep.step === step)?.title ||
                    `Formulario ${step}`;

                return (
                    <Box
                        key={step}
                        sx={{
                            marginBottom: "2rem",
                            width: "100%",
                            maxWidth: isMobile ? "100%" : "800px",
                            textAlign: "center", // Centra el título
                        }}
                    >
                        {/* Título del paso */}
                        <Typography
                            variant="h6"
                            sx={{
                                marginY: "1.5rem !important", // Margen inferior para stepLabels
                                fontWeight: "bold",
                                color: "#333",
                                textTransform: "capitalize",
                                fontSize: isMobile ? "1.2rem" : "1.4rem",
                            }}
                        >
                            {stepTitle}
                        </Typography>

                        {/* Subtítulos y tablas */}
                        {Object.entries(subtitles).map(([subtitle, subtitleLabels]) => (
                            <Box
                                key={subtitle}
                                sx={{
                                    marginBottom: "2rem",
                                    maxWidth: isMobile ? "100%" : "100%",
                                    margin: "0 auto",
                                }}
                            >
                                {/* Subtítulo */}
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        marginY: "1rem !important", // Margen vertical para subtitles
                                        fontWeight: "bold",
                                        color: "#555",
                                        fontSize: isMobile ? "1rem" : "1.2rem",
                                        textAlign: "center", // Centra el subtítulo
                                    }}
                                >
                                    {subtitle}
                                </Typography>

                                {/* Tabla */}
                                <TableContainer>
                                    <Table
                                        sx={{
                                            width: "100%",
                                            maxWidth: isMobile ? "100%" : "100%",
                                            margin: "0 auto", // Centra la tabla
                                            tableLayout: "fixed", // Uniformiza las celdas
                                        }}
                                    >
                                        <TableBody>
                                            {subtitleLabels.map(({ label, requestLabel }, index) => (
                                                <TableRow
                                                    key={requestLabel}
                                                    sx={{
                                                        borderBottom: "1px solid #ddd",
                                                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                                                    }}
                                                >
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: "bold",
                                                            color: "#333",
                                                            fontSize: "0.9rem",
                                                            padding: "8px 16px",
                                                            textAlign: "left",
                                                        }}
                                                    >
                                                        {label}
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            color: "#666",
                                                            fontSize: "0.9rem",
                                                            padding: "8px 16px",
                                                            wordBreak: "break-word",
                                                            textAlign: "left",
                                                        }}
                                                    >
                                                        {data[requestLabel] || "N/A"}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        ))}
                    </Box>
                );
            })}
        </Box>



    );
};

export default PatentDataTable;
