import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { useAPI } from "../hooks/useData";
import { ENDPOINTS } from "../constants";

import Progress from "../components/Progress";
import Error from "../components/Error";
import Favourite from "../components/Favourite";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "1rem",
    margin: "1rem"
  },
  imgContainer: {
    width: "30vw"
  },
  rel: {
    position: "relative"
  },
  abs: {
    position: "absolute",
    right: 16,
    bottom: 16
  },
  img: {
    width: "100%"
  }
}));

export default function FavouriteList() {
  const classes = useStyles();
  const [loading, favourites, error] = useAPI(
    ENDPOINTS.GET_FAVOURITES({
      sub_id: localStorage.SUB_ID
    })
  );
  if (loading) return <Progress />;
  if (error) return <Error />;
  return (
    <div className={classes.root}>
      {favourites.map(({ id, image: { url, id: iid } }) => (
        <div key={id} className={classes.imgContainer}>
          <div className={classes.rel}>
            <Link to={`/favourites/${iid}`}>
              <img
                className={classes.img}
                src={url}
                alt="one of your favourite images"
              />
            </Link>
            <Favourite catId={iid} className={classes.abs} />
          </div>
        </div>
      ))}
    </div>
  );
}
