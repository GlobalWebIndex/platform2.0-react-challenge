import { makeStyles } from "@mui/styles";
import { sharedStyles } from "../../constants/styles";

export const styles = makeStyles(() => ({
  background: {
    ...sharedStyles,
  },
  button: {
    "&.MuiButton-contained": {
      backgroundColor: "#8A7E6E",
      "&:hover": {
        backgroundColor: "#796D5E",
      },
      padding: "10px 20px",
    },
  },
}));
