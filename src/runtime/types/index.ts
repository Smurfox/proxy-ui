export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "flat";
export type ButtonColor =
  | "default"
  | "ios"
  | "primary"
  | "danger"
  | "success"
  | "warning"
  | "custom";
export type ButtonRounded =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "full";

export interface ButtonProps {
  label?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  rounded?: ButtonRounded;
  disabled?: boolean;
  loading?: boolean;
  startIcon?: string;
  endIcon?: string;
  customClass?: string;
}
