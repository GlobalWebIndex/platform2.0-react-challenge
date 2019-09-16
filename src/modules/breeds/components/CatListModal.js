import React from "react";
import { Button, Modal } from "react-bootstrap";

import CatGallery from "components/CatGallery";

export default function CatListModal({
  show,
  handleClose,
  breed,
  cats,
  isLoading,
  handleClick
}) {
  return breed ? (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{breed.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && "Loading ..."}
        {!isLoading && cats.length === 0 && "No results found"}
        <CatGallery cats={cats} handleClick={handleClick} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
}
