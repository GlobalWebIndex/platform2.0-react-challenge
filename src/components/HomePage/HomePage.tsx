import { Button, Grid } from "@mui/material";
import { useContext, useState } from "react";

import { getRandomCats } from "../../api/api";
import { CatContext } from "../../Context/CatContext";
import CatsList from "../CatsList/CatsList";
import { styles } from "./styles";

const HomePage = () => {
  const [page, setPage] = useState<number>(0);

  const context = useContext(CatContext);
  const { loading, randomCats, setLoading, setRandomCats } = context;

  const onLoadMore = async () => {
    setLoading(true);

    const data = await getRandomCats(page + 1);
    setRandomCats([...randomCats, ...data]);
    setPage(page + 1);

    setLoading(false);
  };

  const classes = styles();

  return (
    <Grid
      className={classes.background}
      container
      item
      justifyContent="center" // so that the button is centered
    >
      <CatsList cats={randomCats} />
      {!loading && randomCats.length ? (
        <Grid item xs="auto">
          <Button
            className={classes.button}
            disableRipple
            onClick={onLoadMore}
            size="large"
            variant="contained"
          >
            Load More
          </Button>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default HomePage;
