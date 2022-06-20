import React, { Dispatch } from 'react';
import { connect } from 'react-redux';

import { RootState } from 'state/types';
import Constants from 'common/constants';
import { BreedsActionCreators } from 'features/breeds/ducks';
import { CommonActionCreators } from 'common/ducks';
import { IBreedsScreen, IBreed } from 'features/breeds/types';

export const Breeds = ({ breedsRequested, data }: IBreedsScreen) => {
  const { data: breedsData = [] } = data;

  React.useEffect(() => {
    breedsRequested({
      page: Constants.PAGINATION.PAGE,
      limit: Constants.PAGINATION.LIMIT,
    });
  }, [breedsRequested]);

  return (
    <div>
      <span>I am Breeds</span>
      {breedsData.map((breed: IBreed) => (
        <span key={breed.id}>{breed.id}</span>
      ))}
    </div>
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    notification: state.common.notification,
    data: state.data.breeds.breeds,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    clearNotificationMessage: () =>
      dispatch(CommonActionCreators.clearNotificationMessage()),
    breedsRequested: ({ page, limit }: { page: number; limit: number }) =>
      dispatch(
        BreedsActionCreators.getBreeds({
          page,
          limit,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Breeds);
