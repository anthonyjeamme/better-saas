import { getDeviceType } from "../../functions/getDeviceType";
import {
  Key,
  Modifier,
  HotkeyInput,
  UseHotkeyOptions,
  Hotkey,
} from "./useHotkey.types";
import { useKeyboardEvent } from "../useKeyboardEvents";

/**
 * Keyboard shortcut handler
 */
export function useHotkey(
  hotkey: HotkeyInput | null,
  callback: (e: KeyboardEvent) => void,
  options?: UseHotkeyOptions
) {
  useKeyboardEvent(
    "keydown",
    (e) => {
      if (options?.disabled) return;
      if (eventMatchHotkey(e, hotkey)) {
        if (options?.preventDefault) e.preventDefault();
        if (options?.stopPropagation) e.stopPropagation();

        callback(e);
      }
    },
    [hotkey, callback, options]
  );
}

export function useHotkeys(
  hotKeys: Partial<Record<Hotkey, () => void>>,
  options?: UseHotkeyOptions,
  deps?: React.DependencyList
) {
  useKeyboardEvent(
    "keydown",
    (e) => {
      if (options?.disabled) return;
      for (const [hotkey, callback] of Object.entries(hotKeys)) {
        if (eventMatchHotkey(e, hotkey as HotkeyInput)) {
          if (options?.preventDefault) e.preventDefault();
          if (options?.stopPropagation) e.stopPropagation();

          callback();
        }
      }
    },
    [options, hotKeys, deps]
  );
}

function eventMatchHotkey(
  event: KeyboardEvent,
  hotkey: HotkeyInput | null
): boolean {
  if (!hotkey) return false;
  if (Array.isArray(hotkey)) {
    return hotkey.some((s) => eventMatchHotkey(event, s));
  }

  if (typeof hotkey === "object") {
    const deviceType = getDeviceType();
    const platformHotkey =
      deviceType === "mac" ? hotkey.mac ?? hotkey.default : hotkey.default;
    return eventMatchHotkey(event, platformHotkey);
  }

  return compareKeyWithModifiers(event, hotkey);
}

function compareKeyWithModifiers(
  event: KeyboardEvent,
  hotkey: string
): boolean {
  if (!hotkey.includes("+")) {
    return isSimpleKeyMatch(event, hotkey);
  }

  return isKeyWithModifiersMatch(event, hotkey);
}

function isSimpleKeyMatch(event: KeyboardEvent, key: string): boolean {
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
    return false;
  }
  return event.key.toLowerCase() === key.toLowerCase();
}

function isKeyWithModifiersMatch(
  event: KeyboardEvent,
  hotkey: string
): boolean {
  const parts = hotkey.split("+");
  const key = parts.pop() as Key;
  const modifiers = parts as Modifier[];

  const normalizedEventKey = normalizeKey(event.key);
  const normalizedHotkeyKey = normalizeKey(key);

  if (normalizedEventKey !== normalizedHotkeyKey) {
    return false;
  }

  return areModifiersMatch(event, modifiers);
}

function normalizeKey(key: string): string {
  const specialKeyMap: Record<string, string> = {
    " ": "space",
    arrowup: "up",
    arrowdown: "down",
    arrowleft: "left",
    arrowright: "right",
    escape: "esc",
  };

  return specialKeyMap[key.toLowerCase()] || key.toLowerCase();
}

function areModifiersMatch(
  event: KeyboardEvent,
  requiredModifiers: Modifier[]
): boolean {
  const modifierStatus = {
    ctrl: event.ctrlKey,
    shift: event.shiftKey,
    alt: event.altKey,
    meta: event.metaKey,
  };

  for (const modifier of requiredModifiers) {
    if (!modifierStatus[modifier]) return false;
  }

  for (const [modifier, isActive] of Object.entries(modifierStatus)) {
    if (isActive && !requiredModifiers.includes(modifier as Modifier))
      return false;
  }

  return true;
}
