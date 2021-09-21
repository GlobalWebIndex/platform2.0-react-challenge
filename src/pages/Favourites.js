import { useEffect } from "react";
import { useAxios } from "./../hooks/useAxios";
import OverlayLoader from "../components/OverlayLoader";
import Gallery from "../components/Gallery";

export default function Favourites() {
  const [favourites, error, loading, fetch] = useAxios();

  useEffect(() => {
    if (!favourites) fetch({ url: "/favourites" });
  }, [favourites, fetch]);

  return (
    <OverlayLoader active={loading}>
      <Gallery cards={favourites} />
    </OverlayLoader>
  );
}
