import { useState } from "react";
import { useClickOutsideRef } from "./useClickOutsideRef";

/**
 *
 */
export function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useClickOutsideRef<HTMLDivElement>(
    () => setIsOpen(false),
    isOpen
  );

  return {
    isOpen,
    setIsOpen,
    toggle: () => setIsOpen(!isOpen),
    rootRef,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
}
