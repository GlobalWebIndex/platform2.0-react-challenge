import { ButtonProps } from "interfaces/elements/Button";
import Link from "next/link";
import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { link, type = "button", onClick = () => {}, className = "", disabled } = props;
    
    return (
        <Link href={link.href}>
            <button ref={ref} {...{disabled}} className={`disabled:opacity-0 disabled:pointer-events-none bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 backdrop-blur-lg px-12 py-2 md:py-3 block ${className}`} type={type} {...{onClick}}>
                {link.label}
            </button>
        </Link>
    )
});