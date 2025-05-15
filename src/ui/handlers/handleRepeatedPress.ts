import { Handler } from "./combineHandlers";

export type HandleRepeatedPressOptions = {
  delay?: number;
  interval?: number;
};

type EventHandler = {
  onStart?: () => void;
  onRepeat?: () => void;
  onEnd?: () => void;
};

/**
 *
 */
export function handleRepeatedPress<T extends HTMLElement = HTMLElement>(
  eventHandlers: EventHandler,
  options?: HandleRepeatedPressOptions
): Handler<T> {
  return {
    onPointerDown: () => {
      const delay = options?.delay ?? 500;
      const interval = options?.interval ?? 50;
      let intervalId: number;

      eventHandlers.onStart?.();

      const timeoutId = window.setTimeout(() => {
        eventHandlers.onRepeat?.();
        intervalId = window.setInterval(() => {
          eventHandlers.onRepeat?.();
        }, interval);
      }, delay);

      const clear = () => {
        window.clearTimeout(timeoutId);
        window.clearInterval(intervalId);
        eventHandlers.onEnd?.();
      };
      window.addEventListener("pointerup", clear, { once: true });
    },
  };
}
