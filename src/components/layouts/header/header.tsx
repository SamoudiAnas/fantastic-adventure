import { useSidebarStore } from "@/stores/sidebar-store";
import { Button } from "@/components/ui/button";
import { PanelRight } from "lucide-react";

export const Header = () => {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <header className="z-10 flex h-16 w-screen items-center justify-between border-b border-b-gray-300 bg-gray-50 p-4">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="rounded text-gray-500 outline-none hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          <PanelRight />
          <span className="sr-only">{isOpen ? "Close" : "Expand"} Sidebar</span>
        </button>
        <h1 className="text-lg font-bold">Maintenance Tracking System</h1>
      </div>
    </header>
  );
};
