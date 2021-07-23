import React, { useEffect, useState } from "react";
import { Modal, Button, Image, ButtonGroup } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { ICatData, ICatBreed } from "../models/models";
import { fetchBreed } from "../api/requests";
import GoToBreedButton from "./GoToBreedButton";
import useNotification from "../hooks/useNotification";
import {
  BootstrapVariants,
  DEFAULT_ERROR_MESSAGE,
} from "../constants/constants";
import AddToFavorites from "./AddToFavorites";

const BreedModal: React.FC = () => {
  const [breed, setCatbreed] = useState<ICatBreed | null>(null);
  const [catData, setCatData] = useState<ICatData | null>(null);
  const { id }: any = useParams();
  const { addNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const location: any = useLocation();

  useEffect(() => {
    const data = location.state.catData;
    setCatData(data);
  }, [location]);

  useEffect(() => {
    const id = catData?.breeds[0]?.id;
    fetchBreed(id)
      .then((res) => {
        setIsLoading(false);
        setCatbreed(res[0]);
      })
      .catch((error) => {
        addNotification({
          message: error?.message || DEFAULT_ERROR_MESSAGE,
          type: BootstrapVariants.DANGER,
        });
      });
    setIsOpen(true);
  }, [id, catData, addNotification]);
  const close = () => {
    setIsOpen(false);
  };
  if (isLoading) {
    return <React.Fragment />;
  } else {
    return (
      <Modal
        show={isOpen}
        size="sm"
        onHide={close}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {breed?.name && (
          <Modal.Header className="d-block text-center">
            <Modal.Title id="contained-modal-title-vcenter">
              {breed?.name}
            </Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>
          {catData && <Image src={catData.url} rounded fluid />}
          <small>{breed?.description}</small>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup aria-label="bottom-buttons">
            {breed && <GoToBreedButton breed={breed} imageUrl={catData?.url} />}
            <AddToFavorites imageUrl={catData?.url} />
            <Link to="/">
              <Button onClick={close}>Close</Button>
            </Link>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default BreedModal;
