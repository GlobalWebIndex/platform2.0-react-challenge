import { useLoaderData } from "react-router-dom";
import { config } from "../config";

export async function loader() {
  return await fetch(`${config.url}/favourites`, {
    headers: config.headers,
  });
}

export function Favourites() {
  const data = useLoaderData();
  return (
    <div className="text-green-500">
      <pre>{JSON.stringify(data, null, " ")}</pre>
    </div>
  );
}
