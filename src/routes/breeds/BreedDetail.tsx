import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { snapshot } from "valtio";
import { BreedService } from "../../api";
import type { BreedStore, Actions, Breed } from "../router";

export function loader(store: BreedStore, actions: Actions) {
  return async function ({ params }: LoaderFunctionArgs) {
    if (!store.byId.has(params.breedId!)) {
      const breed = (await BreedService.getBreed(params.breedId!).then((r) =>
        r.json()
      )) as Breed;
      actions.saveBreed(breed);
    }

    return snapshot(store).byId.get(params.breedId!);
  };
}

export function BreedDetail() {
  const breed = useLoaderData() as Breed;
  return (
    <article className="space-y-4">
      <header>
        <h2 className="text-3xl bold">{breed?.name}</h2>
      </header>
      <p>{breed?.description}</p>
    </article>
  );
}
