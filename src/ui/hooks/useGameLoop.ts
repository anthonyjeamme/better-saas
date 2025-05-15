import { useEffect, useRef, useState } from "react";

/**
 *
 */
export function useGameLoop(
  callback: (dt: number) => void,
  deps?: React.DependencyList
) {
  const [isRunning, setIsRunning] = useState(true);
  const requestIdRef = useRef<number | undefined>(undefined);
  const previousTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isRunning) return;

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = (time - previousTimeRef.current) / 1000;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestIdRef.current = requestAnimationFrame(animate);
    };

    requestIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [callback, deps, isRunning]);

  return {
    isRunning,
    start() {
      setIsRunning(true);
    },
    stop() {
      setIsRunning(false);
    },
  };
}
