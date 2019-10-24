import React from "react";
import useCatLoverApp from "../../hooks/useCatLoverApp";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Location } from "@reach/router";
import Avatar from "@material-ui/core/Avatar";
import { ReactComponent as DefaultImage } from "../../assets/img/default_cat.svg";
import { ReactComponent as Dislike } from "../../assets/img/dislike.svg";

const useStyles = makeStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    border: "5px solid pink",
    width: 100,
    height: 100,
    cursor: "pointer",
    margin: "5px"
  }
});

const FavouriteCatitem = (data: any) => {
  const { deleteFromFavorites } = useCatLoverApp();

  const classes = useStyles(makeStyles);
  
  let { url, id } = data.data.image;
  let item = data.data;

  const handleDeletItemFromFavorites = () => {
    deleteFromFavorites(data.data.id,'')
  }
 
  return (
    <Location>
      {({ location }) => (
        <div>
        <Link
          state={{
            catitem: item,
            oldLocation: JSON.parse(JSON.stringify(location))
          }}
          draggable
          to={`/cat/${id}`}
        >
          {url ? (
            <Avatar alt="Remy Sharp" src={url} className={classes.bigAvatar} />
          ) : (
            <DefaultImage />
          )}
        </Link>
        <div className={'dislike'} onClick={handleDeletItemFromFavorites}>
          <Dislike/>
        </div>
        </div>
      )}
    </Location>
  );
};
export default FavouriteCatitem;
