import { useRef } from "react";
import { useClickOutside } from "./useClickOutside";

/**
 *
 */
export function useClickOutsideRef<T extends HTMLElement>(
  handleClose: () => void,
  active = true
) {
  const ref = useRef<T | null>(null);
  useClickOutside(ref, handleClose, active);
  return ref;
}
