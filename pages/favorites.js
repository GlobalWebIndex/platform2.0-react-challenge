import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ImagesViewer from '../src/components/ImagesViewer';
import "bootstrap/dist/css/bootstrap.min.css";


const Favorites = () => {
    const [images, setImages] = useState([]);
    const [pages, setPages] = useState(0);
    const [ noMoreImages, setNoMoreImages ] = useState(false);

    const getImagesWithCount = ((count, pages) => {
        axios.get('https://api.thecatapi.com/v1/favourites', {
                params: {
                    limit: count,
                    page: pages,
                    sub_id: '1234'
                },
                headers: {'x-api-key': 'fefda372-702a-435a-9a46-9a70f0ee3235'}
            }).then((response) => {
                if (response && response.data && response.data.length > 0) {
                    setImages([...images, ...response.data]);
                } else if (response?.data?.length === 0) {
                    setNoMoreImages(true);
                }
            })
    })

    const deleteFromFavorites = (id) => {
        axios.delete('https://api.thecatapi.com/v1/favourites/' + id,{
            headers: {'x-api-key': 'fefda372-702a-435a-9a46-9a70f0ee3235'}
        }).then((response) => {
            if (response?.data?.message === 'SUCCESS') {
                let temp = images.filter((image) => image.id != id)
                setImages(temp);
            }
        })
    }

    useEffect(() => {
        getImagesWithCount(10, pages);
    }, [pages]);

    return(
        <>
            <ImagesViewer
                images={images}
                pages={pages}
                setPages={setPages}
                favoritesPage={true}
                noMoreImages={noMoreImages}
                deleteFromFavorites={deleteFromFavorites}
            />
        </>
    )
  }

  export default Favorites;