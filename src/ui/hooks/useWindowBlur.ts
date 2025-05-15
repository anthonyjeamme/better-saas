import { useEffect } from "react";

export function useWindowBlur(callback: () => void) {
  useEffect(() => {
    window.addEventListener("blur", callback);
  }, [callback]);
}
