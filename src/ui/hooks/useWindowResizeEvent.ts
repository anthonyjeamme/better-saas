"use client";

import { useCallback, useEffect } from "react";

export type WindowResizeEventCallback = (width: number, height: number) => void;

export function useWindowResizeEvent(callback: WindowResizeEventCallback) {
  const onResize = useCallback(() => {
    callback(window.innerWidth, window.innerHeight);
  }, [callback]);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);
}
