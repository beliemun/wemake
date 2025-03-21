import { type PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
