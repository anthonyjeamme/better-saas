import { useRef } from "react";

type CanvasViewportGeometry = {
  position: { x: number; y: number };
  scale: number;
};

export type UseCanvasViewportGeometry = ReturnType<
  typeof useCanvasViewportGeometry
>;

export function useCanvasViewportGeometry(
  onChange: (geometry: CanvasViewportGeometry) => void
) {
  const geometryRef = useRef<CanvasViewportGeometry>({
    position: { x: 0, y: 0 },
    scale: 1,
  });

  return {
    ref: geometryRef,
    get position() {
      return geometryRef.current.position;
    },
    get scale() {
      return geometryRef.current.scale;
    },
    set position({ x, y }: { x: number; y: number }) {
      geometryRef.current.position = {
        x: Math.round(x),
        y: Math.round(y),
      };
      onChange(geometryRef.current);
    },
    set scale(scale: number) {
      geometryRef.current.scale = scale;
      onChange(geometryRef.current);
    },
  };
}
