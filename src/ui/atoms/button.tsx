import { StarIcon } from "@radix-ui/react-icons";
import { cva } from "class-variance-authority";
import { ReactNode } from "react";

type ButtonProps = {
  name?: string;
  value?: string;
  children: ReactNode;
  iconRight?: React.ReactNode;
  intent?: "primary" | "danger";
};

const cn = cva("rounded py-2 px-3", {
  variants: {
    intent: {
      primary: "bg-crimson-9 hover:bg-crimson-10 text-white",
      danger: "bg-red-9 hover:bg-red-10 text-white",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

export function Button({
  children,
  iconRight,
  intent,
  ...btnProps
}: ButtonProps) {
  return (
    <button className={cn({ intent })} {...btnProps}>
      <div className="flex space-x-2 items-center">
        <span>{children}</span>
        {iconRight}
      </div>
    </button>
  );
}
