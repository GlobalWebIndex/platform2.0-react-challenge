import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full overflow-auto border border-gray-400 py-4 rounded mt-8 h-[calc(100vh_-_theme(spacing.32))]">
      {children}
    </div>
  );
}
