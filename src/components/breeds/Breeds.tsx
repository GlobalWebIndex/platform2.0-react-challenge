import React from 'react';
// Components
import { Card, Elevation, Spinner, Button } from '@blueprintjs/core';
import { Col, Row, Container } from "react-grid-system"
import Search from '../search/Search';
// Store 
import { ICatBreed, StatusEnum } from '../../constants/models';
import * as styles from '../../constants/styles';
import useGlobal, { AppState, AssociatedActions, initialBreed } from '../../store/index';
import ReactModal from 'react-modal';

const Breeds: React.FC = () => {

  const [breeds, aBreeds] = useGlobal((state: AppState) => state.breeds, (actions: AssociatedActions) => actions);
  const [selectedBreed, setSelectedBreed] = React.useState(initialBreed);
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    if (breeds.data.length === 0)
      aBreeds.fetchBreeds();
  });


  function openImages(breed: ICatBreed) {
    setSelectedBreed({ data: breed, status: StatusEnum.SUCCESS });
    setIsOpen(true);
  }
  return (
    <>
      <Container className="container">
        <h1>Breeds</h1>
        <Row>
          {breeds.data && breeds.data.map((breed: ICatBreed) => (
            <Col lg={4} key={breed.id} className='v-sp'>
              <Card interactive={true} elevation={Elevation.FOUR} onClick={() => openImages(breed)}>
                <h5>{breed.name}</h5>
                <p>{breed.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
        {(breeds.status === StatusEnum.REQUESTED || breeds.status === StatusEnum.INITIAL) && <Spinner></Spinner>}
        {breeds.status === StatusEnum.ERROR && <div className="error">Error, Could not fetch data from the API</div>}

        <ReactModal isOpen={isOpen} contentLabel="Modal Header" style={styles.reactModal}>
          <Button onClick={() => { setIsOpen(false) }} icon="cross" />
          <Search {...{ breed: selectedBreed.data as ICatBreed }} />
        </ReactModal>
      </Container>
    </>
  );
}

export default Breeds;
