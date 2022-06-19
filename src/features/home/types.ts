import {
  mapDispatchToProps as HomeMapDispatchToProps,
  mapStateToProps as HomeMapStateToProps,
} from './screens/Home';

export type IHomeScreen = {} & ReturnType<typeof HomeMapDispatchToProps> &
  ReturnType<typeof HomeMapStateToProps>;

export interface ICat {
  breeds: any[];
  height?: number;
  id: string;
  url: string;
  width?: number;
}
