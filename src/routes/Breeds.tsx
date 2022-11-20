import {
  Link,
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import { snapshot } from "valtio";
import { config } from "../config";
import type { BreedStore, Breed, Actions } from "./router";

function pickBreed(breed: Breed) {
  return { id: breed.id, name: breed.name, origin: breed.origin };
}

type BreedListItem = ReturnType<typeof pickBreed>;

export function loader(store: BreedStore, actions: Actions) {
  return async function () {
    if (store.byId.size === 0) {
      const breeds = (await fetch(`${config.url}/breeds`, {
        headers: config.headers,
      }).then((r) => r.json())) as Breed[];

      breeds.forEach((element) => {
        actions.saveBreed(element);
      });
    }
    const breeds = [...snapshot(store.byId).values()].map((breed) => ({
      name: breed.name,
      origin: breed.origin,
    }));

    return breeds;
  };
}

export function breedLoader(store: BreedStore) {
  return async function ({ params }: LoaderFunctionArgs) {
    return store.byId.get(params.breedId!);
  };
}
export function BreedDetail() {
  const breed = useLoaderData() as Breed;
  return <div>{breed.description}</div>;
}

export function Breeds() {
  const breeds = useLoaderData() as BreedListItem[];
  return (
    <div className="test">
      <input placeholder="search" />
      <ul>
        {breeds.map(({ id, name, origin }) => (
          <li key={id}>
            <Link to={id}>
              <div className="flex flex-col space-y-1">{name}</div>
              <div className="text-gray-500 text-sm">{origin}</div>
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
