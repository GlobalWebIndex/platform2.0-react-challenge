import React, { useEffect, useState } from "react";
import { ReactComponent as DefaultImage } from "../assets/img/default_cat.svg";
import useCatLoverApp from "../hooks/useCatLoverApp"
import { isEmtyOrNullArrary } from "../helpers/general"
import { ReactComponent as Dislike } from "../assets/img/dislike.svg";

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import DirectionsIcon from '@material-ui/icons/Directions';
import FileCopyIcon from '@material-ui/icons/FileCopy';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 500,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9

    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);

const CatDetailsContainer = (props: any) => {
  console.log("USE PROPS", props)
  const { selectedCat, setCatAsFavorite, getCatDetails, favoriteList, deleteFromFavorites,getCatFavouriteList ,catIdLoaded } = useCatLoverApp()
  console.log("USE CAT", selectedCat)
  console.log("USE FAVORITE LIST", favoriteList)

  let propsLocationExist = isEmtyOrNullArrary(props.data.location)
  let favoritesListExist = isEmtyOrNullArrary(favoriteList)
  let selectedCatExist = isEmtyOrNullArrary(selectedCat)

  const [stateFavourite, setCatfavourite] = useState(false)

  let IsCatInfavouritesList: any = []

  function isIsFavoriteList(obj: any, list: any) {
      for (var i = 0; i < list.length; i++) {
        if (list[i].image_id === obj[0].id) {
          IsCatInfavouritesList = [list[i]]
          return true;
        }
      }
    return false;
  }


  const handleSetItemAsFaforite = () => {
    setCatAsFavorite(selectedCat[0].id, selectedCat)

  }
  const handleDeletItemFromFavorites = () => {
    deleteFromFavorites(IsCatInfavouritesList[0].id, selectedCat)
  }

  //Check if route return location properties ex:(id param:)
  useEffect(() => {
    if (!propsLocationExist) {
      if(props.data.catId!==catIdLoaded){
       getCatDetails(props.data.catId)
      }
      console.log("propsLocationExist USE LIST", propsLocationExist)
    }
    if (!favoritesListExist) {
       getCatFavouriteList()
      console.log("favoritesListExist USE LIST", favoritesListExist)
    }

  }, []);
  useEffect(() => {
    if (favoritesListExist&&selectedCatExist) {
       setCatfavourite(isIsFavoriteList(selectedCat, favoriteList))
      console.log("isCatFavourite USE", isIsFavoriteList(selectedCat, favoriteList))
    }
  });
  const hasSelectedCat = () => {
    if (selectedCat == []) {
      return selectedCat.length < 0
    }
  }

  const HandleCopyLink=()=>{
    var copyText:any = document.getElementById("LocationInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("Copied the text: " + copyText.value);
  }




  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
    {selectedCatExist?<Card className={classes.card}>
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
        title={isEmtyOrNullArrary(selectedCat[0].breeds)?selectedCat[0].breeds[0].name:''}
      />
      {selectedCatExist ? (<CardMedia
        className={classes.media}
        image={selectedCat[0].url}
        title="Paella dish"
      />) : <DefaultImage />}

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" style={{ wordBreak: 'break-all' }}>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {stateFavourite ? <div className={'dislike'} onClick={handleDeletItemFromFavorites}><Dislike/></div> : <IconButton onClick={handleSetItemAsFaforite} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>}
        <Paper className={classes.root}>
          <InputBase
        className={classes.input}
        id={'LocationInput'}
        value={props.data.location.href}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton  onClick={HandleCopyLink} color="primary" className={classes.iconButton} aria-label="directions">
      <FileCopyIcon />
      </IconButton>
    </Paper>
        
      </CardActions>
      {isEmtyOrNullArrary(selectedCat[0].breeds)?
      <div style={{width:'100%'}}>
      <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <ExpandMoreIcon />
        </IconButton>
        {selectedCat[0].breeds.length>0?selectedCat[0].breeds[0].name:''} breed details
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
          <Typography paragraph>
      {JSON.stringify(selectedCat[0].breeds)}
     
          </Typography>
          <Typography paragraph>
          </Typography>
        </CardContent>
      </Collapse> </div>:null}
    </Card>
   :null}
    
    </div>
  );
}
export default CatDetailsContainer;
