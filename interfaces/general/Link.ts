type LinkTargets = "_blank" | "_self" | "_parent" | "_top" | "framename";

export interface LinkProps {
    href: string,
    label?: string,
    target?: LinkTargets
};