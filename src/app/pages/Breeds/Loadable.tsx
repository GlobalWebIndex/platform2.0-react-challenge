/**
 * Asynchronously loads the component for Breeds List
 */

import { lazyLoad } from 'utils/loadable';

export const BreedsPage = lazyLoad(
  () => import('./index'),
  module => module.BreedsPage,
);
