import { Typography } from '@mui/material';

interface CustomLabelProps {
    name: string;
    required: boolean;
}

const CustomLabel = ({ name, required }: CustomLabelProps) => (
  <Typography variant="body1" sx={{ py: 1 }}>
    {name} {required && <span style={{ color: 'red', position: 'relative', bottom: '-0.2em' }}>*</span>}
  </Typography>
);

export default CustomLabel;
