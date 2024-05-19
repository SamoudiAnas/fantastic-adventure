import { cn } from "@/utils/cn";
import { Header } from "../header";

interface BasicLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const BasicLayout = ({ children, className = "" }: BasicLayoutProps) => {
  return (
    <main className={cn("overflow-x-clip", className)}>
      <Header />
      {children}
    </main>
  );
};
BasicLayout.displayName = "BasicLayout";
