import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  gridContainer: {
    display: "grid",
    gridGap: 10,
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
});
