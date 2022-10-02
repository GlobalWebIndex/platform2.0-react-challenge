import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { getImage, getFavourites, favouriteImage, unfavouriteImage, ICatPhoto } from '../../services/image.storage'
import { CustomCardComponent } from '../../common/custom-card.component';

export function CatDetailsComponent() {
    const [image, setImage] = React.useState<ICatPhoto | undefined>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isFavourite, setIsFavourite] = React.useState(false);
    const [copyClicked, setCopyClicked] = React.useState(false);

    const { id } = useParams();

    const onFavouriteImage = async () => {
        if (!id) {
            return;
        }
        await favouriteImage(id)
        setIsFavourite(true)
    }

    const onUnfavouriteImage = async () => {
        if (!id) {
            return;
        }
        const favourites = await getFavourites()
        const favourite = favourites.find(x => x.image_id == id)

        if (!favourite) {
            return
        }

        await unfavouriteImage(favourite.id)
        setIsFavourite(false)
    }

    const loadImage = async () => {
        if (!id) {
            return;
        }

        setIsLoading(true)
        const favouriteImageIds = (await getFavourites()).map(x => x.image_id);

        const image = await getImage(id)
        if (!image) {
            return
        }
        setIsFavourite(favouriteImageIds.includes(image.id))
        setImage(image);
        setIsLoading(false)
    }

    useEffect(() => {
        loadImage()
    }, []);

    return (
        <>
            <CustomCardComponent isLoading={isLoading}>
                {!isLoading && image ?
                    <>
                        <CardMedia
                            component="img"
                            src={image.url}
                        />
                        {
                            (image.breeds || []).map(x => (
                                <CardContent key={x.id}>
                                    <Typography variant="h6" color="text.secondary">
                                        {x.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {x.description}
                                    </Typography>
                                    <Divider variant="middle" sx={{ borderBottomWidth: 2, marginTop: 2, marginBot: 2 }} />
                                    <List>
                                        <ListItem key={"origin"}>
                                            <Typography variant="caption" color="text.secondary">{`Origin: ${x.origin} (${x.country_code})`}</Typography>
                                        </ListItem>
                                        <ListItem key={"temperament"}>
                                            <Typography variant="caption" color="text.secondary">{`Temperament: ${x.temperament} `}</Typography>
                                        </ListItem>
                                        <ListItem key={"weight"}>
                                            <Typography variant="caption" color="text.secondary">{`Weight (kg): ${x.weight.metric} `}</Typography>
                                        </ListItem>
                                        <ListItem key={"lifespan"}>
                                            <Typography variant="caption" color="text.secondary">{`Life span: ${x.life_span} `}</Typography>
                                        </ListItem>
                                    </List>


                                </CardContent>
                            ))
                        }
                        <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
                            <IconButton onClick={() => isFavourite ? onUnfavouriteImage() : onFavouriteImage()} aria-label="add to favorites" color={isFavourite ? "primary" : "default"}>
                                {isFavourite ? <FavoriteIcon sx={{ color: '#ed4957' }} /> : <FavoriteBorderIcon />}
                            </IconButton>
                            <Tooltip
                                title={copyClicked ? "Copied" : "Copy URL to clipboard"}
                                enterDelay={200}
                                onClose={() =>
                                    setTimeout(() => {
                                        setCopyClicked(false)
                                    }, 500)}>
                                <IconButton aria-label="copy-url"
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href)
                                        setCopyClicked(true)
                                    }}

                                >
                                    <ContentCopyIcon />
                                </IconButton>
                            </Tooltip>
                        </CardActions>
                    </> :
                    <></>
                }
            </CustomCardComponent>
        </>
    );

}
