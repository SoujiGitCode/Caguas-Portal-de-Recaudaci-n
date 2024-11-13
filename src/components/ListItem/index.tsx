import { Grid, Box, Typography, Link } from "@mui/material";
import styles from "./styles.module.scss";

interface ResponsiveComponentProps {
  number: string;
  listItem: string;
  description: string;
  url: string;
}

const ListItem: React.FC<ResponsiveComponentProps> = ({
  number,
  listItem,
  description,
  url,
}) => {
  return (
    <Grid item xs={12} className={styles["container"]}>
      <Box className={styles["circle"]}>
        <Typography className={styles["number"]}>{number}</Typography>
      </Box>
      <Box className={styles["services"]}>
        {/* <Link href={url} className={styles["link"]}>
          <Typography variant="h5" className={styles["list-item"]}>
            {listItem}
          </Typography>
        </Link> */}
        <Typography variant="h5" className={styles["list-item"]}>
          {listItem}
        </Typography>
        <Typography className={styles["list-item-description"]}>
          {description}
        </Typography>
      </Box>
    </Grid>
  );
};

export default ListItem;
