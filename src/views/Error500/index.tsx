import { Box, Grid, Typography, Button } from "@mui/material";
import NoPage404 from "../../assets/500.png";
import { ErrorResponse500 } from "./object";
import { useNavigate } from "react-router-dom";
import styles from "./StyleError500.module.scss";

const Error404 = () => {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingTop: "7%",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingBottom: "20%",
          width: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <Box sx={{ width: "65%", paddingTop: "13%" }}>
            <Typography className={styles["title-500"]}>
              {ErrorResponse500.code}
            </Typography>
            <Typography className={styles["sub-title"]}>
              {ErrorResponse500.title}
            </Typography>
            <Typography className={styles["error-descriptions"]}>
              {ErrorResponse500.description}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "20rem",
            }}
          >
            <img
              src={NoPage404}
              alt="Error 404"
              style={{
                maxWidth: "29rem",
              }}
            />
          </Box>
        </Grid>

        {/*  */}

        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            className={styles["button-page-main"]}
            onClick={handleCancelClick}
          >
            Go to the main page
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Error404;
