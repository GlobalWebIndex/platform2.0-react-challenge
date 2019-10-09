import React from 'react';

// Components
import { Card, Elevation, Spinner, Button } from '@blueprintjs/core';
import { Col, Row, Container } from "react-grid-system";
import * as copy from 'copy-to-clipboard';
// Store 
import { IFavorite, StatusEnum } from '../../constants/models';
import useGlobal, { AppState, AssociatedActions, statelessActions } from '../../store/index';
import { RouteComponentProps } from 'react-router';


const Favorites: React.FC<RouteComponentProps> = (props) => {

  const [favorites, aFavorites] = useGlobal((state: AppState) => state.favorites, (actions: AssociatedActions) => actions);
  React.useEffect(() => {
    if (favorites.data.length === 0)
      aFavorites.fetchFavorites();
  }, [favorites, aFavorites]); 


  const removeFavorite = async (id: number) => {
    await statelessActions.removeFavorite(id);
    aFavorites.fetchFavorites();
  }

  function copyToClipboard(favorite: IFavorite) {
    const shareLink: string = document.location.protocol 
                + '//' + document.location.hostname 
                + (document.location.port !== '80' ? (':' + document.location.port) :  '')    // avoid redundant port 80
                + '/cats/' + favorite.image_id;
    copy.default(shareLink, { debug: false, message: 'Press #{key} to copy', });
    
  }
  
  return (
    <>
      <Container className="container">
        <h1>Your Favorites</h1>
        <Row>
          {favorites.data && favorites.data.map((favorite: IFavorite) => (
            <Col lg={6} key={favorite.id} className='v-sp'>
              <Card interactive={true} elevation={Elevation.FOUR}>
                <Button icon="trash" onClick={() => { removeFavorite(favorite.id) }}></Button>
                <div className="img-cat">
                  <img src={favorite.image.url} alt={'random Image' + favorite.id} className="img-cat" />
                  <Button onClick={() => { copyToClipboard(favorite);}}  icon="share"></Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        {favorites.status !== StatusEnum.INITIAL && favorites.data && favorites.data.length === 0 && <p>You don't have any favorites</p>}
        {(favorites.status === StatusEnum.REQUESTED || favorites.status === StatusEnum.INITIAL) && <Spinner></Spinner>}
        {favorites.status === StatusEnum.ERROR && <div className="error">Error, Could not fetch data from the API</div>}
      </Container>
    </>
  );
}

export default Favorites;
