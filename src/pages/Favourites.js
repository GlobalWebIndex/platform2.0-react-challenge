import { useContext } from "react";
import Context from "../context/AppContext";
import OverlayLoader from "../components/OverlayLoader";
import Gallery from "../components/Gallery";

export default function Favourites() {
  const {
    favouritesData: { favourites, favouritesLoading },
  } = useContext(Context);

  return (
    <OverlayLoader active={favouritesLoading}>
      <Gallery cards={favourites} />
    </OverlayLoader>
  );
}
