import { deepEqual } from "../_shared/utils/deepEqual";
import { useEffect, useRef } from "react";

export function useValueChangeEffect<T>(
  value: T,
  callback: (value: T) => void,
  deps: React.DependencyList
) {
  const previousValueRef = useRef<T>(value);

  useEffect(() => {
    if (!deepEqual(previousValueRef.current, value)) {
      callback(value);
      previousValueRef.current = value;
    }
  }, [deps, value, callback]);
}
