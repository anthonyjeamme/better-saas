import { useRef } from "react";

export function useDivElementRef() {
  const ref = useRef<HTMLDivElement>(null);

  return {
    ref,
    getSize: () => {
      const element = ref.current;
      if (!element) throw new Error("No element found");

      return {
        width: element.clientWidth,
        height: element.clientHeight,
      };
    },
  };
}
