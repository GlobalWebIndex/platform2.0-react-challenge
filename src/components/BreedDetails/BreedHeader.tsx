import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Divider, Grid, Typography, Tooltip } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

import { CatContext } from "../../Context/CatContext";
import { Breed } from "../../types/types";
import { headerStyles } from "./styles";

type Props = {
  breed: Breed;
};

const BreedHeader: React.FC<Props> = ({ breed }) => {
  const { catId } = useParams();

  const { setSelectedBreed } = useContext(CatContext);

  const classes = headerStyles();

  const breedName = catId ? ( // if catId exists then it mean the cat modal is open (we need to make the name a link)
    <Link
      className={classes.link}
      onClick={() => setSelectedBreed(breed)}
      to={`/breeds/${breed.id}`}
    >
      <Tooltip placement="top" title={`Visit the ${breed.name} page `}>
        <Typography
          className={classes.textColor}
          fontWeight="bold"
          textAlign="center"
          variant="h3"
        >
          {breed.name}
          <LinkIcon />
        </Typography>
      </Tooltip>
    </Link>
  ) : (
    <Typography
      className={classes.textColor}
      fontWeight="bold"
      textAlign="center"
      variant="h3"
    >
      {breed.name}
    </Typography>
  );

  return (
    <>
      <Grid alignItems="center" item p={2} xs={12}>
        {breedName}
        {breed.alt_names ? (
          <Typography textAlign="center" variant="h5">
            ({breed.alt_names})
          </Typography>
        ) : null}
        <Typography pt={2} textAlign="center" variant="body2">
          {breed.description}
        </Typography>
      </Grid>

      <Grid item mt={2} xs={12}>
        <Divider orientation="horizontal" variant="fullWidth" />
      </Grid>
    </>
  );
};

export default BreedHeader;
