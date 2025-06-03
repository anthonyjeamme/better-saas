export const evaluateCSSValue = (
  value: number | string,
  dimension: "width" | "height",
  element: HTMLElement
): number => {
  if (typeof value === "number") return value;

  const root = element;
  if (!root) return 0;

  const temp = document.createElement("div");
  temp.style.position = "absolute";
  temp.style.visibility = "hidden";
  temp.style[dimension] = value;

  root.parentElement?.appendChild(temp);
  const result = dimension === "width" ? temp.offsetWidth : temp.offsetHeight;
  root.parentElement?.removeChild(temp);

  return result;
};
