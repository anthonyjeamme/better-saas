export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  const newArray = array.slice();
  newArray.splice(
    to < 0 ? newArray.length + to : to,
    0,
    newArray.splice(from, 1)[0]
  );

  return newArray;
}

export function arrayInsert<T>(array: T[], item: T, index: number): T[] {
  const newArray = array.slice();
  newArray.splice(index, 0, item);
  return newArray;
}

export function arrayRemove<T>(array: T[], index: number): T[] {
  const newArray = array.slice();
  newArray.splice(index, 1);
  return newArray;
}

export function arrayUpdate<T>(
  array: T[],
  index: number,
  item: Partial<T>
): T[] {
  const newArray = array.slice();
  newArray[index] = { ...newArray[index], ...item };
  return newArray;
}

export function arrayReplace<T>(array: T[], index: number, item: T): T[] {
  const newArray = array.slice();
  newArray[index] = item;
  return newArray;
}
