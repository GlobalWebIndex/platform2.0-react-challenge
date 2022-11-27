import {
  Await,
  LoaderFunctionArgs,
  Outlet,
  defer,
  useLoaderData,
} from "react-router-dom";
import { ImageGrid } from "~/ui";
import { BreedService, ImageService } from "~/api";
import type { Breed } from "../router";
import { Suspense } from "react";
import { Spinner } from "~/ui/atoms/spinner";

export async function loader({ params }: LoaderFunctionArgs) {
  const breed = await BreedService.getBreed(params.breedId!).then((r) =>
    r.json()
  );

  const images = ImageService.getImagesForBreed(params.breedId!).then((r) =>
    r.json()
  );

  return defer({ breed, images });
}

export function BreedDetail() {
  const data = useLoaderData() as {
    breed: Breed;
    images: Array<any>;
  };

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex justify-center items-center">
          <Spinner size="big" />
        </div>
      }
    >
      <article className="space-y-4">
        <Await
          resolve={data.breed}
          errorElement={<p>"eror loading data"</p>}
          children={(breed) => (
            <>
              <header>
                <h2 className="text-3xl bold">{data.breed?.name}</h2>
              </header>

              <p>{data.breed?.description}</p>
            </>
          )}
        ></Await>

        <Await resolve={data.images} errorElement={<p>"eror loading data"</p>}>
          {(images) => (
            <>
              <ImageGrid images={images} />
              <Outlet
                context={{
                  images: images,
                }}
              />
            </>
          )}
        </Await>
      </article>
    </Suspense>
  );
}
