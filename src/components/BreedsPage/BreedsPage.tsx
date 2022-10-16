import { useContext } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

import { CatContext } from "../../Context/CatContext";
import { styles } from "./styles";

const BreedsPage = () => {
  const context = useContext(CatContext);
  const { breeds, setSelectedBreed } = context;

  const classes = styles();

  return (
    <Grid
      alignItems="center"
      className={classes.background}
      container
      flexDirection="column"
      item
    >
      {breeds.map((breed, idx) => (
        <Grid alignItems="center" container item key={idx} xs={1}>
          <Link
            className={classes.link}
            onClick={() => setSelectedBreed(breed)}
            to={`/breeds/${breed.id}`}
          >
            <Typography
              className={classes.title}
              textAlign="center"
              variant="body1"
            >
              {breed.name}
            </Typography>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default BreedsPage;
