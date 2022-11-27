import { useState, useEffect } from "react";
import { useAsyncValue, useFetcher, Outlet } from "react-router-dom";
import { ImageGrid } from "~/ui";
import { Image } from "../router";

export function InfiniteImages() {
  const initialImages = useAsyncValue() as Image[];
  const fetcher = useFetcher<{ images: Image[] }>();
  const [images, setImages] = useState(initialImages);

  useEffect(() => {
    if (fetcher.data?.images.length) {
      setImages((images) =>
        fetcher.data ? images.concat(fetcher.data.images) : images
      );
    }
  }, [fetcher.data?.images]);

  return (
    <>
      <ImageGrid
        images={images}
        loadMore={{
          onClick: () => fetcher.load(`/`),
          isLoading: fetcher.state === "loading",
        }}
      />
      <Outlet context={{ images }} />
    </>
  );
}
