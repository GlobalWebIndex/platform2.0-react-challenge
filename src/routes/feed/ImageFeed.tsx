import { useEffect, useState } from "react";
import { proxy, snapshot } from "valtio";
import {
  Form,
  Link,
  LoaderFunctionArgs,
  Outlet,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import type { ImageStore, Image as ImageType, Actions } from "../router";
import { ImageService } from "~/api";
import { Image, ImageGrid } from "~/components";

export function loader(store: ImageStore, actions: Actions) {
  return async function ({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1", 10);
    if ((store.ids.size === 0 && page === 1) || page > 1) {
      const results = (await ImageService.getRandomImages(page).then((r) =>
        r.json()
      )) as ImageType[];
      results.forEach((element) => {
        actions.saveImage(element);
      });
    }

    return {
      images: [...snapshot(store.byId).values()],
      actions,
    };
  };
}

type LoaderData = {
  images: ImageType[];
  actions: Actions;
};

export function Feed() {
  const { images: initialImages, actions } = useLoaderData() as LoaderData;
  const fetcher = useFetcher<LoaderData>();
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(initialImages);

  useEffect(() => {
    if (fetcher.data) {
      setImages(fetcher.data.images);
      setPage((p) => p + 1);
    }
  }, [fetcher.data]);

  return (
    <div>
      <ImageGrid
        images={images}
        loadMore={{
          onClick: () => fetcher.load(`/feed?page=${page + 1}`),
          isLoading: fetcher.state === "loading",
        }}
      />
      <Outlet />
    </div>
  );
}
