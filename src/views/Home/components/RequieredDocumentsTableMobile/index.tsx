import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { tableHeaders } from "../RequiredDocumentsTable/constants";
import StatusButton from "@/components/StatusButton";
import { IUserDocumentsData } from "../../types";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MessageModal from "../MessageModal";
import ChatIcon from "@mui/icons-material/Chat";

interface RequiredDocumentsTableProps {
  documentList: IUserDocumentsData[];
}

const RequiredDocumentsTableMobile: React.FC<RequiredDocumentsTableProps> = ({
  documentList,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  // <----------------------------- View Mobile ------------------------------------>

  const displayModal = (message: string) => {
    setOpenModal(true);
    setModalMessage(message);
  };

  return (
    <TableContainer sx={{ display: "flex", flexDirection: "row" }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead sx={{ height: "10vh" }}>
            <TableRow>
              {tableHeaders?.map((header) => {
                if (header.title !== "Action") {
                  return (
                    <TableCell align="center" key={header.id}>
                      {header.title}
                    </TableCell>
                  );
                }
                return null;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {documentList.length ? (
              documentList?.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                      }}
                    >
                      <Box
                        key={row.id}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          overflowY: "auto",
                          minHeight: "4.5rem",
                          maxHeight: "4.5rem",
                          minWidth: "12rem",
                          scrollbarWidth: "none",
                          "&::-webkit-scrollbar": {
                            width: "0.4em",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "transparent",
                          },
                          backgroundColor: "#e9e8e8",
                          paddingLeft: "1rem",
                          borderBottomLeftRadius: "10px",
                          borderTopLeftRadius: "10px",
                          paddingRight: "0rem",
                          width: "193%",
                        }}
                      >
                        <Typography sx={{ width: "13rem" }}>
                          {row.description}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography>{formatDate(row.created)}</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        padding: "0rem",
                      }}
                    >
                      <StatusButton statusName={row.status_desc as string} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell align="center" scope="row">
                  <Typography textAlign="center">
                    No hay contenido aquí
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <MessageModal
          open={openModal}
          message={modalMessage}
          handleClose={() => setOpenModal(false)}
        />
      </TableContainer>
      <TableContainer sx={{ width: "15vh" }}>
        <Table aria-label="simple table">
          <TableHead sx={{ height: "10vh" }}>
            <TableRow>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentList.length ? (
              documentList?.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    {/* actions */}
                    <TableCell
                      sx={{
                        paddingLeft: 0,
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          overflowY: "auto",
                          minHeight: "4.5rem",
                          maxHeight: "4.5rem",
                          backgroundColor: "#e9e8e8",
                          width: "100%",
                          borderTopRightRadius: "10px",
                          borderBottomRightRadius: "10px",
                        }}
                      >
                        {row.url ? (
                          <a
                            href={row.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <VisibilityIcon
                              sx={{ color: "#009999", cursor: "pointer" }}
                            />
                          </a>
                        ) : (
                          <VisibilityIcon
                            sx={{
                              color: "#009999",
                              cursor: "default",
                              opacity: 0.5,
                            }}
                          />
                        )}

                        {row.ob_message && (
                          <ChatIcon
                            sx={{
                              fontSize: "1.4rem",
                              color: "#f7941d",
                              cursor: "pointer",
                              marginLeft: "0.5rem !important",
                            }}
                            onClick={() => displayModal(row.ob_message)}
                          />
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell align="center" scope="row"></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <MessageModal
          open={openModal}
          message={modalMessage}
          handleClose={() => setOpenModal(false)}
        />
      </TableContainer>
    </TableContainer>
  );
};

export default RequiredDocumentsTableMobile;
