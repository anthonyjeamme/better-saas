import { useState } from "react";
import { usePointerDrag } from "./usePointerDrag";
import { evaluateCSSValue } from "../functions/dom";
import { bounds, Size } from "../functions/math";

type CSSSize = number | string;

export type UseResize = ReturnType<typeof useResize>;

export type UseResizeOptions = {
  axis: "x" | "y" | "both";
  minWidth?: CSSSize;
  maxWidth?: CSSSize;
  minHeight?: CSSSize;
  maxHeight?: CSSSize;
  anchorPoint:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
    | "middle-left"
    | "middle-center"
    | "middle-right";
};

type UseResizeEvents = {
  onResize?: (size: Partial<Size>) => void;
  onResizeStart?: () => void;
  onResizeEnd?: (size: Partial<Size>) => void;
};

/**
 *
 */
export function useResize<T extends HTMLElement>(
  getRoot: () => T | null,
  {
    axis = "both",
    anchorPoint = "top-left",
    minWidth = 0,
    maxWidth = Infinity,
    minHeight = 0,
    maxHeight = Infinity,
  }: UseResizeOptions,
  events?: UseResizeEvents
) {
  const [isResizing, setIsResizing] = useState(false);
  const { getPointerHandler } = usePointerDrag();

  return {
    isResizing,
    handler: getPointerHandler(() => {
      const root = getRoot();
      if (!root) return null;

      setIsResizing(true);
      const initSize = {
        width: root.clientWidth,
        height: root.clientHeight,
      };

      const minWidthPx = evaluateCSSValue(minWidth, "width", root);
      const maxWidthPx = evaluateCSSValue(maxWidth, "width", root);
      const minHeightPx = evaluateCSSValue(minHeight, "height", root);
      const maxHeightPx = evaluateCSSValue(maxHeight, "height", root);

      function computeSize(delta: { x: number; y: number }) {
        function computeWidth() {
          if (anchorPoint.includes("right")) {
            return initSize.width - delta.x;
          }
          if (anchorPoint.includes("center")) {
            return initSize.width + delta.x / 2;
          }
          return initSize.width + delta.x;
        }

        function computeHeight() {
          if (anchorPoint.includes("bottom")) {
            return initSize.height - delta.y;
          }
          if (anchorPoint.includes("middle")) {
            return initSize.height + delta.y / 2;
          }
          return initSize.height + delta.y;
        }

        let width: number | undefined;
        let height: number | undefined;

        if (axis === "x" || axis === "both") {
          width = bounds(computeWidth(), minWidthPx, maxWidthPx);
        }

        if (axis === "y" || axis === "both") {
          height = bounds(computeHeight(), minHeightPx, maxHeightPx);
        }

        return {
          width,
          height,
        };
      }

      return {
        onMove: ({ delta }) => {
          const { width, height } = computeSize(delta);

          if (width !== undefined) root.style.width = `${width}px`;
          if (height !== undefined) root.style.height = `${height}px`;

          events?.onResize?.({ width, height });
        },
        onEnd: ({ delta }) => {
          setIsResizing(false);
          const { width, height } = computeSize(delta);

          events?.onResizeEnd?.({ width, height });
        },
      };
    }),
  };
}
