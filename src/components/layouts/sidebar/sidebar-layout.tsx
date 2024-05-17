import { cn } from "@/utils/cn";
import { useEffect } from "react";
import { useSidebarStore } from "@/stores/sidebar-store";
import { SidebarNav } from "./sidebar-nav";
import { appLinks } from "@/constants/appRoutes";
import { BasicLayout } from "../basic";

const SCREEN_SIZE_MD = 768;

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const { isOpen, set: setSidebar } = useSidebarStore();

  useEffect(() => {
    // Close sidebar on small screens
    const handleWindowResize = () => {
      if (window.innerWidth < SCREEN_SIZE_MD) {
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <BasicLayout>
      <div className="flex">
        <aside
          className={cn(
            "bg-gray-50 min-h-screen h-screen flex flex-col justify-between py-4 transition-all border-r border-r-gray-300",
            isOpen ? "w-80 px-4" : "w-14 px-1"
          )}
        >
          {/*============= NAV ELEMENTS ================ */}
          <div className="flex-grow">
            {appLinks.map((navElement, index) => (
              <SidebarNav
                key={index}
                name={navElement.name}
                path={navElement.path}
                icon={navElement.icon}
              />
            ))}
          </div>
        </aside>

        <div className="flex-grow">{children}</div>
      </div>
    </BasicLayout>
  );
};
