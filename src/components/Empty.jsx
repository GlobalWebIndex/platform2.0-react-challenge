import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "33vh",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));
/**
 * This duplicates DataGrid's behaviour, though it's useful
 * to have around, just in case.
 *
 * @returns Empty display.
 */
export default function Empty({
  children = <span>The server responded with zero rows.</span>
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h3">{children}</Typography>
    </div>
  );
}
