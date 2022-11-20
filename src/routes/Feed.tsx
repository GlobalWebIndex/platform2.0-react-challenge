import { useEffect, useState } from "react";
import { proxy, snapshot } from "valtio";
import {
  Form,
  Link,
  LoaderFunctionArgs,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { config } from "../config";
import type { ImageStore, Image, ImageActions } from "./router";

const limit = 10;
export function loader(store: ImageStore, actions: ImageActions) {
  return async function ({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1", 10);
    if ((store.ids.size === 0 && page === 1) || page > 1) {
      const results = (await fetch(
        `${config.url}/images/search?limit=${limit}&page=${page ?? 1}`,
        {
          headers: {
            ...config.headers,
          },
        }
      ).then((r) => r.json())) as Image[];
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
  images: Image[];
  actions: ImageActions;
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
    <div className="grid gap-4 grid-cols-4 m-2">
      {images.map((img: Image, index: number) => (
        <Link
          // since api returns 10 random images we need to use index
          key={`${img.id}-${index}`}
          to={img.id}
          className="h-52 overflow-hidden border rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
        >
          <img
            alt={img.id}
            className="w-full shadow-lg block roundex-xl h-full object-cover"
            src={img.url}
          />
        </Link>
      ))}

      <div className="relative border h-52 rounded-lg shadow-lg">
        <button
          onClick={() => fetcher.load(`/feed?page=${page + 1}`)}
          className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0"
        >
          {fetcher.state === "loading" ? "Loading..." : "Load more"}
        </button>
      </div>
    </div>
  );
}
