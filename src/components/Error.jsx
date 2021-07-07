import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useEffect } from "react";

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

export default function Error({
  error,
  children = (
    <span>
      An error occured :( <br /> We&apos;ll be back sooon
    </span>
  )
}) {
  const classes = useStyles();
  useEffect(() => {
    // Replace this with Centralized Error reporting: e.g. Stackdriver
    window.console.error(error);
  }, [error]);
  return (
    <div className={classes.root}>
      <Typography component="h3">{children}</Typography>
    </div>
  );
}
