import { useLoaderData } from "react-router-dom";
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

export async function loader() {
  return await fetch(`${config.url}/images/search?limit=10`, {
    headers: config.headers,
  });
}

export function Feed() {
  const data = useLoaderData() as Image[];

  return (
    <div className="text-pink-400 flex-1">
      {/* <pre>{JSON.stringify(data, null, " ")}</pre> */}
      {data.map((img) => (
        <img className="w-32 h-32" key={img.id} alt={img.id} src={img.url} />
      ))}
    </div>
  );
}
