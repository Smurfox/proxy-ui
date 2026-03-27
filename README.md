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

## TypeScript

ProxyUI exports all component types:

```ts
import type {
  ButtonProps,
  ButtonColor,
  ButtonVariant,
  ButtonSize,
} from "proxy-ui";
```

---

## License

[MIT](./LICENSE)
