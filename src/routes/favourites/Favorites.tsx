import { useRouteLoaderData } from "react-router-dom";
import { ImageFavouriteGrid, Layout } from "~/ui";
import { Favourite } from "../router";

export function Favourites() {
  const data = useRouteLoaderData("root") as Favourite[];
  return (
    <Layout>
      <ImageFavouriteGrid
        images={data.map((fav) => ({ url: fav.image.url, id: fav.id }))}
      />
    </Layout>
  );
}
