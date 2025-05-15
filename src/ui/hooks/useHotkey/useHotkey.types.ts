export type Modifier = "ctrl" | "shift" | "alt" | "meta";
export type Key =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "f1"
  | "f2"
  | "f3"
  | "f4"
  | "f5"
  | "f6"
  | "f7"
  | "f8"
  | "f9"
  | "f10"
  | "f11"
  | "f12"
  | "escape"
  | "tab"
  | "capslock"
  | "space"
  | "enter"
  | "backspace"
  | "delete"
  | "arrowup"
  | "arrowdown"
  | "arrowleft"
  | "arrowright"
  | "home"
  | "end"
  | "pageup"
  | "pagedown"
  | "`"
  | "-"
  | "="
  | "["
  | "]"
  | "\\"
  | ";"
  | "'"
  | ","
  | "."
  | "/";

export type SingleModifierHotkey = `${Modifier}+${Key}`;
export type DoubleModifierHotkey = `${Modifier}+${Modifier}+${Key}`;
export type TripleModifierHotkey = `${Modifier}+${Modifier}+${Modifier}+${Key}`;

export type Hotkey =
  | Key
  | SingleModifierHotkey
  | DoubleModifierHotkey
  | TripleModifierHotkey;

export type UseHotkeyOptions = {
  preventDefault?: boolean;
  stopPropagation?: boolean;
  disabled?: boolean;
};

export type HotkeyInput = Hotkey | Hotkey[] | DeviceHotkey;

export type DeviceHotkey = {
  default: Hotkey | Hotkey[];
  mac?: Hotkey | Hotkey[];
};
