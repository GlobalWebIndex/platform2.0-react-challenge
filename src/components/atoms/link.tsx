import { Link2Icon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

type ExternalLinkProps = {
  isExternal: boolean;
  href: string;
};

type InternalLinkProps = {
  to: string;
};

type LinkProps = Omit<RouterLinkProps, "to" | "href"> & {
  children?: ReactNode;
} & XOR<InternalLinkProps, ExternalLinkProps>;

export function Link(props: LinkProps) {
  if (props.isExternal) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.href}
        className="flex items-center text-blue-600 hover:text-blue-700 hover:underline"
      >
        {props.children}
        <Link2Icon />
      </a>
    );
  }

  return (
    <RouterLink
      className="hover:underline text-blue-600 hover:text-blue-700"
      to={props.to!}
    >
      {props.children}
    </RouterLink>
  );
}
