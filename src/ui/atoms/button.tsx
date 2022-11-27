import { cva, VariantProps } from "class-variance-authority";
import { TrashIcon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { Spinner } from "./spinner";

type ButtonProps = {
  name?: string;
  value?: string;
  children: ReactNode;
  iconRight?: React.ReactNode;
  intent?: "primary" | "danger";
  isLoading?: boolean;
};

const buttonStyles = cva(
  "rounded py-2 px-3 disabled:opacity-70 disabled:cursor-not-allowed",
  {
    variants: {
      intent: {
        primary: "bg-crimson-9 hover:bg-crimson-10 text-white",
        danger: "bg-red-9 hover:bg-red-10 text-white",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

export function Button({
  children,
  iconRight,
  intent,
  isLoading = false,
  ...btnProps
}: ButtonProps) {
  return (
    <button
      disabled={isLoading}
      className={buttonStyles({ intent })}
      {...btnProps}
    >
      <div className="flex space-x-2 items-center">
        <span>{children}</span>
        {!isLoading && iconRight}
        {isLoading && <Spinner intent={intent} size="small" />}
      </div>
    </button>
  );
}

const iconMap = {
  trash: TrashIcon,
};
type IconNames = keyof typeof iconMap;

const iconStyles = cva("", {
  variants: {
    size: {
      small: "w-4 h-4",
      medium: "w-6 h-6",
      big: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type IconVariants = VariantProps<typeof iconStyles>;
type IconButtonProps = IconVariants & {
  name?: string;
  value?: string;
  isLoading?: boolean;
  icon: IconNames;
  className?: string;
};
export function IconButton({
  name,
  icon,
  value,
  size,
  isLoading,
}: IconButtonProps) {
  const Icon = iconMap[icon];
  return (
    <button
      disabled={isLoading}
      name={name}
      value={value}
      className="group-hover:block opacity-0 group-hover:disabled:opacity-70 transition-opacity duration-300 group-hover:opacity-95 top-2 right-2 absolute rounded-full p-1.5 bg-mauve-4"
    >
      {!isLoading && <Icon className={iconStyles({ size })} />}
      {isLoading && <Spinner size={size} />}
    </button>
  );
}
