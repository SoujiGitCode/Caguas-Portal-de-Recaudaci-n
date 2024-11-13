import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import Logo from "../../assets/images/logo.png";
import styles from "./Header.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import LockRounded from "@mui/icons-material/LockRounded";
import useAuthStore from "@/hooks/useAuthStore";
import useAlert from "@/hooks/useAlert";
import { PATH } from "@/routes/constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const primaryColor = "#009999";
  const placeholderColor = "rgba(51, 51, 51, 0.4)";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLogin = useAuthStore((state: any) => state.setLogin);
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const authenticateUser = async () => {
    try {
      await setLogin(email, password);
      navigate("/");
    } catch (error: any) {
      setAlert(error?.message, "error")
    }
  }

  return (
    <AppBar position="static">
      <Box className={styles["upper-header"]}>
        <Typography className={styles["upper-text"]}>
          <Link to={PATH.ROOT}>Home</Link>
        </Typography>
        <Typography className={styles["upper-text"]}>
          <Link to={PATH.REGISTER}>Register</Link>
        </Typography>
      </Box>
      <Toolbar className={styles["auth-header"]}>
        <Box className={styles["brand"]} sx={{ gap: 3 }}>
          <img src={Logo} alt="logo" className={styles["brand-img"]} />
          <Typography variant="h6" className={styles["header-text"]}>
            Student Portal
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            pr: 5,
          }}
        >
          <PersonIcon className={styles["header-icons"]} />
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: 'white !important',
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: primaryColor,
                borderRadius: 0,
                border: "2px solid " + primaryColor,
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: primaryColor,
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: primaryColor,
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                backgroundColor: 'white'
              },
              "& .MuiInputLabel-outlined": {
                fontSize: "1rem",
                color: placeholderColor,
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: primaryColor,
              },
              "& .MuiOutlinedInput-input": {
                padding: "0.7rem",
              },
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LockRounded className={styles["header-icons"]} />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: primaryColor,
                borderRadius: 0,
                border: "2px solid " + primaryColor,
              },
              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
              {
                borderColor: primaryColor,
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: primaryColor,
              },
              "& .MuiInputLabel-outlined": {
                fontSize: "1rem",
                color: placeholderColor,
              },
              "& .MuiInputLabel-outlined.Mui-focused": {
                color: primaryColor,
              },
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            className={styles["header-button"]}
            onClick={() => authenticateUser()}
          >
            Log In
          </Button>
          <div className={styles["icon-container"]} onClick={() => navigate("/recovery")}>
            <LockRounded className={styles["header-button-variant"]} />
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
