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
  isIconOnly?: boolean;
  icon?: string;
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

export type CardVariant = "default" | "liquidGlass";
export interface CardProps {
  variant?: CardVariant;
  customClass?: string;
  isBordered?: boolean;
}

export type AvatarSize = "sm" | "md" | "lg" | "full";
export type AvatarRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

export type TabsRounded =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "full";

export interface TabItem {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

export interface TabsProps {
  modelValue: string;
  tabs: TabItem[];
  iconSize?: number;
  rounded?: TabsRounded;
  bgColor?: string;
  btnColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  disabledTabs?: string[];
  isVertical?: boolean;
}
