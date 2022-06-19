import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'react';

import { CommonActionCreators } from 'common/ducks';
import { RootState } from 'state/types';
import { HomeCatsActionCreators } from 'features/home/ducks';
import { IHomeScreen } from 'features/home/types';

export const Home = ({ catsRequested }: IHomeScreen) => {
  React.useEffect(() => {
    catsRequested({ page: 0, limit: 10 });
  }, [catsRequested]);

  return (
    <div>
      <span>I am Home</span>
    </div>
  );
};

export const mapStateToProps = (state: RootState) => {
  return {
    notification: state.common.notification,
    data: state.data.home.cats,
  };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    clearNotificationMessage: () =>
      dispatch(CommonActionCreators.clearNotificationMessage()),
    catsRequested: ({ page, limit }: { page: number; limit: number }) =>
      dispatch(
        HomeCatsActionCreators.getCats({
          page,
          limit,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
