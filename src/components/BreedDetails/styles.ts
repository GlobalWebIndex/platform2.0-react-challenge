import { makeStyles } from "@mui/styles";
import { sharedClasses } from "../../constants/styles";

export const headerStyles = makeStyles(() => ({
  ...sharedClasses,
}));

export const attributeStyles = makeStyles(() => ({
  bold: {
    fontWeight: "bold",
  },
  emptyColor: {
    color: "#ABA090",
  },

  filledColor: {
    color: "#8A7E6E",
  },
}));
