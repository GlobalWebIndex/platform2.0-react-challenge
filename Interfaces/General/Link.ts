type LinkTargets = "_blank" | "_self" | "_parent" | "_top" | "framename";

export interface LinkProps {
    href: string,
    title?: string,
    target: LinkTargets
};