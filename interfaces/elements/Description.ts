import { Breed } from "interfaces/pages/Breeds";

export type DescriptionProps = Pick<Breed, "description" | "alt_names" | "temperament" | "life_span">