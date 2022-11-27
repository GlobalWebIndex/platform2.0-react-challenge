import { Breed } from "~/routes/router";
import { Link, LinkBox } from "../atoms/link";

type BreedListProps = {
  breeds: Breed[];
};
export function BreedList({ breeds }: BreedListProps) {
  return (
    <ul className="space-y-2 overflow-hidden">
      {breeds.map(({ id, name, origin }) => (
        <li key={id}>
          <LinkBox to={id}>
            <div className="">{name}</div>
            <div className="text-mauve-9 text-sm">{origin}</div>
          </LinkBox>
        </li>
      ))}
    </ul>
  );
}
