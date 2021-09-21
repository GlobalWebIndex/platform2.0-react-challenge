import { useState } from "react";
import { useFetchAndSave } from "../hooks/useFetchAndSave";
import Gallery from "../components/Gallery";
import Searchbar from "../components/SearcBar";

const config = { url: "/breeds" };

export default function Breeds() {
  const [breeds] = useFetchAndSave("breeds", config);
  const [filteredBreeds, setFilteredBreeds] = useState();

  return (
    <>
      <Searchbar
        data={breeds}
        setterCB={setFilteredBreeds}
        placeholder="search breeds"
      />
      <Gallery cards={filteredBreeds} />
    </>
  );
}
