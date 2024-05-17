import { useSidebarStore } from "@/stores/sidebar-store";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavProps {
  name: string;
  path: string;
  icon: JSX.Element;
}

export const SidebarNav = ({ name, icon, path }: NavProps) => {
  const { pathname } = useRouter();
  const { isOpen } = useSidebarStore();

  const isCurrentPage = pathname === path;

  return (
    <Link
      href={path}
      className={cn(
        "flex gap-3 group items-center my-2 py-2 px-3 rounded-md text-gray-500 text-sm",
        "group-hover:cursor-pointer hover:bg-indigo-600 hover:text-white hover:shadow-main transition-all",
        isCurrentPage && "bg-indigo-600 text-white shadow-main",
        !isOpen && "justify-center"
      )}
    >
      {icon}
      {isOpen && <h3>{name}</h3>}
    </Link>
  );
};
