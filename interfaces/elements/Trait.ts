import { Breed } from "interfaces/pages/Breeds";

export type TraitProps = Pick<Breed, "dog_friendly" | "affection_level" | "child_friendly" | "energy_level" | "health_issues" | "grooming">