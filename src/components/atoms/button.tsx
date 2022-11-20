import { StarIcon } from "@radix-ui/react-icons";

type ButtonProps = {
  iconRight?: React.ReactNode;
};

export function Button({ iconRight }: ButtonProps) {
  return (
    <button className="bg-emerald-700 hover:bg-emerald-800 rounded py-2 px-3 text-white">
      <div className="flex space-x-2 items-center">
        <span>Add to favorites</span>
        {iconRight}
      </div>
    </button>
  );
}
