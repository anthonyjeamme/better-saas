import { SizeVariant } from "../../core/types";

export type CustomWarningMessages = {
  min?: string;
  max?: string;
  empty?: string;
};

export type CustomErrorMessages = {
  default?: string;
};

export type ErrorType = "default";

export type WarningType = "min" | "max" | "empty";

interface BaseProps {
  step?: number;
  min?: number;
  max?: number;
  size?: SizeVariant;
  integer?: boolean;
  fixed?: number;
  expression?: boolean;
  clearButton?: boolean;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onEscape?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  icon?: React.ReactNode;
  defaultValue?: number;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  customWarningMessages?: CustomWarningMessages;
  customErrorMessages?: CustomErrorMessages;
}

// No emptyValue: always number
interface NoEmpty extends BaseProps {
  emptyValue?: undefined;
  value: number;
  onValueChange: (value: number) => void;
}

// emptyValue === 'undefined': allow undefined
interface UndefinedEmpty extends BaseProps {
  emptyValue: "undefined";
  value: number | undefined;
  onValueChange: (value: number | undefined) => void;
}

interface NullEmpty extends BaseProps {
  emptyValue: "null";
  value: number | null;
  onValueChange: (value: number | null) => void;
}

// Discriminated union
export type NumberInputProps = NoEmpty | UndefinedEmpty | NullEmpty;
