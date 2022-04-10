import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import ImagesViewer from '../src/components/ImagesViewer';
import ImageModal from '../src/components/ImageModal';
import { useRouter } from 'next/router'
import ImageDetails from '../src/components/ImageDetails';

const Breeds = () => {
    const router = useRouter()
    const [images, setImages] = useState([]);
    const [pages, setPages] = useState(0);
    const [ noMoreImages, setNoMoreImages ] = useState(false);
    const [ pickedImage, setPickedImage ] = useState(null);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ imageOnPreview, setImageOnPreview ] = useState(null);

    useEffect(() => {
        if(router?.query?.id) {
            axios.get('https://api.thecatapi.com/v1/images/' + router.query.id, {
                    headers: {'x-api-key': 'fefda372-702a-435a-9a46-9a70f0ee3235'}
                }).then((response) => {
                    if (response && response.data) {
                        setImageOnPreview(response.data);
                    }
            })
        }
    }, [router])

    useEffect(() => {
        getImagesWithCount(10, pages);
    }, [pages]);

    useEffect(() => {
        if (pickedImage) {
            setModalVisible(true);
        }
    }, [pickedImage]);

    const getImagesWithCount = ((count, pages) => {
        axios.get('https://api.thecatapi.com/v1/breeds', {
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


    return(
        <>
            {imageOnPreview &&
                <ImageDetails
                    pickedImage={imageOnPreview}
                />
            }
            <ImageModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                pickedBreed={pickedImage}
                setPickedImage={setPickedImage}
            />
            <ImagesViewer
                images={images}
                pages={pages}
                setPages={setPages}
                breedsPage={true}
                noMoreImages={noMoreImages}
                setPickedImage={setPickedImage}
            />
        </>
    )
  }

  export default Breeds;