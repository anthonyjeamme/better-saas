export type UISize = "sm" | "md" | "lg";

export type StackVariant = "vertical" | "horizontal";

export type AlignVariant = "start" | "center" | "end";

export type SizeVariant = "xs" | "sm" | "md" | "lg" | "xl";

export type ExtendedSizeVariant =
  | SizeVariant
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";

export type UIVariant =
  | "solid"
  | "subtle"
  | "surface"
  | "outline"
  | "ghost"
  | "plain";

export type ThemeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error";

export type InternalUIPaletteProps = {
  palette: keyof UIPaletteProps;
};

export type UIPaletteProps = {
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
};

export type InternalUISizeProps = {
  size: keyof UISizeProps;
};

export type UISizeProps = {
  small?: boolean;
  medium?: boolean;
  large?: boolean;
};

export type InternalUIVariantProps = {
  variant: keyof UIVariantProps;
};

export type UIVariantProps = {
  solid?: boolean;
  subtle?: boolean;
  surface?: boolean;
  outline?: boolean;
  ghost?: boolean;
  plain?: boolean;
};

export type InternalTextFieldVariantProps = {
  variant: keyof TextFieldVariantProps;
};

export type TextFieldVariantProps = {
  outline?: boolean;
  subtle?: boolean;
  flushed?: boolean;
};
