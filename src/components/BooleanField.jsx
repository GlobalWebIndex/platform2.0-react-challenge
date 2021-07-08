import { Typography } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    margin: theme.spacing(1)
  }
}));
export default function BooleanField({ title, value }) {
  const classes = useStyles();
  if (value === null || value === undefined) return null;
  return (
    <div className={classes.root}>
      <Typography color="textSecondary">{title}</Typography>
      {value ? (
        <CheckIcon style={{ fill: "darkgreen" }} />
      ) : (
        <ClearIcon style={{ fill: "red" }} />
      )}
    </div>
  );
}
