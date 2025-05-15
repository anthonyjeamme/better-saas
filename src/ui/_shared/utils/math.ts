export type PointObject = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export function bounds(value: number, min: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}
