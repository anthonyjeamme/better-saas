import { useRef } from "react";

export function useCanvasElementRef() {
  const ref = useRef<HTMLCanvasElement>(null);
  return {
    ref,
    resize: ({ width, height }: { width: number; height: number }) => {
      const element = ref.current;
      if (!element) return;

      console.log("RESIZE", width, height);

      element.width = width;
      element.height = height;
    },
    getContext2D: () => {
      const context = ref.current?.getContext("2d");
      if (!context) throw new Error("No context found");
      return context;
    },
  };
}
