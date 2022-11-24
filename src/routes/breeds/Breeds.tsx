import { Link, Outlet, useLoaderData } from "react-router-dom";
import { config } from "../../config";
import { Layout } from "~/ui";
import type { Breed } from "../router";

function pickBreed(breed: Breed) {
  return { id: breed.id, name: breed.name, origin: breed.origin };
}
type BreedListItem = ReturnType<typeof pickBreed>;

export async function loader() {
  return await fetch(`${config.url}/breeds`, {
    headers: config.headers,
  }).then((r) => r.json());
}

export function Breeds() {
  const breeds = useLoaderData() as BreedListItem[];
  return (
    <Layout>
      <div className="flex border rounded h-full border-gray-400 py-4">
        <div className="overflow-auto flex-0 flex-basis-40 border-r pl-2 pr-4 border-gray-400 h-full">
          <ul className="space-y-2 overflow-hidden">
            {breeds.map(({ id, name, origin }) => (
              <li key={id}>
                <Link
                  className="flex flex-col  border-b px-2 py-1 border-gray-300"
                  to={id}
                >
                  <div className="">{name}</div>
                  <div className="text-gray-500 text-sm">{origin}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-auto flex-1 px-4">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
