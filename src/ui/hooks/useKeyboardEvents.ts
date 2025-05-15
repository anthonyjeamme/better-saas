import { useEffect, useRef } from "react";

export function useKeyboardEvents(callback: (e: KeyboardEvent) => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleKeyEvent(e: KeyboardEvent) {
      callbackRef.current(e);
    }

    window.addEventListener("keydown", handleKeyEvent);
    window.addEventListener("keyup", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);
}

export function useKeyboardEvent(
  type: "keydown" | "keyup",
  callback: (e: KeyboardEvent) => void,
  deps?: React.DependencyList
) {
  useEffect(() => {
    function handleKeyEvent(e: KeyboardEvent) {
      callback(e);
    }

    window.addEventListener(type, handleKeyEvent);

    return () => {
      window.removeEventListener(type, handleKeyEvent);
    };
  }, [type, callback, deps]);
}
