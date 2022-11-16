import { useEffect, useState } from 'react';

import List from 'components/parts/List';
import Image from 'components/parts/Image';
import Api from 'data/api';
import type Cat from 'types';
import Styled from './styled';

function FavouriteList() {
  const [updateFavs, setUpdateFavs] = useState(true);
  const [favs, setFavs] = useState<Cat.FavouriteImage[]>([]);

  const handleRemoveFavourite = async (id: string) => {
    await Api.favourites.remove(id);
    setUpdateFavs(true);
  };

  useEffect(() => {
    if (updateFavs) {
      Api.favourites.getAll().then((favs) => {
        setFavs(favs);
      }, console.error);

      setUpdateFavs(false);
    }
  }, [updateFavs]);

  return (
    <List
      data={favs}
      data-test="favourites"
      onRenderItemContent={(item) => (
        <>
          <Image url={item.image.url} />
          <Styled.Bin
            role="button"
            data-test="delete"
            onClick={() => handleRemoveFavourite(item.id)}
          />
        </>
      )}
    />
  );
}

export default FavouriteList;
