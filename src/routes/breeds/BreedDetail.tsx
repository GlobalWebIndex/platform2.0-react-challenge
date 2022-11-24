import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import { ImageGrid } from "~/ui";
import { BreedService, ImageService } from "~/api";
import type { Breed } from "../router";

export async function loader({ params }: LoaderFunctionArgs) {
  const breed = (await BreedService.getBreed(params.breedId!).then((r) =>
    r.json()
  )) as Breed;

  const images = await ImageService.getImagesForBreed(params.breedId!).then(
    (r) => r.json()
  );

  return { breed, images };
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
