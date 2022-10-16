import { Breed } from "../../types/types";

export const getAttributes = (breed: Breed) => ({
  Weight: breed.weight.metric,
  Temperament: breed.temperament,
  Origin: breed.origin,
  Life_Span: breed.life_span,
  Affection_Level: breed.affection_level,
  Child_Friendly: breed.child_friendly,
  Stanger_Friendly: breed.stranger_friendly,
  Dog_Friendly: breed.dog_friendly,
  Intelligence: breed.intelligence,
  Energy_Level: breed.energy_level,
});
