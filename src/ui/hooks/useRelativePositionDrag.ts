import { handleDrag } from "@ui/handlers/handleDrag";

export function useRelativePositionDrag(
  onChange: (
    position: { x: number; y: number },
    eventType: "start" | "move" | "end"
  ) => void
) {
  return {
    handler: handleDrag((_, e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const root = e.currentTarget as HTMLDivElement;
      const rect = root.getBoundingClientRect();
      let x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      let y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      onChange({ x, y }, "start");

      return {
        onMove: (_, e) => {
          const rect = root.getBoundingClientRect();
          x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
          onChange({ x, y }, "move");
        },
        onEnd: () => {
          onChange({ x, y }, "end");
        },
      };
    }),
  };
}
