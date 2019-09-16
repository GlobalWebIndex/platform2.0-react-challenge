import React from "react";
import { Button, Image, Modal } from "react-bootstrap";

const concatBreedNames = breeds =>
  breeds && breeds.length > 0
    ? breeds
        .reduce((accumulator, breed) => "," + breed.name + accumulator, "")
        .slice(1) // remove the first comma
    : "";

export default function CatModal({ show, handleClose, cat, markAsFavorite }) {
  return cat ? (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{concatBreedNames(cat.breeds)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={cat.src} className="thumbnail" />
        {cat.breeds === undefined || cat.breeds.length === 0 ? null : (
          <ul>
            {Object.entries(cat.breeds[0])
              .filter(entry => entry[0] !== "id")
              .map(entry => (
                <li key={entry[0]}>
                  <label className="label">{entry[0].replace("_", " ")}:</label>{" "}
                  {JSON.stringify(entry[1])}
                </li>
              ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={markAsFavorite}>
          Mark as favorite
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
}
