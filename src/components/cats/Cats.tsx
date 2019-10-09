import React, { useState } from 'react';

// Components
import { Spinner, Button, Card, Elevation } from '@blueprintjs/core';
import { Col, Row, Container } from "react-grid-system"
import { Cat } from '../cat/Cat'
import { RouteComponentProps } from 'react-router-dom';
// Store
import { ICat, StatusEnum } from '../../constants/models';
import * as styles from '../../constants/styles';
import useGlobal, { AppState, AssociatedActions, initialCat, statelessActions }  from '../../store/index';
import ReactModal from 'react-modal';
import useAsyncEffect from 'use-async-effect';

interface MatchParams {
  image_id: string;
}
ReactModal.setAppElement('#root');

const Cats: React.FC<RouteComponentProps<MatchParams>> = ( routeProps ) => {
  
  // State
  const [cats, aCats] = useGlobal( (state: AppState) => state.cats, (actions: AssociatedActions) => actions );
  const [favorites, aFavorites] = useGlobal( (state: AppState) => state.favorites, (actions: AssociatedActions) => actions );
  const [selectedCat, setSelectedCat] = useState( initialCat);
  const [ catModalOpen, setCatModalOpen] = useState(false);
 
  // UseEffect
  useAsyncEffect( async() => {
    
    if(routeProps.location.pathname !== "/"){
      // Since this component is filled with random cats first check if cat URL matches any cat present
      if(cats.data.filter(o => o.id === routeProps.match.params.image_id).length === 0) {
        const addedCat = await statelessActions.fetchCat(routeProps.match.params.image_id); 
        setSelectedCat( {data: addedCat.data, status: StatusEnum.SUCCESS } );
        setCatModalOpen(true);
      }
    }
    if(favorites.data.length === 0 )
      aFavorites.fetchFavorites();
    if(cats.status === StatusEnum.INITIAL){
      aCats.fetchCats();
    }
    
  }, [catModalOpen]);
  
  function fetchMore() {
    aCats.fetchMoreCats();
  }

  // Modal
  function showModal(c: ICat) {
    routeProps.history.push('/cats/' + c.id);
    setSelectedCat( { data: c, status: StatusEnum.SUCCESS });
    setCatModalOpen(true);
  }

  return (
    <>
      <Container className="container">
        <h1>Random Images</h1>
        <Row>
          { cats.data && cats.data.map( (cat: ICat) => (
            <Col lg={6} key={cat.id} className='v-sp' onClick={() => { showModal(cat); }} >
              <Card interactive={true} elevation={Elevation.FOUR}>
                <Cat isModal={false} cat={cat}></Cat>
              </Card>
            </Col>
          ))}
        </Row>
        { (cats.status === StatusEnum.REQUESTED || cats.status === StatusEnum.INITIAL) &&  <Spinner></Spinner> }
        { cats.status !== StatusEnum.INITIAL &&  <Button onClick={fetchMore}>Get more...</Button>}
        { cats.status === StatusEnum.ERROR && <div className="error">Error, Could not fetch data from the API</div>}
      </Container>

      <ReactModal isOpen={catModalOpen} 
                  style={styles.reactModal} 
                  shouldCloseOnOverlayClick={true} 
      > 
        <Button onClick={() => { routeProps.history.push('/'); setCatModalOpen(false);  }} icon="cross"/>
        <Cat {... { isModal: true, cat: selectedCat.data as ICat}}/>
      </ReactModal>
    </>
  );
}

export default Cats;
