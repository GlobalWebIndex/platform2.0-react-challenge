import { LinkProps } from "interfaces/general/Link";
import { MouseEvent } from "react";

export type ButtonTypes = "button" | "submit" | "reset" | undefined;

export interface ButtonProps {
    link: LinkProps,
    type?: ButtonTypes,
    className?: string,
    disabled?: boolean,
    onClick?: (arg: MouseEvent<HTMLButtonElement>) => void
};