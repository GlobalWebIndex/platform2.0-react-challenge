import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  breedDetailsWrapper: {
    padding: 20,
  },
  breedDetailsHeading: { marginTop: 0 },
  breedDetailsImgGrid: {
    display: "grid",
    gridGap: 10,
    gridTemplateColumns: "repeat(4, 1fr)",
    marginBottom: 30,
    border: "1px solid #000",
  },
  breedDetailsImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  breedDetailsDescription: {
    lineHeight: "1.5",
  },
});
