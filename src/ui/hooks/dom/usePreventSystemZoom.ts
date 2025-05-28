import { useEffect } from "react";

/**
 *
 */
export function usePreventSystemZoom<T extends HTMLElement>(
  elementRef: React.RefObject<T | null>
) {
  useEffect(() => {
    const root = elementRef.current;
    if (!root) return;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
    }

    root.addEventListener("wheel", onWheel);

    return () => {
      root.removeEventListener("wheel", onWheel);
    };
  }, [elementRef]);
}
