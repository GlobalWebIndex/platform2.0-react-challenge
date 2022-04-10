import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ImagesViewer from '../src/components/ImagesViewer';
import ImageModal from '../src/components/ImageModal';
import "bootstrap/dist/css/bootstrap.min.css";

const Index = () => {
    const [images, setImages] = useState([]);
    const [pages, setPages] = useState(1);
    const [pickedImage, setPickedImage] = useState(null);
    const [ modalVisible, setModalVisible ] = useState(false);

    const getImagesWithCount = ((count) => {
        axios.get('https://api.thecatapi.com/v1/images/search', {
                params: {
                    limit: count,
                },
                headers: {'x-api-key': 'fefda372-702a-435a-9a46-9a70f0ee3235'}
            }).then((response) => {
                if (response && response.data) {
                    setImages([...images, ...response.data]);
                }
            })
    })

    useEffect(() => {
        getImagesWithCount(10);
    }, [pages]);

    useEffect(() => {
        if (pickedImage) {
            setModalVisible(true);
        }
    }, [pickedImage]);

    return(
        <>
            {images && images.length > 0 &&
                <ImageModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    pickedImage={pickedImage}
                    setPickedImage={setPickedImage}
                />
            }
            <ImagesViewer
                images={images}
                pages={pages}
                setPages={setPages}
                setPickedImage={setPickedImage}
            />
        </>
    )
  }

  export default Index