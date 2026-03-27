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

export type ChipSize = "sm" | "md" | "lg";
export type ChipVariant = "default" | "secondary" | "outline" | "flat";
export type ChipColor =
  | "default"
  | "ios"
  | "primary"
  | "danger"
  | "success"
  | "warning"
  | "custom";
export type ChipRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export interface ChipProps {
  label?: string;
  size?: ChipSize;
  variant?: ChipVariant;
  color?: ChipColor;
  rounded?: ChipRounded;
  startIcon?: string;
  endIcon?: string;
  customClass?: string;
}

export type CardRounded =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export type CardShadow = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "ios";
