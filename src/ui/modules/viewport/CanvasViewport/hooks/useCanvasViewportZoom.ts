import { WheelEvent } from "react";
import { UseCanvasViewportGeometry } from "./useCanvasViewportGeometry";
import { CanvasViewportOptions } from "../CanvasViewport.types";

export function useCanvasViewportZoom(
  geometry: UseCanvasViewportGeometry,
  options?: CanvasViewportOptions
) {
  const onWheel = (e: WheelEvent<HTMLCanvasElement>) => {
    const minZoom = options?.minZoom ?? 0.1;
    const maxZoom = options?.maxZoom ?? 10;

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const delta = e.deltaY > 0 ? -1 : 1;
    const newScale = Math.max(
      minZoom,
      Math.min(
        maxZoom,
        geometry.ref.current.scale * Math.pow(options?.zoomFactor ?? 1.1, delta)
      )
    );

    const canvasX =
      (clientX - geometry.ref.current.position.x) / geometry.ref.current.scale;
    const canvasY =
      (clientY - geometry.ref.current.position.y) / geometry.ref.current.scale;

    const newX = clientX - canvasX * newScale;
    const newY = clientY - canvasY * newScale;

    geometry.scale = newScale;
    geometry.position = { x: newX, y: newY };
  };

  return {
    onWheel,
  };
}
