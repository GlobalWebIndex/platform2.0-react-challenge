import {
  mapDispatchToProps as HomeMapDispatchToProps,
  mapStateToProps as HomeMapStateToProps,
} from './screens/Home';

import {
  mapDispatchToProps as CatDetailsModalMapDispatchToProps,
  mapStateToProps as CatDetailsModalMapStateToProps,
} from './screens/Home/CatDetailsModal';

export type IHomeScreen = {} & ReturnType<typeof HomeMapDispatchToProps> &
  ReturnType<typeof HomeMapStateToProps>;

export type ICatDetailsModal = {} & ReturnType<
  typeof CatDetailsModalMapDispatchToProps
> &
  ReturnType<typeof CatDetailsModalMapStateToProps>;

export interface ICat {
  breeds: any[];
  height?: number;
  id: string;
  url: string;
  width?: number;
}
