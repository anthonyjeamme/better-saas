import { useEffect } from "react";

/**
 *
 */
export function useMutationObserver(
  getElement: () => HTMLElement | null,
  callback: MutationCallback,
  options?: MutationObserverInit
) {
  useEffect(() => {
    const element = getElement();
    if (!element) return;

    const observer = new MutationObserver(callback);
    observer.observe(element, options);

    return () => observer.disconnect();
  }, [callback, getElement, options]);
}

/**
 *
 */
export function useAttributeMutationObserver(
  getElement: () => HTMLElement | null,
  attribute: string,
  callback: (value: string | null) => void
) {
  useEffect(() => {
    const element = getElement();

    if (!element) return;

    const observer = new MutationObserver(() => {
      const value = element.getAttribute(attribute);
      callback(value ?? null);
    });
    observer.observe(element, {
      attributes: true,
      attributeFilter: [attribute],
    });

    return () => observer.disconnect();
  }, [callback, getElement, attribute]);
}

/**
 *
 */
export function useChildrenMutationObserver(
  getElement: () => HTMLElement | null,
  callback: (children: NodeListOf<ChildNode>) => void
) {
  useEffect(() => {
    const element = getElement();
    if (!element) return;

    const observer = new MutationObserver(() => {
      callback(element.childNodes);
    });
    observer.observe(element, {
      childList: true,
    });

    return () => observer.disconnect();
  }, [callback, getElement]);
}
