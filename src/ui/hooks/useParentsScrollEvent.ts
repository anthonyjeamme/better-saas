import { useEffect, useRef } from "react";
import { useCallbackRef } from "./useCallbackRef";

export function useParentsScrollEvent(
  ref: React.RefObject<HTMLDivElement | null>,
  callback: () => void
) {
  const scrollableParentsRefs = useRef<HTMLElement[]>([]);

  const stableCallback = useCallbackRef(callback);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const scrollableParents = findScrollableParents(element);
    scrollableParentsRefs.current = scrollableParents;
  }, [ref]);

  useEffect(() => {
    const scrollableParents = scrollableParentsRefs.current;
    if (!scrollableParents) return;
    scrollableParents.forEach((parent) => {
      parent.addEventListener("scroll", stableCallback);
    });
  }, [stableCallback]);
}

function findScrollableParents(element: HTMLElement) {
  const scrollableParents: HTMLElement[] = [];
  let currentElement: HTMLElement | null = element;

  while (currentElement) {
    const style = window.getComputedStyle(currentElement);
    const overflowY = style.overflowY;
    const isScrollable =
      (overflowY === "auto" || overflowY === "scroll") &&
      currentElement.scrollHeight > currentElement.clientHeight;

    if (isScrollable) {
      scrollableParents.push(currentElement);
    }

    currentElement = currentElement.parentElement;
  }

  return scrollableParents;
}
