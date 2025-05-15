export function isValidValue(
  value: string,
  integer: boolean,
  min: number | undefined,
  max: number | undefined,
  fixed: number | undefined
) {
  if (integer && !/^-?[0-9]+$/.test(value)) return false;
  if (!integer && !/^-?[0-9]+[.]?[0-9]*?$/.test(value)) return false;

  const parsedValue = parseValue(value, integer);

  if (min !== undefined && parsedValue < min) return false;
  if (max !== undefined && parsedValue > max) return false;

  if (fixed !== undefined) {
    const parts = value.split(".");
    if (parts.length === 2 && parts[1].length > fixed) return false;
  }

  return true;
}

export function isEmptyValue(value: string) {
  return value === "";
}

export function parseValue(value: string, integer: boolean) {
  if (integer) {
    return parseInt(value);
  } else {
    return parseFloat(value.replace(",", "."));
  }
}

export function getInputSelection(input: HTMLInputElement) {
  if (input.selectionStart === null || input.selectionEnd === null) return null;

  return {
    start: input.selectionStart,
    end: input.selectionEnd,
  };
}

/**
 * Compute the next value of the input, based on the keyDown event.
 */
export function computeNextValue(e: React.KeyboardEvent<HTMLInputElement>) {
  const element = e.target as HTMLInputElement;
  const selection = getInputSelection(element);
  const value = element.value.replaceAll(",", ".");
  const key = e.key === "," ? "." : e.key;

  if (selection === null) return value;

  if (key.length !== 1) return value;

  return value.slice(0, selection.start) + key + value.slice(selection.end);
}
