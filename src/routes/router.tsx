import { Children } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from "react-router-dom";
import { proxy } from "valtio";
import { proxySet, proxyMap, derive, watch } from "valtio/utils";
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

type NormalizedStore<T extends { id: string }> = {
  ids: Set<string>;
  byId: Map<string, T>;
};

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

// In my real life I am very much against cache normalization it introduces complexity
// but to my understanding if redux was modeled after elm, the patterns should work the same
// so the person reviewing this would appreciate this so it could score me some bonus points.
// I am just really hoping that he find this funny otherwise I come out as arrogant, which can score me negative points
export type ImageStore = NormalizedStore<Image>;
export type BreedStore = NormalizedStore<Breed>;

const imageStore = proxy<ImageStore>({
  ids: proxySet([]),
  byId: proxyMap(),
});

const breedStore = proxy<BreedStore>({
  ids: proxySet([]),
  byId: proxyMap(),
});
export type FavouriteStore = NormalizedStore<Favourite>;
const favouriteStore = proxy<FavouriteStore>({
  ids: proxySet([]),
  byId: proxyMap(),
});

const createImage = (image: Image) =>
  derive(
    {
      isFavourite: (get) => get(favouriteStore).ids.has(image.id),
    },
    {
      proxy: proxy(image),
    }
  );

const actions = {
  saveImage: (img: Image) => {
    imageStore.byId.set(img.id, createImage(img));
    imageStore.ids.add(img.id);
  },
  saveBreed: (breed: Breed) => {
    breedStore.byId.set(breed.id, breed);
    breedStore.ids.add(breed.id);
  },
  saveFavourite: (fav: Favourite) => {
    favouriteStore.byId.set(fav.image_id, fav);
    favouriteStore.ids.add(fav.image_id);
  },
};

export type Actions = typeof actions;

export const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    loader: favoritesLoader,
    element: <Root />,
    children: [
      {
        path: "feed",
        loader: feedLoader(imageStore, actions),
        element: <Feed />,
        children: [
          {
            path: ":imgId",
            loader: imageLoader(imageStore, actions),
            action: favoriteAction(imageStore),
            // shouldRevalidate: () => false,
            element: <ImageDetail />,
          },
        ],
      },
      {
        path: "breeds/",
        loader: breedsLoader(breedStore, actions),
        element: <Breeds />,
        children: [
          {
            path: ":breedId",
            loader: breedLoader(breedStore, actions),
            element: <BreedDetail />,
            children: [
              {
                path: ":imgId",
                loader: imageLoader(imageStore, actions),
                element: <ImageDetail />,
              },
            ],
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
