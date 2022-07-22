import { BreedsPage } from './pages/Breeds/Loadable';
import { FavoritesPage } from './pages/Favorites/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import { messages } from './messages';

const Routes = {
  HOME: {
    name: 'Home',
    route: '/',
    component: HomePage,
    translation: messages.home,
  },
  BREEDS: {
    name: 'Breeds',
    route: '/breeds',
    component: BreedsPage,
    translation: messages.breeds,
  },
  FAVORITES: {
    name: 'Favorites',
    route: '/favorites',
    component: FavoritesPage,
    translation: messages.favorites,
  },
};

const NavigationItems = Object.values(Routes);

export { Routes, NavigationItems };
