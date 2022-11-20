import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import { snapshot } from "valtio";
import { ImageGrid } from "~/components";
import { BreedService, ImageService } from "~/api";
import type { BreedStore, Actions, Breed } from "../router";

export function loader(store: BreedStore, actions: Actions) {
  return async function ({ params }: LoaderFunctionArgs) {
    if (!store.byId.has(params.breedId!)) {
      const breed = (await BreedService.getBreed(params.breedId!).then((r) =>
        r.json()
      )) as Breed;
      actions.saveBreed(breed);
    }

    const images = await ImageService.getImagesForBreed(params.breedId!).then(
      (r) => r.json()
    );

    return { breed: snapshot(store).byId.get(params.breedId!), images };
  };
}

export function BreedDetail() {
  const { breed, images } = useLoaderData() as {
    breed: Breed;
    images: Array<any>;
  };
  return (
    <article className="space-y-4">
      <header>
        <h2 className="text-3xl bold">{breed?.name}</h2>
      </header>
      <p>{breed?.description}</p>
      <ImageGrid images={images} />
      <Outlet />
    </article>
  );
}
