import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Breeds, loader as breedsLoader } from "./Breeds";
import { Favourites, loader as favoritesLoader } from "./Favorites";
import { Feed, loader as feedLoader } from "./Feed";
import { Root } from "./Root";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="feed" loader={feedLoader} element={<Feed />} />
      <Route path="breeds" loader={breedsLoader} element={<Breeds />} />
      <Route
        path="favorites"
        loader={favoritesLoader}
        element={<Favourites />}
      />
    </Route>
  )
);
