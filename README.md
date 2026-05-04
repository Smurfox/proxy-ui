# ProxyUI

A component library built for **Nuxt 4**, designed with a clean and consistent API. All components are prefixed with `PU`.

## Features

- 🎨 Built with **Tailwind CSS v4**
- ✨ Smooth animations powered by **motion-v**
- 🔷 Icons via **@nuxt/icon** (Iconify)
- 🔤 **Inter** font loaded automatically
- 🌙 Dark mode ready
- 📦 TypeScript support out of the box

---

## Requirements

- Nuxt `^4.0.0`
- Tailwind CSS `^4.0.0`

---

## Installation

```bash
npm install proxy-ui
```

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["proxy-ui"],
});
```

Add Tailwind to your CSS entry file:

```css
@import "tailwindcss";
```

That's it. All `PU` components are auto-imported and ready to use.

---

## Theming

ProxyUI uses CSS variables for colors. Add them to your CSS file to customize:

```css
@import "tailwindcss";

@theme {
  --color-primary: #376fff;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
}
```

**Default values:**

| Variable          | Default   |
| ----------------- | --------- |
| `--color-primary` | `#376fff` |
| `--color-success` | `#2bd994` |
| `--color-warning` | `#f3a952` |
| `--color-danger`  | `#fb2c56` |

---

## Components

### PUButton

A button component powered by `motion-v` for smooth press animations.

```vue
<PUButton label="Click me" />
```

**Props**

| Prop          | Type                                                                                | Default     | Description                                                      |
| ------------- | ----------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------- |
| `label`       | `string`                                                                            | —           | Text shown inside the button. If omitted, uses the default slot. |
| `size`        | `'sm' \| 'md' \| 'lg'`                                                              | `'md'`      | Controls padding and font size.                                  |
| `variant`     | `'default' \| 'secondary' \| 'outline' \| 'ghost' \| 'flat'`                        | `'default'` | Visual style of the button.                                      |
| `color`       | `'default' \| 'ios' \| 'primary' \| 'danger' \| 'success' \| 'warning' \| 'custom'` | `'default'` | Color scheme applied on top of the variant.                      |
| `rounded`     | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'`                 | `'lg'`      | Border radius.                                                   |
| `disabled`    | `boolean`                                                                           | `false`     | Disables the button.                                             |
| `loading`     | `boolean`                                                                           | `false`     | Shows a spinner and disables interaction.                        |
| `isIconOnly`  | `boolean`                                                                           | `false`     | Displays only an icon without label.                             |
| `icon`        | `string`                                                                            | —           | Iconify icon name for icon-only button.                          |
| `startIcon`   | `string`                                                                            | —           | Iconify icon name rendered before the label.                     |
| `endIcon`     | `string`                                                                            | —           | Iconify icon name rendered after the label.                      |
| `customClass` | `string`                                                                            | —           | Tailwind classes applied when `color="custom"`.                  |

**Examples**

```vue
<!-- Variants -->
<PUButton variant="default" label="Default" />
<PUButton variant="secondary" label="Secondary" />
<PUButton variant="outline" label="Outline" />
<PUButton variant="ghost" label="Ghost" />
<PUButton variant="flat" label="Flat" />

<!-- Colors -->
<PUButton color="primary" label="Primary" />
<PUButton color="danger" label="Danger" />
<PUButton color="success" label="Success" />
<PUButton color="warning" label="Warning" />

<!-- Sizes -->
<PUButton size="sm" label="Small" />
<PUButton size="md" label="Medium" />
<PUButton size="lg" label="Large" />

<!-- Icons -->
<PUButton start-icon="lucide:plus" label="New item" />
<PUButton end-icon="lucide:arrow-right" label="Continue" />
<PUButton is-icon-only icon="lucide:settings" />

<!-- States -->
<PUButton disabled label="Disabled" />
<PUButton loading label="Saving..." />

<!-- Custom color -->
<PUButton
  color="custom"
  custom-class="bg-purple-500 text-white hover:bg-purple-600"
  label="Custom"
/>

<!-- Slot -->
<PUButton>
  <span>Custom content</span>
</PUButton>
```

---

### PUInput

A flexible input component with validation and state management.

```vue
<PUInput label="Username" placeholder="Enter your name" />
```

**Props**

| Prop          | Type                                                        | Default                   | Description                                          |
| ------------- | ----------------------------------------------------------- | ------------------------- | ---------------------------------------------------- |
| `type`        | `string`                                                    | `'text'`                  | HTML input type (text, email, password, etc).        |
| `label`       | `string`                                                    | —                         | Label displayed above the input.                     |
| `labelClass`  | `string`                                                    | `'text-sm font-semibold'` | Custom classes for the label.                        |
| `placeholder` | `string`                                                    | —                         | Placeholder text inside the input.                   |
| `description` | `string`                                                    | —                         | Helper text displayed below the input.               |
| `rounded`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'`                    | Border radius.                                       |
| `variant`     | `'default' \| 'secondary'`                                  | `'default'`               | Visual style of the input.                           |
| `required`    | `boolean`                                                   | `false`                   | Shows a red asterisk on the label.                   |
| `error`       | `string`                                                    | —                         | Error message to display. Changes styling to danger. |
| `disabled`    | `boolean`                                                   | `false`                   | Disables the input.                                  |

**Slots**

| Slot           | Description                   |
| -------------- | ----------------------------- |
| `startContent` | Icon or content at the start. |
| `endContent`   | Icon or content at the end.   |

**Examples**

```vue
<!-- Basic -->
<PUInput label="Email" type="email" placeholder="you@example.com" />

<!-- With helper text -->
<PUInput label="Password" type="password" description="At least 8 characters" />

<!-- Required field -->
<PUInput label="Full name" required />

<!-- With error -->
<PUInput label="Username" error="This username is already taken" />

<!-- Disabled -->
<PUInput label="Disabled field" disabled value="Read only" />

<!-- With icons -->
<PUInput label="Search" placeholder="Search...">
  <template #startContent>
    <Icon name="lucide:search" />
  </template>
</PUInput>

<!-- Variants -->
<PUInput variant="default" label="Default" />
<PUInput variant="secondary" label="Secondary" />
```

---

### PUCard

A flexible card component with customizable styling and borders.

```vue
<PUCard>
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</PUCard>
```

**Props**

| Prop          | Type                         | Default     | Description                       |
| ------------- | ---------------------------- | ----------- | --------------------------------- |
| `variant`     | `'default' \| 'liquidGlass'` | `'default'` | Visual style of the card.         |
| `customClass` | `string`                     | —           | Custom Tailwind classes to apply. |
| `isBordered`  | `boolean`                    | `false`     | Adds a border to the card.        |

**Examples**

```vue
<!-- Basic card -->
<PUCard>
  <p>Simple card with default styling</p>
</PUCard>

<!-- With border -->
<PUCard is-bordered>
  <h3>Bordered Card</h3>
  <p>This card has a border</p>
</PUCard>

<!-- Custom styling -->
<PUCard custom-class="bg-blue-100 p-6 rounded-lg">
  <p>Fully customized card</p>
</PUCard>

<!-- Slot content -->
<PUCard>
  <template #default>
    <div class="flex items-center gap-4">
      <img src="avatar.jpg" alt="Avatar" />
      <div>
        <h3>John Doe</h3>
        <p>User profile card</p>
      </div>
    </div>
  </template>
</PUCard>
```

---

### PUAvatar

An avatar component that displays user images, icons, or initials.

```vue
<PUAvatar label="JD" />
```

**Props**

| Prop      | Type                                                        | Default  | Description               |
| --------- | ----------------------------------------------------------- | -------- | ------------------------- |
| `label`   | `string`                                                    | —        | Text/initials to display. |
| `icon`    | `string`                                                    | —        | Iconify icon name.        |
| `image`   | `string`                                                    | —        | Image URL to display.     |
| `size`    | `'sm' \| 'md' \| 'lg' \| 'full'`                            | `'md'`   | Avatar size.              |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'full'` | Border radius.            |

**Examples**

```vue
<!-- With initials -->
<PUAvatar label="JD" size="md" />

<!-- With icon -->
<PUAvatar icon="lucide:user" size="lg" />

<!-- With image -->
<PUAvatar image="https://example.com/avatar.jpg" />

<!-- Different sizes -->
<PUAvatar label="A" size="sm" />
<PUAvatar label="A" size="md" />
<PUAvatar label="A" size="lg" />

<!-- Border radius -->
<PUAvatar label="JD" rounded="none" />
<PUAvatar label="JD" rounded="md" />
<PUAvatar label="JD" rounded="full" />
```

---

### PUChip

A compact component for displaying small pieces of information.

```vue
<PUChip label="Tag" />
```

**Props**

| Prop          | Type                                                                                | Default     | Description                                     |
| ------------- | ----------------------------------------------------------------------------------- | ----------- | ----------------------------------------------- |
| `label`       | `string`                                                                            | —           | Text displayed in the chip.                     |
| `size`        | `'sm' \| 'md' \| 'lg'`                                                              | `'md'`      | Chip size.                                      |
| `variant`     | `'default' \| 'secondary' \| 'outline' \| 'flat'`                                   | `'default'` | Visual style of the chip.                       |
| `color`       | `'default' \| 'ios' \| 'primary' \| 'danger' \| 'success' \| 'warning' \| 'custom'` | `'default'` | Color scheme.                                   |
| `rounded`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'`                         | `'full'`    | Border radius.                                  |
| `startIcon`   | `string`                                                                            | —           | Iconify icon name at the start.                 |
| `endIcon`     | `string`                                                                            | —           | Iconify icon name at the end.                   |
| `customClass` | `string`                                                                            | —           | Tailwind classes applied when `color="custom"`. |

**Examples**

```vue
<!-- Basic -->
<PUChip label="React" />

<!-- Variants -->
<PUChip variant="default" label="Default" />
<PUChip variant="secondary" label="Secondary" />
<PUChip variant="outline" label="Outline" />
<PUChip variant="flat" label="Flat" />

<!-- Colors -->
<PUChip color="primary" label="Primary" />
<PUChip color="danger" label="Danger" />
<PUChip color="success" label="Success" />

<!-- Sizes -->
<PUChip size="sm" label="Small" />
<PUChip size="md" label="Medium" />
<PUChip size="lg" label="Large" />

<!-- With icons -->
<PUChip start-icon="lucide:check" label="Done" />
<PUChip end-icon="lucide:x" label="Close" />
```

---

### PUTabs

A tabbed interface component with smooth animations.

```vue
<PUTabs
  v-model="activeTab"
  :tabs="[
    { label: 'Tab 1', value: 'tab1' },
    { label: 'Tab 2', value: 'tab2' },
  ]"
/>
```

**Props**

| Prop                | Type                                                                | Default                                                                     | Description                   |
| ------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------- |
| `modelValue`        | `string`                                                            | `''`                                                                        | Active tab value (v-model).   |
| `tabs`              | `TabItem[]`                                                         | —                                                                           | Array of tab items.           |
| `iconSize`          | `number`                                                            | `15`                                                                        | Size of tab icons.            |
| `rounded`           | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'`                                                                      | Border radius.                |
| `bgColor`           | `string`                                                            | `'bg-black/5 dark:bg-white/10'`                                             | Background color classes.     |
| `btnColor`          | `string`                                                            | `'bg-white dark:bg-white/10'`                                               | Active tab button color.      |
| `activeTextColor`   | `string`                                                            | `'text-black dark:text-white'`                                              | Active text color.            |
| `inactiveTextColor` | `string`                                                            | `'text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white'` | Inactive text color.          |
| `disabledTabs`      | `string[]`                                                          | `[]`                                                                        | Array of disabled tab values. |
| `isVertical`        | `boolean`                                                           | `false`                                                                     | Display tabs vertically.      |

**TabItem Interface**

```ts
interface TabItem {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}
```

**Events**

| Event               | Description                  |
| ------------------- | ---------------------------- |
| `update:modelValue` | Emitted when tab is clicked. |

**Examples**

```vue
<template>
  <!-- Basic tabs -->
  <PUTabs
    v-model="activeTab"
    :tabs="[
      { label: 'Dashboard', value: 'dashboard' },
      { label: 'Settings', value: 'settings' },
      { label: 'Profile', value: 'profile' },
    ]"
  />

  <!-- With icons -->
  <PUTabs
    v-model="activeTab"
    :tabs="[
      { label: 'Home', value: 'home', icon: 'lucide:home' },
      { label: 'Bell', value: 'bell', icon: 'lucide:bell' },
      { label: 'User', value: 'user', icon: 'lucide:user' },
    ]"
  />

  <!-- With disabled tabs -->
  <PUTabs
    v-model="activeTab"
    :tabs="[
      { label: 'Active', value: 'active' },
      { label: 'Disabled', value: 'disabled', disabled: true },
    ]"
    :disabled-tabs="['disabled']"
  />

  <!-- Vertical layout -->
  <PUTabs v-model="activeTab" :tabs="tabs" is-vertical />

  <!-- Custom colors -->
  <PUTabs
    v-model="activeTab"
    :tabs="tabs"
    bg-color="bg-gray-100 dark:bg-gray-800"
    btn-color="bg-blue-500"
    active-text-color="text-blue-600"
  />
</template>

<script setup>
const activeTab = ref("dashboard");
</script>
```

---

## TypeScript

ProxyUI exports all component types:

```ts
import type {
  ButtonProps,
  ButtonColor,
  ButtonVariant,
  ButtonSize,
  ButtonRounded,
  InputVariant,
  InputRounded,
  ChipProps,
  ChipSize,
  ChipVariant,
  ChipColor,
  ChipRounded,
  CardProps,
  CardVariant,
  AvatarSize,
  AvatarRounded,
  TabItem,
  TabsProps,
  TabsRounded,
} from "proxy-ui";
```

---

## License

[MIT](./LICENSE)
