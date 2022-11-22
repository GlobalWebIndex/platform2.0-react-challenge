import { Children } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import { Breeds, BreedDetail, breedsLoader, breedLoader } from "./breeds";
import { Favourites, loader as favoritesLoader } from "./favourites/Favorites";
import { Feed, loader as feedLoader } from "./feed/ImageFeed";
import {
  ImageDetail,
  loader as imageLoader,
  action as favoriteAction,
} from "./feed/ImageDetail";
import { Root } from "./Root";

// the api exposes openapi but doesnt define Schema/Models so you cannot use openapi generator to generate types :(
// I joined the discord and asked creator of the catapi if he can update or expose it on the thedogapi where model definitions are present
export type Favourite = {
  id: string;
  sub_id: string;
  image_id: string;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
};

export type Breed = {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  weight: { imperial: string; metric: string };
  height: string;
  life_span: string;
  wikipedia_url: string;
};

export type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
  isFavourite?: boolean;
};

const imageDetailRoute = {
  path: ":imgId",
  loader: imageLoader,
  action: favoriteAction,
  shouldRevalidate: () => false,
  element: <ImageDetail />,
};
export const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    loader: favoritesLoader,
    element: <Root />,
    children: [
      {
        path: "feed",
        loader: feedLoader,
        shouldRevalidate: (args) => {
          console.log("args", args);
          return false;
        },
        element: <Feed />,
        children: [imageDetailRoute],
      },
      {
        path: "breeds/",
        loader: breedsLoader,
        element: <Breeds />,
        children: [
          {
            path: ":breedId",
            loader: breedLoader,
            element: <BreedDetail />,
            children: [imageDetailRoute],
          },
        ],
      },
      {
        path: "favorites",
        element: <Favourites />,
      },
    ],
  },
]);
