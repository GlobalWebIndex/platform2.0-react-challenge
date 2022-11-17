import { useLoaderData } from "react-router-dom";
import { config } from "../config";

export async function loader() {
  return await fetch(`${config.url}/images/search?limit=10`, {
    headers: config.headers,
  });
}

export function Feed() {
  const data = useLoaderData();

  return (
    <div className="text-pink-400">
      <pre>{JSON.stringify(data, null, " ")}</pre>
    </div>
  );
}
