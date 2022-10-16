import { makeStyles } from "@mui/styles";
import { sharedClasses } from "../../constants/styles";

export const sharedTextStyle = makeStyles(() => ({
  ...sharedClasses,
}));

export const catItemStyles = makeStyles(() => ({
  image: {
    width: "100%",
    height: "300px",
    borderRadius: "30px",
    border: "5px solid #8A7E6E",
  },
}));
