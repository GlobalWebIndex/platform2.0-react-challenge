import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import { FavouritesService } from "~/api";
import { Button, ImageGrid, Layout } from "~/components";
import { Favourite } from "../router";

export async function loader() {
  return await FavouritesService.getFavourites();
}

export function Favourites() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const data = useRouteLoaderData("root") as Favourite[];
  return (
    <Layout>
      <ImageGrid images={data.map((fav) => fav.image)} />
    </Layout>
  );
}
