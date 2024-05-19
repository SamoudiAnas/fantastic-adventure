import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

interface PanelProps {
  dataId: string;
  selectedData: string[];
  onClear: (...args: any) => any;
  onDelete: (...args: any) => any;
}

export function Panel({ dataId, selectedData, onClear, onDelete }: PanelProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
      <div
        aria-disabled={selectedData.length === 0}
        className={cn(
          "flex items-center justify-between",
          " z-50 mx-auto w-full rounded-lg border bg-white p-4 shadow-lg fill-mode-forwards md:w-96 xl:w-[35rem]",
          selectedData.length && "animate-in fade-in slide-in-from-bottom ",
          !selectedData.length &&
            "pointer-events-none animate-out fade-out slide-out-to-bottom ",
        )}
      >
        <p>
          {selectedData.length} {dataId} selected
        </p>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outlined-ghost" onClick={onClear}>
            Clear
          </Button>
          <Button size="sm" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
