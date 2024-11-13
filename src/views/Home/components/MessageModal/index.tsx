import { Box, Grid, Modal, Typography, Button } from "@mui/material";
import { modalStyle, title } from "./constants";
import { IMessageModal } from "@/views/Home/types";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./styles.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const MessageModal = ({ open, handleClose, message }: IMessageModal) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            maxHeight: "90vh",
            overflowY: "auto",
            p: 4,
            bgcolor: "#fff",
            opacity: "1",
          }}
        >
          <Grid container>
            <Grid item xs={12} sx={{ marginBottom: "1rem" }}>
              <Typography variant="body1" className={styles["title"]}>
                {title}
              </Typography>
              <ClearIcon
                sx={{
                  position: "absolute",
                  top: "5%",
                  right: "2%",
                  color: "gray",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "1rem",
              }}
            >
              <Typography>{message}</Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={{ marginTop: "1rem !important" }}
            className={styles["button"]}
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Grid container>
          <Grid item xs={12} sx={{ marginBottom: "1rem !important" }}>
            <Typography variant="body1" className={styles["title"]}>
              {title}
            </Typography>
            <ClearIcon
              sx={{
                position: "absolute",
                top: "5%",
                right: "2%",
                color: "gray",
                cursor: "pointer",
              }}
              onClick={handleClose}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              border: "1px solid gray",
              borderRadius: "5px",
              padding: "1rem",
            }}
          >
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{ marginTop: "1rem !important" }}
          className={styles["button"]}
          onClick={handleClose}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default MessageModal;
