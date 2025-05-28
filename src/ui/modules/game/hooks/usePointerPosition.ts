import { useEffect, useRef } from "react";

export function usePointerPosition() {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      positionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return {
    getPointerPosition: () => positionRef.current,
  };
}
