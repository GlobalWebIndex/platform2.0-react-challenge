import { LinkProps } from "interfaces/general/Link";

export interface MenuItemProps extends LinkProps {};

export interface MenuProps {
    items: MenuItemProps[],
    showLanguages: boolean
};