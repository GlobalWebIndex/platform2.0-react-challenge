import { Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    margin: theme.spacing(1)
  }
}));

export default function Display({ title, text }) {
  const classes = useStyles();
  if (!text) return null;
  return (
    <div className={classes.root}>
      <Typography color="textSecondary">{title}</Typography>
      <Typography>{text}</Typography>
    </div>
  );
}
