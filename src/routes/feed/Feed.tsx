import { Suspense, useEffect, useState } from "react";
import {
  Await,
  defer,
  LoaderFunctionArgs,
  Outlet,
  useAsyncValue,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import type { Image } from "../router";
import { ImageService } from "~/api";
import { InfiniteImages } from "./InfiniteImages";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  return defer({
    images: ImageService.getRandomImages(page).then((r) => r.json()),
  });
}

export function ImageFeed() {
  const initialImages = useLoaderData() as { images: Image[] };

  return (
    <div className="mt-4">
      <Suspense fallback="Loading images....">
        <Await resolve={initialImages.images}>
          <InfiniteImages />
        </Await>
      </Suspense>
    </div>
  );
}
