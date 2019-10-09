import React from 'react';

// Components
import { Button, Spinner } from '@blueprintjs/core';
// Store 
import { ICat, StatusEnum } from '../../constants/models';
import * as ComponentProps from '../../constants/props';
import useGlobal, { AppState, AssociatedActions, statelessActions } from '../../store/index';


export const Cat: React.SFC<ComponentProps.CatProps> = (props) => {

  const [favorites, aFavorites] = useGlobal((state: AppState) => state.favorites, (actions: AssociatedActions) => actions);
  let cat: ICat = { ...props.cat };
  let isFavorite: boolean = favorites.data.filter(o => o.image_id === cat.id).length !== 0;

  React.useEffect(() => {
    if (favorites.data.length === 0)
      aFavorites.fetchFavorites();
  });

  const toggleFavorite = async () => {
    isFavorite = favorites.data.filter(o => o.image_id === cat.id).length !== 0;
    if (!isFavorite) {
      await statelessActions.addFavorite(cat.id)
      aFavorites.fetchFavorites();
    }
    else {
      const favorite_id: number = favorites.data.filter(o => o.image_id === cat.id)[0].id
      await statelessActions.removeFavorite(favorite_id);
      aFavorites.fetchFavorites();
    }
  }

  return (
    <>
      <div className={props.isModal ? 'img-cat-details' : 'img-cat'}>
        <img src={cat.url} alt={'random Image' + cat.id} className="img-cat img-loading" />
        {props.isModal && cat.breeds && cat.breeds.length > 0 && <p><i>Breed name:</i> {cat.breeds[0].name}</p>}
        {props.isModal && (
          <Button
            icon="heart"
            onClick={toggleFavorite}
            disabled={favorites.status === StatusEnum.REQUESTED || favorites.status === StatusEnum.INITIAL}>
            {favorites.status === StatusEnum.REQUESTED && <Spinner size={Spinner.SIZE_SMALL}></Spinner>}
          </Button>
        )}
        {props.isModal && isFavorite && <i> In Favorites</i>}
      </div>
    </>
  );
}



