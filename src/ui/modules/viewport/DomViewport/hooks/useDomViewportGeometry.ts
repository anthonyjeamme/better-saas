import { useRef } from "react";

type DomViewportGeometry = {
  position: { x: number; y: number };
  scale: number;
};

export type UseDomViewportGeometry = ReturnType<typeof useDomViewportGeometry>;

export function useDomViewportGeometry(
  onChange?: (geometry: DomViewportGeometry) => void
) {
  const geometryRef = useRef<DomViewportGeometry>({
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
    setPosition: (x: number, y: number) => {
      geometryRef.current.position = { x: Math.round(x), y: Math.round(y) };
      onChange?.(geometryRef.current);
    },
    setScale: (scale: number) => {
      geometryRef.current.scale = scale;
      onChange?.(geometryRef.current);
    },
  };
}
