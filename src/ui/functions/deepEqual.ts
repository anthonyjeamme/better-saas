/* eslint-disable @typescript-eslint/no-explicit-any */
// Source : https://github.com/epoberezkin/fast-deep-equal

function isTypedArray(
  x: ArrayBufferView
): x is
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

/**
 * Fast deep equal
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;
  if (a !== a && b !== b) return true;

  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }

  if (a.constructor !== b.constructor) return false;

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (a instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, val] of a) {
      if (!b.has(key) || !deepEqual(val, b.get(key))) return false;
    }
    return true;
  }

  if (a instanceof Set) {
    if (a.size !== b.size) return false;
    for (const val of a) {
      if (!b.has(val)) return false;
    }
    return true;
  }

  if (a instanceof DataView && b instanceof DataView) {
    if (a.byteLength !== b.byteLength) return false;
    for (let i = 0; i < a.byteLength; i++) {
      if (a.getUint8(i) !== b.getUint8(i)) return false;
    }
    return true;
  }

  if (isTypedArray(a) && isTypedArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  if (a instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  if (
    typeof a.valueOf === "function" &&
    a.valueOf !== Object.prototype.valueOf
  ) {
    return a.valueOf() === b.valueOf();
  }

  if (
    typeof a.toString === "function" &&
    a.toString !== Object.prototype.toString
  ) {
    return a.toString() === b.toString();
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }
  }

  for (const key of keysA) {
    if (key === "_owner" && (a as any).$$typeof) continue;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}
