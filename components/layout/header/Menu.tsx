import { MenuProps } from "interfaces/layout/Menu";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export const Menu = ({ items, showLanguages }: MenuProps) => {
    const { t } = useTranslation("menu");

    return (
        <nav className={(showLanguages) && "hidden sm:block" || ""}>
            <ul className="flex p-4 flex-row space-x-4 md:space-x-8">
                {
                    items.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link href={item.href} aria-current="page" passHref>
                                    <a className="block py-2 md:px-4 rounded hover:opacity-75 transition-opacity">{t(String(item.label))}</a>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
};