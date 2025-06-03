import { useRef } from "react";

type EventMap = Record<string, unknown>;

type EventCallback<T> = (event: T) => void;

export function useEventListeners<TEventMap extends EventMap = EventMap>() {
  const listeners = useRef<{
    [K in keyof TEventMap]?: EventCallback<TEventMap[K]>[];
  }>({});

  return {
    addEventListener: <K extends keyof TEventMap>(
      eventName: K,
      callback: EventCallback<TEventMap[K]>
    ) => {
      if (!listeners.current[eventName]) {
        listeners.current[eventName] = [];
      }
      listeners.current[eventName]!.push(callback);
    },
    removeEventListener: <K extends keyof TEventMap>(
      eventName: K,
      callback: EventCallback<TEventMap[K]>
    ) => {
      if (!listeners.current[eventName]) return;
      listeners.current[eventName] = listeners.current[eventName]!.filter(
        (cb) => cb !== callback
      );
    },
    dispatchEvent: <K extends keyof TEventMap>(
      eventName: K,
      event: TEventMap[K]
    ) => {
      if (!listeners.current[eventName]) return;
      listeners.current[eventName]!.forEach((cb) => cb(event));
    },
  };
}
