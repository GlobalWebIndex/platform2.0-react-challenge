import { useEffect } from "react/cjs/react.development";
import { useAxios } from "../hooks/useAxios";
import Gallery from "../components/Gallery";

export default function Breeds() {
  const [breeds, error, loading, fetchBreeds] = useAxios();

  useEffect(() => {
    if (!breeds) fetchBreeds({ url: "/breeds" });
  }, [breeds, fetchBreeds]);

  useEffect(() => {
    console.log({ breeds });
  });

  return (
    <>
      <h1>Breeds</h1>
      <Gallery cards={breeds} />
    </>
  );
}
