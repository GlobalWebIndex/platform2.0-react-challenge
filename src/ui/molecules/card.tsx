import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

type CardFooterProps = {
  children: ReactNode;
};

export function CardFooter({ children }: CardFooterProps) {
  return (
    <div className=" flex justify-end pb-2">
      <div className="px-2">{children}</div>
    </div>
  );
}

type CardBodyProps = {
  children: ReactNode;
};

export function CardBody({ children }: CardBodyProps) {
  return <div className="border-b border-gray-300 p-2">{children}</div>;
}

export function Card({ children }: CardProps) {
  return <div className="flex flex-col space-y-2">{children}</div>;
}
