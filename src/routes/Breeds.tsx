import { useLoaderData } from "react-router-dom";
import { config } from "../config";

export async function loader() {
  return await fetch(`${config.url}/breeds`, {
    headers: config.headers,
  });
}

export function Breeds() {
  const data = useLoaderData();
  return (
    <div className="text-teal-500">
      <pre>{JSON.stringify(data, null, " ")}</pre>
    </div>
  );
}
