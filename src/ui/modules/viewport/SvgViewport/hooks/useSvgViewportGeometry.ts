import { useRef } from "react";

type SvgViewportGeometry = {
  position: { x: number; y: number };
  scale: number;
};

export type UseSvgViewportGeometry = ReturnType<typeof useSvgViewportGeometry>;

export function useSvgViewportGeometry(
  onChange?: (geometry: SvgViewportGeometry) => void
) {
  const geometryRef = useRef<SvgViewportGeometry>({
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
      geometryRef.current.position = { x, y };
      onChange?.(geometryRef.current);
    },
    setScale: (scale: number) => {
      geometryRef.current.scale = scale;
      onChange?.(geometryRef.current);
    },
  };
}
