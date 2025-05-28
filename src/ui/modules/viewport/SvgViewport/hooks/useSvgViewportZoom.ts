import { WheelEvent } from "react";
import { UseSvgViewportGeometry } from "./useSvgViewportGeometry";

export function useSvgViewportZoom(geometry: UseSvgViewportGeometry) {
  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const delta = e.deltaY > 0 ? -1 : 1;
    const newScale = geometry.scale * Math.pow(1.1, delta);

    const contentX = (clientX - geometry.position.x) / geometry.scale;
    const contentY = (clientY - geometry.position.y) / geometry.scale;

    const newX = clientX - contentX * newScale;
    const newY = clientY - contentY * newScale;

    geometry.setScale(newScale);
    geometry.setPosition(newX, newY);
  };

  return {
    onWheel,
  };
}
