import { Children } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  ShouldRevalidateFunction,
} from "react-router-dom";
import { bootstrap } from "./Layout";
import { Breeds, BreedDetail, breedsLoader, breedLoader } from "./breeds";
import { Favourites } from "./favourites/Favorites";
import { ImageFeed, loader as feedLoader } from "./feed/Feed";
import {
  ImageDetail,
  loader as imageLoader,
  action as favoriteAction,
} from "./feed/detail/ImageDetail";
import { Layout } from "./Layout";

// the api exposes openapi but doesnt define Schema/Models so you cannot use openapi generator to generate types :(
// I joined the discord and asked creator of the catapi if he can update or expose it on the thedogapi where model definitions are present
// these types than would be generated outside of this file
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

const shouldNotRevalidate: ShouldRevalidateFunction = (args) => {
  return false;
};

const imageDetailRoute = {
  path: ":imgId",
  loader: imageLoader,
  action: favoriteAction,
  shouldRevalidate: shouldNotRevalidate,
  element: <ImageDetail />,
};

export const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    loader: bootstrap,
    element: <Layout />,
    children: [
      {
        path: "/",
        id: "imageFeed",
        loader: feedLoader,
        shouldRevalidate: shouldNotRevalidate,
        element: <ImageFeed />,
        children: [imageDetailRoute],
      },
      {
        path: "breeds/",
        loader: breedsLoader,
        shouldRevalidate: shouldNotRevalidate,
        element: <Breeds />,
        children: [
          {
            path: ":breedId",
            id: "breedDetail",
            loader: breedLoader,
            shouldRevalidate: (args) => {
              return (
                args.currentParams["breedId"] !== args.nextParams["breedId"]
              );
            },
            element: <BreedDetail />,
            children: [imageDetailRoute],
          },
        ],
      },
      {
        path: "favorites",
        action: favoriteAction,
        element: <Favourites />,
      },
    ],
  },
]);
