import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Dialog, Grid, ImageList, ImageListItem } from "@mui/material";

import BreedDetails from "../BreedDetails/BreedDetails";
import FavouriteButton from "../FavouriteButton/FavouriteButton";
import { CatContext } from "../../Context/CatContext";
import { getCatsByBreed } from "../../api/api";
import { Cat, Breed } from "../../types/types";
import { styles } from "./styles";

const BreedModal = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);

  const navigate = useNavigate();
  const { breedId } = useParams();

  const { breeds, setSelectedCat } = useContext(CatContext);

  useEffect(() => {
    const selBreed = breeds.find((breed: Breed) => breed.id === breedId);
    if (selBreed) setSelectedBreed(selBreed);
  }, [breeds]); // in case someone uses the url to navigate to a breed (the breeds take some time to load)

  useEffect(() => {
    const getCats = async () => {
      if (selectedBreed) {
        const cats = await getCatsByBreed(selectedBreed.id);
        setCats(cats);
      }
    };
    getCats();
  }, [selectedBreed]); // because the breed is initially null and we set it on the previous useEffect

  const classes = styles();

  if (!selectedBreed) return null;

  return (
    <Dialog
      onClose={() => {
        navigate(-1);
        setSelectedBreed(null);
      }}
      open
      PaperProps={{ sx: { borderRadius: "20px" } }} // this is the only way to change the border radius of the dialog
    >
      <Grid className={classes.background} container>
        <ImageList cols={cats.length} rowHeight={300} variant="quilted">
          {/* cols=cats.length because the api doesn't always return 3 cats */}
          {cats.map((cat) => (
            <Grid container justifyContent="center" key={cat.id}>
              <Link onClick={() => setSelectedCat(cat)} to={`/cats/${cat.id}`}>
                <ImageListItem cols={1} rows={1}>
                  <img alt="Cat Photo" loading="lazy" src={cat.url} />
                </ImageListItem>
              </Link>

              <FavouriteButton cat={cat} />
            </Grid>
          ))}
        </ImageList>

        <BreedDetails breed={selectedBreed} />
      </Grid>
    </Dialog>
  );
};

export default BreedModal;
