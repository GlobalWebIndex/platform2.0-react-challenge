import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Breeds } from "./Breeds";
import { Favorites } from "./Favorites";
import { Feed } from "./Feed";
import { Root } from "./Root";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="feed" element={<Feed />} />
      <Route path="breeds" element={<Breeds />} />
      <Route path="favorites" element={<Favorites />} />
    </Route>
  )
);
