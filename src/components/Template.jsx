import { Grid, Typography, Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NA_TEXT } from "../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    width: "calc(100% - 2em)",
    padding: "1em"
  },
  paper: {
    padding: theme.spacing(2)
  },
  divider: { marginBottom: "1em" }
}));

export function CompanyTemplate({
  datum: {
    description = NA_TEXT,
    developer = NA_TEXT,
    found_date: foundDate = NA_TEXT,
    headquarter = NA_TEXT,
    id = NA_TEXT,
    name = NA_TEXT,
    technologies = NA_TEXT,
    tm_rating: tmRating = NA_TEXT
  }
}) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="overline">
            {headquarter}, since {foundDate}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline" gutterBottom>
            description
          </Typography>
          <br />
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Typography variant="overline">Technologies</Typography>
          <br />
          <Typography variant="body1">{technologies}</Typography>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Typography variant="overline">Developers #</Typography>
          <br />
          <Typography variant="body1">{developer}</Typography>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Typography variant="overline">Rating⭐</Typography>
          <br />
          <Typography variant="body1">{tmRating}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider className={classes.divider} />
          <Typography variant="h6" gutterBottom>
            Audit Results 📜
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
