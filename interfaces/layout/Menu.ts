import { LinkProps } from "interfaces/general/Link";

export interface MenuItemProps extends LinkProps {
    id: string | number
};

export interface MenuProps {
    items: MenuItemProps[],
    showLanguages: boolean
};