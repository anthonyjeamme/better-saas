import { useState } from "react";

import { useEffect } from "react";
import { useBroadcastChannel } from "../useBroadcastChannel";
import { ZodSchema } from "zod";

type UseLocalStorageOptions = {
  sync?: boolean;
  zodValidation?: ZodSchema;
};

/**
 * Idea : add zod validation
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions
) {
  const [value, _setValue] = useState<T>(initialValue);

  const { send } = useBroadcastChannel(`useLocalStorage_${key}`, (message) => {
    if (!options?.sync) return;
    _setValue(JSON.parse(message));
  });

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      if (options?.zodValidation) {
        const parsedValue = options.zodValidation.parse(storedValue);
        _setValue(parsedValue);
      } else {
        _setValue(JSON.parse(storedValue));
      }
    }
  }, [key, options?.zodValidation]);

  return [value, setValue] as [T, (value: T) => void];

  function setValue(value: T) {
    localStorage.setItem(key, JSON.stringify(value));

    if (options?.sync) send(JSON.stringify(value));

    _setValue(value);
  }
}
