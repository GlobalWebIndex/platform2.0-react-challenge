import { useContext } from "react";
import { useFetchAndSave } from "../hooks/useFetchAndSave";
import Gallery from "../components/Gallery";

export default function Breeds() {
  const [breeds] = useFetchAndSave("breeds", { url: "/breeds" });

  return (
    <>
      <h1>Breeds</h1>
      <Gallery cards={breeds} />
    </>
  );
}
