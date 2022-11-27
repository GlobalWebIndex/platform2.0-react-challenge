import { cva } from "class-variance-authority";
import { Link2Icon } from "@radix-ui/react-icons";
import { ReactNode } from "react";
import { NavLink, LinkProps as RouterLinkProps } from "react-router-dom";
import { isExternal } from "util/types";

type ExternalLinkProps = {
  isExternal: boolean;
  href: string;
};

type InternalLinkProps = {
  to: string;
  end?: boolean;
};

type LinkProps = Omit<RouterLinkProps, "to" | "href"> & {
  children?: ReactNode;
} & XOR<InternalLinkProps, ExternalLinkProps>;

const linkStyle = cva(
  "flex items-center text-crimson-11 hover:text-crimson-11",
  {
    variants: {
      state: {
        default: "hover:underline",
        active: "bg-crimson-4 text-crimson-11 px-2 rounded-lg text-lg",
      },
      type: {
        external: "flex items-center text-crimson-11",
      },
    },
    defaultVariants: {},
  }
);

export function Link(props: LinkProps) {
  if (props.isExternal) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.href}
        className={linkStyle({ type: "external" })}
      >
        {props.children}
        <Link2Icon className="fill-crimson-9" />
      </a>
    );
  }

  return (
    <NavLink
      end={props.end}
      className={({ isActive }) =>
        linkStyle({
          state: isActive ? "active" : "default",
        })
      }
      to={props.to!}
    >
      {props.children}
    </NavLink>
  );
}

const linkBoxStyle = cva("flex flex-col space-y-1 px-2 py-1 rounded", {
  variants: {
    state: {
      active: "bg-crimson-4 text-crimson-11",
    },
  },
});
export function LinkBox(props: LinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        linkBoxStyle({
          state: isActive ? "active" : undefined,
        })
      }
      to={props.to!}
    >
      {props.children}
    </NavLink>
  );
}
