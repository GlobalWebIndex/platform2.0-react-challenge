import { useParams } from "react-router-dom";
import { useAPI } from "../hooks/useData";
import BreedTemplate from "./BreedTemplate";

import Progress from "./Progress";
import { ENDPOINTS } from "../constants";

export default function BreedFetcher() {
  const { breedinfoid: breedId } = useParams();

  const [loading, cats = [], error] = useAPI(
    ENDPOINTS.GET_ONE_BREED({
      breed_id: breedId
    })
  );
  const breed = cats?.[0]?.breeds?.find(({ id }) => id === breedId);
  if (loading) return <Progress />;
  if (!breedId || error || !breed) return null;
  return <BreedTemplate id={breedId} name={breed.name} catprops={breed} />;
}
