import { useEffect, useCallback } from "react";

type ResizeCallback = (size: { width: number; height: number }) => void;

export function useResizeObserver(
  ref: React.RefObject<HTMLDivElement | null>,
  callback: ResizeCallback
) {
  const stableCallback = useCallback(callback, [callback]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    try {
      const observer = new ResizeObserver((entries) => {
        if (!entries[0]) return;

        const entry = entries[0];
        stableCallback({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });

      observer.observe(element);
      return () => observer.disconnect();
    } catch (error) {
      console.error("Error in useResizeObserver:", error);
    }
  }, [ref, stableCallback]);
}
