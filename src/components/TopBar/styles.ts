import { makeStyles } from "@mui/styles";
import { sharedClasses, sharedStyles } from "../../constants/styles";

export const styles = makeStyles(() => ({
  ...sharedClasses,
  background: {
    ...sharedStyles,
    borderRadius: "30px",
  },
}));
