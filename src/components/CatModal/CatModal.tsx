import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, Grid } from "@mui/material";

import FavouriteButton from "../FavouriteButton/FavouriteButton";
import BreedDetails from "../BreedDetails/BreedDetails";
import { CatContext } from "../../Context/CatContext";
import { getCatById } from "../../api/api";
import { styles } from "./styles";

const CatModal = () => {
  const navigate = useNavigate();
  const { catId } = useParams();

  const { selectedCat, setSelectedCat } = useContext(CatContext);

  useEffect(() => {
    const getCat = async () => {
      if ((!selectedCat || !selectedCat.breeds) && catId) {
        const selCat = await getCatById(catId);
        setSelectedCat(selCat);
      }
    };

    getCat();
  }, []);

  const breed = selectedCat?.breeds?.[0];

  const classes = styles();

  if (!selectedCat) return null;

  return (
    <Dialog
      open
      onClose={() => {
        navigate(-1);
        setSelectedCat(null);
      }}
      PaperProps={{ sx: { borderRadius: "20px" } }}
    >
      <Grid container justifyContent="center" className={classes.background}>
        <Grid container item justifyContent="center">
          <img className={classes.image} src={selectedCat?.url} />
        </Grid>
        <Grid item xs="auto">
          <FavouriteButton cat={selectedCat} />
        </Grid>
        {breed ? <BreedDetails breed={breed} /> : null}
      </Grid>
    </Dialog>
  );
};

export default CatModal;
