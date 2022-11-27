import { useFetcher, useRouteLoaderData } from "react-router-dom";
import { Button } from "~/ui";
import { Favourite } from "../router";

type FavouriteButtonProps = {
  imgId: string;
};
export function FavouriteButton({ imgId }: FavouriteButtonProps) {
  const fetcher = useFetcher();
  const favs = useRouteLoaderData("root") as Favourite[];
  const favourite = favs.find((f) => f.image_id === imgId);
  const isFavourite = !!favourite;

  return (
    <fetcher.Form method="post">
      <input
        type="hidden"
        name="id"
        value={isFavourite ? favourite.id : imgId}
      />

      <Button
        name="favourite"
        value={isFavourite ? "false" : "true"}
        intent={isFavourite ? "danger" : "primary"}
        isLoading={
          fetcher.state === "loading" || fetcher.state === "submitting"
        }
      >
        {!isFavourite ? "Add to favorites" : "Remove from favorites"}
      </Button>
    </fetcher.Form>
  );
}
