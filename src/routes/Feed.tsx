import { useEffect, useState } from "react";
import {
  Form,
  Link,
  LoaderFunctionArgs,
  useFetcher,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { config } from "../config";

type Category = {
  id: number;
  name: string;
};
type Breed = {};
type Image = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Breed[];
  categories?: Category[];
};

// the requirement is to load 10 random images, don't see the point on loading it on frontend
// load more functionality would make more sense when fetching in some precise order
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  // page here is useless actually since we are returning random images
  const page = url.searchParams.get("page") ?? 1;
  console.log("running loader", request);
  return await fetch(`${config.url}/images/search?limit=10&page=${page}`, {
    headers: {
      ...config.headers,
    },
  }).then((r) => r.json());
}

export function Feed() {
  const data = useLoaderData() as Image[];
  const [images, setImages] = useState(data);
  const [nextPage, setNextPage] = useState(1);
  const fetcher = useFetcher();
  useEffect(() => {
    console.log("fetcher", fetcher.data);

    fetcher.data && setImages((imgs) => imgs.concat(fetcher.data) as Image[]);
    setNextPage((np) => np + 1);
  }, [fetcher]);

  return (
    <div className="grid gap-4 grid-cols-4 m-2">
      {images.map((img: Image, index: number) => (
        <Link
          // since api returns 10 random images we need to use index to and live duplicites
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
          onClick={() => fetcher.load(`/feed?page=${nextPage}`)}
          className="flex items-center justify-center absolute top-0 bottom-0 left-0 right-0"
        >
          Load more
        </button>
      </div>
    </div>
  );
}
