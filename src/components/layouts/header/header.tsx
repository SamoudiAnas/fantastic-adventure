import { useSidebarStore } from "@/stores/sidebar-store";
import { Button } from "@/components/ui/button";
import { PanelRight } from "lucide-react";

export const Header = () => {
  const { isOpen, toggle } = useSidebarStore();
  return (
    <header className="flex items-center justify-between p-4 bg-gray-50 border-b border-b-gray-300 w-full z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="text-gray-500 hover:text-black outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 rounded"
        >
          <PanelRight />
          <span className="sr-only">{isOpen ? "Close" : "Expand"} Sidebar</span>
        </button>
        <h1 className="text-lg font-bold">Dashboard</h1>
      </div>
    </header>
  );
};
