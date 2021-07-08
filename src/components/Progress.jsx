import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

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

export default function Progress({ small = false }) {
  const classes = useStyles();

  return small ? (
    <CircularProgress color="secondary" />
  ) : (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
}
