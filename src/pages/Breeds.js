import { useState } from "react";
import { useFetchAndSave } from "../hooks/useFetchAndSave";
import Gallery from "../components/Gallery";
import Searchbar from "../components/SearcBar";
import ErrorModal from "../components/ErrorModal";
import OverlayLoader from "../components/OverlayLoader";

const config = { url: "/breeds" };

export default function Breeds() {
  const [breeds, error, loading] = useFetchAndSave("breeds", config);
  const [filteredBreeds, setFilteredBreeds] = useState();

  return (
    <OverlayLoader active={loading}>
      <Searchbar
        data={breeds}
        setterCB={setFilteredBreeds}
        placeholder="search breeds"
      />
      <Gallery cards={filteredBreeds} />
      <ErrorModal active={error} />
    </OverlayLoader>
  );
}
