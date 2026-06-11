export type GlobalRounded
  = | 'none'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | 'full'

export type ButtonSize = 'sm' | 'md' | 'lg'
export type ButtonVariant
  = | 'default'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'flat'
export type ButtonColor
  = | 'default'
    | 'ios'
    | 'primary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'custom'
export type ButtonRounded
  = | 'none'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | 'full'

export interface ButtonProps {
  label?: string
  size?: ButtonSize
  variant?: ButtonVariant
  color?: ButtonColor
  rounded?: ButtonRounded
  disabled?: boolean
  loading?: boolean
  isIconOnly?: boolean
  icon?: string
  startIcon?: string
  endIcon?: string
  customClass?: string
}

export type ChipSize = 'sm' | 'md' | 'lg'
export type ChipVariant = 'default' | 'secondary' | 'outline' | 'flat'
export type ChipColor
  = | 'default'
    | 'ios'
    | 'primary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'custom'
export type ChipRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export interface ChipProps {
  label?: string
  size?: ChipSize
  variant?: ChipVariant
  color?: ChipColor
  rounded?: ChipRounded
  startIcon?: string
  endIcon?: string
  customClass?: string
}

export type CardVariant = 'default' | 'liquidGlass'
export interface CardProps {
  variant?: CardVariant
  customClass?: string
  isBordered?: boolean
}

export type AvatarSize = 'sm' | 'md' | 'lg' | 'full'
export type AvatarRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export type CheckboxSize = 'sm' | 'md' | 'lg'
export type CheckboxRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type CheckboxLabelPosition = 'left' | 'right'

export interface CheckboxProps {
  modelValue?: boolean
  label?: string
  labelPosition?: CheckboxLabelPosition
  labelClass?: string
  size?: CheckboxSize
  rounded?: CheckboxRounded
}

export type InputVariant = 'default' | 'secondary'
export type InputRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

export interface InputProps {
  type?: string
  label?: string
  labelClass?: string
  inlineLabel?: boolean
  placeholder?: string
  description?: string
  rounded?: InputRounded
  variant?: InputVariant
  required?: boolean
  error?: string
  disabled?: boolean
}

export type DatePickerLang = 'en' | 'es'

export interface DatePickerProps {
  modelValue?: string
  label?: string
  labelClass?: string
  inlineLabel?: boolean
  placeholder?: string
  description?: string
  rounded?: InputRounded
  variant?: InputVariant
  required?: boolean
  error?: string
  disabled?: boolean
  min?: string
  max?: string
  lang?: DatePickerLang
  locale?: string
  minYear?: number
  maxYear?: number
}

export interface SelectOption {
  label: string
  value: string | number
  [key: string]: unknown
}

export interface SelectProps {
  modelValue?: string | number | null | (string | number)[]
  options?: SelectOption[]
  multiple?: boolean
  label?: string
  labelClass?: string
  inlineLabel?: boolean
  placeholder?: string
  description?: string
  rounded?: InputRounded
  variant?: InputVariant
  required?: boolean
  error?: string
  disabled?: boolean
}

export interface AutocompleteOption {
  label: string
  value: string | number
  [key: string]: unknown
}

export interface AutocompleteProps {
  modelValue?: string | number | null | (string | number)[]
  options?: AutocompleteOption[]
  multiple?: boolean
  label?: string
  labelClass?: string
  inlineLabel?: boolean
  placeholder?: string
  description?: string
  rounded?: InputRounded
  variant?: InputVariant
  required?: boolean
  error?: string
  disabled?: boolean
}

export type TabsRounded
  = | 'none'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | 'full'

export interface TabItem {
  label: string
  value: string
  icon?: string
  disabled?: boolean
}

export interface TabsProps {
  modelValue: string
  tabs: TabItem[]
  iconSize?: number
  rounded?: TabsRounded
  bgColor?: string
  btnColor?: string
  activeTextColor?: string
  inactiveTextColor?: string
  disabledTabs?: string[]
  isVertical?: boolean
}

export interface LottieProps {
  animationData: object
  loop?: boolean
  height?: number
  width?: number
}

export type TableRounded = GlobalRounded
export type TableItemsSize = 'sm' | 'md' | 'lg'

export interface TableColumn {
  name: string
  id: string
  width?: string
}

export interface TableItem {
  id: string | number
  [key: string]: unknown
}

export interface TableProps {
  items?: TableItem[]
  columns?: TableColumn[]
  rounded?: TableRounded
  isBordered?: boolean
  isSelectable?: boolean
  headerColor?: string
  isBodyColored?: boolean
  bodyColor?: string
  itemsSize?: TableItemsSize
  hasShadow?: boolean
  emptyStateTitle?: string
  emptyStateDescription?: string
  showEmptyAnimation?: boolean
  emptyAnimationData?: object
  emptyAnimationSize?: number
  withPagination?: boolean
  paginationPage?: number
  paginationTotalItems?: number
  paginationItemsPerPage?: number
  paginationShowItemsCount?: boolean
  paginationShowPageSize?: boolean
  paginationPageSizeOptions?: number[]
  paginationPageSizeLabel?: string
}

export interface PaginationProps {
  page?: number
  totalItems?: number
  itemsPerPage?: number
  showItemsCount?: boolean
  showPageSize?: boolean
  pageSizeOptions?: number[]
  pageSizeLabel?: string
}

export type SkeletonHeight = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SkeletonWidth = 'full' | 'auto'
export type SkeletonVariant = 'rectangular' | 'circular' | 'text'

export interface SkeletonProps {
  height?: SkeletonHeight | string
  width?: SkeletonWidth | string
  variant?: SkeletonVariant
}
