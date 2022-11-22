import { useEffect, useState } from "react";
import {
  LoaderFunctionArgs,
  Outlet,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import type { Image } from "../router";
import { ImageService } from "~/api";
import { ImageGrid } from "~/components";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  return await ImageService.getRandomImages(page);
}

export function Feed() {
  const initialImages = useLoaderData() as Image[];
  const fetcher = useFetcher<Image[]>();
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(initialImages);

  useEffect(() => {
    if (fetcher.data) {
      setImages((images) =>
        fetcher.data ? images.concat(fetcher.data) : images
      );
      setPage((p) => p + 1);
    }
  }, [fetcher.data]);

  return (
    <div className="mt-4">
      <ImageGrid
        images={images}
        loadMore={{
          onClick: () => fetcher.load(`/feed`),
          isLoading: fetcher.state === "loading",
        }}
      />
      <Outlet />
    </div>
  );
}
