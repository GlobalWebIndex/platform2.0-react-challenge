import React, { useCallback, useState, useEffect } from 'react';
import { Grid} from "react-virtualized";
import { Spinner } from 'react-bootstrap';
import useWindowDimensions from '../../utils/helper';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'
import Link from 'next/link';


const ImagesViewer = (
    {
        images,
        pages,
        setPages, 
        setPickedImage, 
        favoritesPage = false, 
        breedsPage = false, 
        noMoreImages, 
        deleteFromFavorites, 
        isModalView = false,
        setModalVisible
    }) => {
    const { height, width } = useWindowDimensions();
    const [ spinnerVisible, setSpinnerVisible ] = useState(false);
    const [ loadedImages, setLoadedImages ] = useState([])
    
    const onLoad = (index) => {
        if(!spinnerVisible) setSpinnerVisible(true)
        let temp = loadedImages;
        temp.push(index);
        setLoadedImages(temp);
        if (loadedImages.length === images.length) {
            setSpinnerVisible(false);
        }
    };

    const cellRenderer = useCallback(({columnIndex, key, rowIndex, style}) => {

        const image = images[rowIndex * 5 + columnIndex];
        if(image) {
            if(isModalView) {
                return (
                    <Link href={'/breeds?id=' + image.id} key={image.id} style={style}>
                        <div className='imageWrapper'style={style} onClick={() => setModalVisible(false)}>
                            <img src={favoritesPage || breedsPage? image.image?.url : image.url} style={{maxWidth: '100%'}} onLoad={() => onLoad(rowIndex * 5 + columnIndex)}/>
                        </div>
                    </Link>
                )
            } else {
                return (
                    <div className='imageWrapper' style={style} key={image.id}>
                        { favoritesPage && image &&
                            <Button className='xButton' onClick={() => deleteFromFavorites(image.id)}>X</Button>
                        }
                        <img src={favoritesPage || breedsPage? image.image?.url : image.url} style={{maxWidth: '90%', maxHeight: '90%'}} onClick={() => { setPickedImage(image)}} onLoad={() => onLoad(rowIndex * 5 + columnIndex)}/>
                    </div>
                )
            }
        }
    }, [images]);

    return(
        <div className="imageViewerContainer">
            {images && images.length > 0 && 
                <Grid
                    width={isModalView ? width * 0.5 : width}
                    height={isModalView ? (images.length > 5 ? images.length / 5 * 150 + 100 : 250) : (images.length > 5 ? images.length / 5 * 300 : 300)}
                    rowCount={images.length > 5 ? Math.ceil(images.length / 5) : 1}
                    rowHeight={isModalView ? 150 : 300}
                    cellRenderer={cellRenderer}
                    columnCount={5}
                    columnWidth={isModalView ? width * 0.5 / 5 : width / 5}
                />
            }

            {spinnerVisible &&
                <div className='spinnerContainer'>
                    <Spinner animation="border" role="status" variant="danger" aria-hidden="true">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            }
            <button className="more" disabled={noMoreImages || images.length < 10} onClick={() =>  setPages(pages+1)}>More</button>
        </div>
    )
  }

  export default ImagesViewer;