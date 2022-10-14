import { ButtonProps } from "interfaces/elements/Button";
import Link from "next/link";

export const Button = ({ link, type = "button", onClick = () => {}, className = "", disabled }: ButtonProps) => {
    return (
        <Link href={link.href}>
            <button {...{disabled}} className={`transition-opacity disabled:opacity-0 disabled:pointer-events-none shadow-sm bg-white/80 dark:bg-black/80 backdrop-blur-lg px-12 py-2 md:py-4 block ${className}`} type={type} {...{onClick}}>
                {link.label}
            </button>
        </Link>
    )
};