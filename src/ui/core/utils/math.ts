export type PointObject = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export function bounds(
  value: number,
  min: number | undefined,
  max: number | undefined
) {
  if (min !== undefined && value < min) return min;
  if (max !== undefined && value > max) return max;
  return value;
}
