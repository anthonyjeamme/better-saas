import { useRef } from "react";
import { computeNextValue } from "./NumberInput.utils";

const ALLOWED_INTEGER_KEYS_REGEX = /^[-0-9]$/;
const ALLOWED_DECIMAL_KEYS_REGEX = /^[-0-9\.,]$/;

type Options = {
  integer: boolean;
  fixed?: number;
};

export function useNumberInput({ integer, fixed }: Options) {
  const inputRef = useRef<HTMLInputElement>(null);

  const ALLOWED_KEYS_REGEX = integer
    ? ALLOWED_INTEGER_KEYS_REGEX
    : ALLOWED_DECIMAL_KEYS_REGEX;

  return {
    inputRef,
    keyDownIsAllowed,
  };

  /**
   * Check if the key is allowed to be pressed
   */
  function keyDownIsAllowed(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key.length > 1) return true;
    if (e.ctrlKey || e.metaKey) return true;

    if (!ALLOWED_KEYS_REGEX.test(e.key)) return false;

    if (!integer && (e.key === "." || e.key === ",")) {
      const nextValue = computeNextValue(e);

      if (nextValue.split(".").length > 2) return false;
    }

    if (e.key === "-") {
      const nextValue = computeNextValue(e);
      if (nextValue.split("-").length > 2) return false;
      if (nextValue.includes("-") && !nextValue.startsWith("-")) return false;
    }

    if (fixed !== undefined) {
      const nextValue = computeNextValue(e);
      const parts = nextValue.split(".");
      if (parts.length === 2 && parts[1].length > fixed) return false;
    }

    return true;
  }
}
