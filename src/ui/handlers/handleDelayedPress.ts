import React from "react";
import { Handler } from "./combineHandlers";

export type HandleLongPressOptions = {
  delay?: number;
};

/**
 *
 */
export function handleDelayedPress<T extends HTMLElement = HTMLElement>(
  callback: (e: React.PointerEvent<T>) => void,
  options?: HandleLongPressOptions
): Handler<T> {
  return {
    onPointerDown: (e) => {
      const timeout = setTimeout(() => {
        callback(e);
      }, options?.delay ?? 1000);

      window.addEventListener("pointerup", () => {
        clearTimeout(timeout);
      });
    },
  };
}
