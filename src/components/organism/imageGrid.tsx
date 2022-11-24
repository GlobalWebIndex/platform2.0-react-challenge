import { ReactNode } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Link, useFetcher, useRouteLoaderData } from "react-router-dom";
import { Image } from "../atoms/image";

type ImageGridProps = {
  images: Array<{
    id: string;
    url: string;
  }>;
  children?: ReactNode;
  loadMore?: {
    onClick: () => void;
    isLoading?: boolean;
  };
};

export function ImageGrid({ images, loadMore }: ImageGridProps) {
  return (
    <div className="grid gap-4 grid-cols-4 m-2">
      {images.map((img, index: number) => (
        <Link
          // since api returns 10 random images we need to use index
          key={`${img.id}-${index}`}
          to={img.id}
          className="block h-48"
        >
          <Image id={img.id} src={img.url} interaction="clickable" />
        </Link>
      ))}

      {loadMore && (
        <div className="relative border h-48 rounded-lg shadow-lg">
          <button
            onClick={loadMore.onClick}
            className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0"
          >
            {loadMore.isLoading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}

export function ImageFavouriteGrid({ images, loadMore }: ImageGridProps) {
  const fetcher = useFetcher();
  return (
    <div className="grid gap-4 grid-cols-4 m-2">
      {images.map((img, index: number) => (
        <div
          // since api returns 10 random images we need to use index
          key={`${img.id}-${index}`}
          className="group relative block h-48"
        >
          <Image id={img.id} src={img.url} interaction="non" />

          <fetcher.Form method="post">
            <input type="hidden" name="id" value={img.id} />
            <button
              name="favourite"
              value={"false"}
              className="group-hover:block opacity-0 transition-opacity duration-300 group-hover:opacity-95 top-2 right-2 absolute rounded-full p-1.5 bg-mauve-4"
            >
              <TrashIcon className="w-6 h-6 text-red-9" />
            </button>
          </fetcher.Form>
        </div>
      ))}

      {loadMore && (
        <div className="relative border h-48 rounded-lg shadow-lg">
          <button
            onClick={loadMore.onClick}
            className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0"
          >
            {loadMore.isLoading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
