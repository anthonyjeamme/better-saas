import { useKeyboardEvents } from "@ui/hooks/useKeyboardEvents";
import { useRef } from "react";

export function useKeyboardMap(onEvent?: (e: KeyboardEvent) => void) {
  const keyMap = useRef<Record<string, true>>({});

  useKeyboardEvents((e) => {
    if (e.type === "keydown" && !keyMap.current[e.key]) {
      keyMap.current[e.key] = true;
      onEvent?.(e);
    }
    if (e.type === "keyup") {
      delete keyMap.current[e.key];
      onEvent?.(e);
    }
  });

  return {
    isPressed: (key: string) => Boolean(keyMap.current[key]),
  };
}
