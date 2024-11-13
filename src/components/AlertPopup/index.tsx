import { Alert, Stack, AlertTitle } from "@mui/material";
import useAlert from "@/hooks/useAlert";

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text.length) {
    return (
      <Stack
        sx={{
          width: '20%',
          position: 'fixed',
          "z-index": 999,
          left: '0%',
          bottom: '0%'
        }}
        spacing={2}
      >
        <Alert severity={type}>
          <AlertTitle sx={{ textTransform: 'capitalize' }}>{
            type === 'success' ? 'Éxito' : type
          }</AlertTitle>
          {text}
        </Alert>
      </Stack>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
