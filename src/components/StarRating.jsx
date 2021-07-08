import { Typography } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    margin: theme.spacing(1)
  },
  stars: {
    display: "flex",
    flexFlow: "row nowrap",
    marginRight: theme.spacing(2)
  }
}));

export default function StarRating({ title, value }) {
  const classes = useStyles();
  if (![1, 2, 3, 4, 5].includes(value)) return null;
  return (
    <div className={classes.root}>
      <Typography color="textSecondary">{title}</Typography>
      <div className={classes.stars}>
        {new Array(value).fill(0).map((_) => (
          <StarIcon key={Math.random()} style={{ fill: "gold" }} />
        ))}
        {new Array(5 - value).fill(0).map((_) => (
          <StarBorderIcon style={{ fill: "black" }} />
        ))}
      </div>
    </div>
  );
}
