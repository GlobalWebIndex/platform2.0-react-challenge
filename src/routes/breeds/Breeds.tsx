import { Outlet, useLoaderData } from "react-router-dom";
import { config } from "../../config";
import { Layout, Link } from "~/ui";
import type { Breed } from "../router";
import { BreedList } from "~/ui/organism/breedList";

export async function loader() {
  return await fetch(`${config.url}/breeds`, {
    headers: config.headers,
  }).then((r) => r.json());
}

export function Breeds() {
  const breeds = useLoaderData() as Breed[];
  return (
    <Layout>
      <div className="flex border rounded h-full border-gray-400 py-4">
        <div className="overflow-auto flex-0 flex-basis-40 border-r pl-2 pr-4 border-gray-400 h-full">
          <BreedList breeds={breeds} />
        </div>
        <div className="overflow-auto flex-1 px-4">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
