import { Grid } from "@mui/material";

import NotFound from "./NotFound";
import CatItem from "./CatItem";
import { Cat } from "../../types/types";

type Props = {
  cats: Cat[];
};

const CatsList: React.FC<Props> = ({ cats }) => {
  return (
    <Grid container item justifyContent="center" xs={12}>
      {cats.length ? (
        <>
          {cats.map((cat, i) => (
            <CatItem cat={cat} key={i} />
          ))}
        </>
      ) : (
        <NotFound />
      )}
    </Grid>
  );
};

export default CatsList;
