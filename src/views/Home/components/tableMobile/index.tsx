import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import useAuthStore from "@/hooks/useAuthStore";
import StatusButton from "@/components/StatusButton";
import { getUserServices } from "../../functions";
import { IUserServicesData } from "../../types";
import styles from "./styles.module.scss";

interface IBasicTableProps {
  handleModal: (prop: string) => void;
  setDocumentId: (prop: string) => void;
  setCampusId: (prop: string) => void;
}

const BasicTableMobile: React.FC<IBasicTableProps> = ({
  handleModal,
  setDocumentId,
  setCampusId,
}) => {
  const token = useAuthStore((state: any) => state.token);
  const logout = useAuthStore((state: any) => state.setLogout);

  const [userServices, setUserServices] = useState<IUserServicesData[]>([]);

  const getUserServicesRows = async () => {
    try {
      const response = await getUserServices("1", token);
      setUserServices([response].flat());
    } catch (error) {
      if (error?.status === 404) logout()
    }
  };

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  }

  useEffect(() => {
    getUserServicesRows();
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ padding: "1rem", display: "flex", flexDirection: "row" }}
    >
      <TableContainer sx={{ width: "100vh" }}>
        <Table
          sx={{ width: "100%", justifyContent: "space-around" }}
          aria-label="simple table"
        >
          {/* TableHead should contain a single TableRow */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                <span
                  className={styles["typography"]}
                  style={{ fontSize: "1.1rem", paddingBottom: "0.05rem" }}
                >
                  Service
                </span>
              </TableCell>
              <TableCell sx={{ paddingLeft: "8%" }}>
                <span
                  className={styles["typography"]}
                  style={{ fontSize: "1rem" }}
                >
                  Time
                </span>
              </TableCell>
              <TableCell sx={{ padding: 0 }}>
                <Typography
                  className={styles["typography"]}
                  style={{ fontSize: "1rem" }}
                >
                  Days Left
                </Typography>
              </TableCell>
              <TableCell sx={{ paddingLeft: "4%" }}>
                <span
                  className={styles["typography"]}
                  style={{ fontSize: "1rem" }}
                >
                  Status
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userServices.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <span className={styles["typography"]}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        overflowY: "auto",
                        minHeight: "4.5rem",
                        maxHeight: "4.5rem",
                        minWidth: "16rem",
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": {
                          width: "0.4em",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {row.service} - {row.campus_name}
                    </Box>
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span className={styles["typography"]}>
                    {formatDate(row.created)}
                  </span>
                </TableCell>
                <TableCell
                  align="center"
                >
                  <Typography className={styles["typography"]}>
                    {row.days_to_expire}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ paddingTop: "1.5rem" }}>
                  <StatusButton statusName={row.status_desc as string} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* table 2 */}
      <TableContainer>
        <Table aria-label="simple table">
          {/* TableHead should contain a single TableRow */}
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <span
                  className={styles["typography"]}
                  style={{ fontSize: "1rem" }}
                >
                  Action
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userServices.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "4.5rem",
                      maxHeight: "4.5rem",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        handleModal(`${row.service} - ${row.campus_name}`);
                        setCampusId(row.campus_id);
                        setDocumentId(row.id);
                      }}
                    >
                      <VisibilityIcon
                        sx={{ color: "#009999", cursor: "pointer" }}
                      />
                    </IconButton>

                    <IconButton>
                      <DownloadIcon sx={{ color: "rgba(0, 168, 168, 0.42)" }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableContainer>
  );
};

export default BasicTableMobile;
