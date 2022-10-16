import { makeStyles } from "@mui/styles";
import { sharedStyles } from "../../constants/styles";

export const styles = makeStyles(() => ({
  background: {
    ...sharedStyles,
    borderRadius: "none",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "400px",
  },
}));
