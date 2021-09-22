import { useContext } from "react";
import Context from "../context/AppContext";
import OverlayLoader from "../components/OverlayLoader";
import Gallery from "../components/Gallery";
import ErrorModal from "../components/ErrorModal";

export default function Favourites() {
  const {
    favouritesData: { favourites, favouritesError, favouritesLoading },
  } = useContext(Context);

  return (
    <>
      <OverlayLoader active={favouritesLoading}>
        <Gallery cards={favourites} />
      </OverlayLoader>
      <ErrorModal active={favouritesError} />
    </>
  );
}
