import { useEffect, useRef, useState } from "react";

export function useHasFocus<T extends HTMLElement>() {
  const [hasFocus, setHasFocus] = useState(false);

  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("focus", () => setHasFocus(true));
    element.addEventListener("blur", () => setHasFocus(false));
  }, []);

  return [hasFocus, ref] as [boolean, React.RefObject<T>];
}
