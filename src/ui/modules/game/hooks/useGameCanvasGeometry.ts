import { useRef } from "react";

export type UseGameCanvasGeometry = ReturnType<typeof useGameCanvasGeometry>;

export function useGameCanvasGeometry() {
  const positionRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(-Math.PI / 2);

  return {
    get position() {
      return positionRef.current;
    },
    set position(value: { x: number; y: number }) {
      positionRef.current = value;
    },
    get rotation() {
      return rotationRef.current;
    },
    set rotation(value: number) {
      rotationRef.current = value;
    },
  };
}
