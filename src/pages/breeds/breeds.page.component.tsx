import React, { useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Typography from "@mui/material/Typography";
import { getBreeds, ICatBreed } from '../../services/image.storage'
import { BreedDetailsComponent } from "./breed-details.component"
import { CustonBackdropComponent } from "../../common/custom-backdrop.component"

export function BreedsPageComponent() {
    const [breeds, setBreeds] = React.useState<ICatBreed[]>([]);
    const [breedToShow, setBreedToShow] = React.useState<ICatBreed | undefined>(undefined);
    const [isLoading, setIsLoading] = React.useState(false);

    const loadBreeds = async () => {
        setIsLoading(true)
        const breeds = await getBreeds();
        setBreeds(breeds)
        setIsLoading(false)
    }

    useEffect(() => {
        loadBreeds()
    }, []);

    return (
        <>
            {breedToShow && <BreedDetailsComponent handleClose={() => setBreedToShow(undefined)} breed={breedToShow} />}
            <CustonBackdropComponent isLoading={isLoading} />
            <ImageList
                variant="quilted"
                cols={4}
                rowHeight={120}
                style={{ overflow: "hidden", marginTop: 100, paddingBottom: 20 }}
                gap={40}
            >
                {breeds.map((item) => (

                    <ImageListItem key={item.id} cols={1} rows={1} >
                        <img
                            style={{
                                cursor: "pointer", borderRadius: 10, boxShadow: "0 2px 20px -10px gray"
                            }}
                            onClick={() => setBreedToShow(item)}
                            alt={item.name}
                            loading="lazy"
                            src={item.image.url || "https://image.shutterstock.com/image-vector/silhouette-missing-person-stamp-600w-752963539.jpg"}
                        />
                        <Typography >{item.name}</Typography>
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );

}
