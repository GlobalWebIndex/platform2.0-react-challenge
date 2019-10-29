import React, { useEffect, useState } from "react";
import { ReactComponent as DefaultImage } from "../assets/img/default_cat.svg";
import useCatLoverApp from "../hooks/useCatLoverApp";
import { isEmtyOrNullArrary } from "../helpers/general";
import { ReactComponent as Dislike } from "../assets/img/dislike.svg";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
// import DirectionsIcon from '@material-ui/icons/Directions';
import FileCopyIcon from "@material-ui/icons/FileCopy";
// import RouteComponentProps from "@reach/router"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 500
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },
    avatar: {
      backgroundColor: red[500]
    },
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
);

const CatDetailsContainer = (props: any) => {
  console.log("USE PROPS", props);
  const {
    setCatAsFavorite,
    getCatDetails,
    favoriteList,
    deleteFromFavorites,
    catItemLoaded,
    ResetLoaded,
    getFavouriteList,
  } = useCatLoverApp();
  console.log("USE FAVORITE LIST", favoriteList);

  let { selectedCat } = useCatLoverApp();

  let propsLocationExist = isEmtyOrNullArrary(props.data.location);
  let favoritesListExist = isEmtyOrNullArrary(favoriteList);
  let isfavourite;

  // set favourite cat
  const [stateFavourite, setCatfavourite] = useState('false');
  // set favourite cat from api
  // let selectedCat:any=[]
  //Get selected cat from route
  let selectedCatExist = isEmtyOrNullArrary(selectedCat);
  if (propsLocationExist) {
    selectedCat = [props.data.location.state.catitem];
    console.log("USE CAT", selectedCat);
  }

  let IsCatInfavouritesList: any = [];

  function isIsFavoriteList(obj: any, list: any) {
    if (favoritesListExist && selectedCatExist) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].image_id === obj[0].id) {
          IsCatInfavouritesList = [list[i]];
          return 'true';
        }
      }
    }
    return 'false';
  }

  const handleSetItemAsFaforite = () => {
    setCatAsFavorite(selectedCat[0].id, selectedCat).then((data)=>{
      console.log(data)
      setCatfavourite('true')
    })
  };

  const handleDeletItemFromFavorites = (e) => {

    let ismodal=false


    if(props.data.location.state.oldLocation.pathname=="/favourites"){
      ismodal=false
    }{
      ismodal=true
    }


    e.preventDefault()
    isIsFavoriteList(selectedCat,favoriteList)
    console.log("Before DDD",favoriteList)
      if(IsCatInfavouritesList.length>0){
     deleteFromFavorites(IsCatInfavouritesList[0].id, selectedCat,ismodal).then((data)=>{
       console.log(data)
     setCatfavourite('false')
    })
  }
    
  };

  //Check if route return location properties ex:(id param:)
  useEffect(() => {
    if (!propsLocationExist) {
      const d = {};
      if (!catItemLoaded) {
        getCatDetails(props.data.catId).then(data => {
          selectedCat = data;
          selectedCatExist = isEmtyOrNullArrary(selectedCat);
          // isfavourite = isIsFavoriteList(selectedCat, favoriteList);
        });
      }
      return () => {
        ResetLoaded();
      };
    }
  }, []);

  const checkIfIsFavourite = () => {

    let list = getFavouriteList()
    let isFav = isIsFavoriteList(selectedCat, list)
    console.log("dddd",isFav)
    return isFav

  };

  const HandleCopyLink = () => {
    var copyText: any = document.getElementById("LocationInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
  };

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      {console.log("staFavourite", stateFavourite)}
      {selectedCatExist ? (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                CT
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={
              isEmtyOrNullArrary(selectedCat[0].breeds)
                ? selectedCat[0].breeds[0].name
                : ""
            }
          />
          {selectedCatExist ? (
            <CardMedia
              className={classes.media}
              image={selectedCat[0].url}
              title="Paella dish"
            />
          ) : (
            <DefaultImage />
          )}

          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ wordBreak: "break-all" }}
            ></Typography>
          </CardContent>
          <CardActions disableSpacing>
            {checkIfIsFavourite() === "true" ? (
              <div className={"dislike"} onClick={handleDeletItemFromFavorites}>
                <Dislike />
              </div>
            ) : (
              <IconButton
                onClick={handleSetItemAsFaforite}
                aria-label="add to favorites"
              >
                <FavoriteIcon />
              </IconButton>
            )}
            <Paper className={classes.root}>
              <InputBase
                className={classes.input}
                id={"LocationInput"}
                value={props.data.location.href}
              />
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton
                onClick={HandleCopyLink}
                color="primary"
                className={classes.iconButton}
                aria-label="directions"
              >
                <FileCopyIcon />
              </IconButton>
            </Paper>
          </CardActions>
          {isEmtyOrNullArrary(selectedCat[0].breeds) ? (
            <div style={{ width: "100%" }}>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              {selectedCat[0].breeds.length > 0
                ? selectedCat[0].breeds[0].name
                : ""}{" "}
              breed details
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    {JSON.stringify(selectedCat[0].breeds)}
                  </Typography>
                  <Typography paragraph></Typography>
                </CardContent>
              </Collapse>{" "}
            </div>
          ) : null}
        </Card>
      ) : null}
    </div>
  );
};
export default React.memo(CatDetailsContainer);
