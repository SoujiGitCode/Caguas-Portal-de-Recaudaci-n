import { useEffect, useState } from "react";
import { Tab, Box, Grid, Modal, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ClearIcon from "@mui/icons-material/Clear";
import useAuthStore from "@/hooks/useAuthStore";
import { IRequiredDocumentsProps, IUserDocumentsData } from "../../types";
import { getUserDocuments } from "../functions";
import styles from "./styles.module.scss";
import RequiredDocumentsTable from "../RequiredDocumentsTable";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const RequiredDocuments = ({
  title,
  open,
  campusId,
  documentId,
  handleClose,
}: IRequiredDocumentsProps) => {
  const [value, setValue] = useState("1");
  const [documentList, setDocumentList] = useState<IUserDocumentsData[]>([]);
  const token = useAuthStore((state: any) => state.token);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    return () => {
      setValue("1");
    };
  }, []);

  useEffect(() => {
    requestUserDocument();
  }, [campusId, value]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  //
  function truncateText(texto: string): string {
    if (texto.length <= 28) {
      return texto;
    } else {
      return texto.slice(0, 28);
    }
  }

  const requestUserDocument = async () => {
    try {
      const response = await getUserDocuments(
        campusId,
        token,
        documentId,
        parseInt(value, 10)
      );
      setDocumentList(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        outline: "none",
        border: "none",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "65vw",
          maxHeight: "90vh",
          overflowY: "auto",
          p: 4,
          bgcolor: "#ffffff",
          opacity: "1",

          ...(isMobile && {
            width: "93vw",
            borderRadius: 2,
            padding: "0.3rem",
            height: "80vh",
          }),
        }}
      >
        <Grid container>
          <TabContext value={value}>
            <Grid container>
              <Grid item xs={12} xl={8}>
                {/* version standar */}
                <Typography
                  variant="h6"
                  className={styles["subtitle"]}
                  sx={{
                    ...(isMobileSmall && {
                      display: "none",
                    }),
                  }}
                >
                  {title}
                </Typography>

                {/* version mobile */}
                <Typography
                  variant="h6"
                  className={styles["subtitle"]}
                  sx={{
                    display: "none",
                    ...(isMobileSmall && {
                      fontSize: "1.3rem",
                      paddingTop: "1rem",
                      display: "flex",
                      paddingLeft: "1rem",
                    }),
                  }}
                >
                  {truncateText(title)}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    ...(isMobileSmall && {
                      width: "50vw",
                    }),
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    textColor="primary"
                    indicatorColor="primary"
                    centered
                  >
                    <Tab
                      label="Sent"
                      value="1"
                      sx={{
                        sdisplay: "flex",
                        textTransform: "none",
                        ...(isMobile && {
                          fontSize: "1.1rem",
                        }),
                      }}
                    />
                    <Tab
                      label="Received"
                      value="2"
                      sx={{
                        sdisplay: "flex",
                        textTransform: "none",
                        ...(isMobile && {
                          fontSize: "1.1rem",
                        }),
                      }}
                    />
                  </TabList>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TabPanel
                value="1"
                sx={{
                  ...(isMobile && {
                    padding: "0.4rem",
                  }),
                }}
              >
                <RequiredDocumentsTable documentList={documentList} />
              </TabPanel>
              <TabPanel
                value="2"
                sx={{
                  ...(isMobile && {
                    padding: "0.4rem",
                  }),
                }}
              >
                <RequiredDocumentsTable documentList={documentList} />
              </TabPanel>
            </Grid>
          </TabContext>
        </Grid>
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
      </Box>
    </Modal>
  );
};

export default RequiredDocuments;
