import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css";
import Link from 'next/link';
import ImageDetails from './ImageDetails';
import ImagesViewer from './ImagesViewer';

const ImageModal = ({ pickedImage, setPickedImage, pickedBreed, modalVisible, setModalVisible }) => {
    const [ breeds, setBreeds ] = useState(null);
    const [ isFavorite , setIsFavorite ] = useState(false);
    const [images, setImages] = useState([]);
    const [pages, setPages] = useState(0);
    
    useEffect(() => {
        pickedImage?.breeds && setBreeds(pickedImage.breeds);
        setIsFavorite(false);
    }, [pickedImage]);

    useEffect(() => {
        if(pickedBreed) {
            axios.get('https://api.thecatapi.com/v1/images/search', {
                params: {
                    limit: 10,
                    breed_id: pickedBreed.id,
                    page: pages
                },
                headers: {'x-api-key': 'fefda372-702a-435a-9a46-9a70f0ee3235'}
            }).then((response) => {
                if (response && response.data) {
                    setImages([...images, ...response.data]);
                }
            })
        }        
    }, [pickedBreed, pages])
    
    const setFavorite = () => {
        axios.post('https://api.thecatapi.com/v1/favourites', { image_id: pickedImage?.id, sub_id: '1234' },
            {
                headers: {
                    'x-api-key': 'fefda372-702a-435a-9a46-9a70f0ee3235',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                if (response?.data?.message === 'SUCCESS') {
                    setIsFavorite(true);
                }
            }).catch((response) => {
                if (response == 'Error: Request failed with status code 400') {
                    setIsFavorite(true);
                }
            })
    }

    return(
        <Modal 
            show={modalVisible}
            onExited={() => {
                setModalVisible(false);
                setPickedImage(null);
                setImages([]);
            }}
            onHide={() => {
                setModalVisible(false);
                setPickedImage(null);
                setImages([]);
            }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
            style={{ display: "block", opacity: 1}}
        >
            <ModalHeader closeButton/>
            {!pickedBreed ?
                <>
                    <ModalBody>
                        <Link href={'/breeds?id=' + pickedImage?.id}>
                            <a>
                                <ImageDetails
                                    pickedImage={pickedImage}
                                    breeds={breeds}
                                />
                            </a>
                        </Link>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => navigator.clipboard.writeText(window.location.href + 'breeds?id=' + pickedImage.id)}>
                            Copy
                        </Button>
                        <Button onClick={ setFavorite } disabled={isFavorite}>
                            Favorite
                        </Button>
                    </ModalFooter>
                </>
            :
                <ImagesViewer
                    images={images}
                    pages={pages}
                    setPages={setPages}
                    isModalView={true}
                    setModalVisible={setModalVisible}
                />
            }
        </Modal>
    )
  }

  export default ImageModal;