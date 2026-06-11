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
npm install @smurfox/proxy-ui
```

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ["@smurfox/proxy-ui"],
});
```

Add Tailwind to your CSS entry file and register the library as a source so Tailwind picks up the component classes:

```css
@import "tailwindcss";
@source "../node_modules/@smurfox/proxy-ui/dist";
```

> The `@source` path is relative to the CSS file. If your CSS lives deeper (e.g. `app/assets/css/main.css`), adjust the number of `../` segments so it resolves to your project root's `node_modules`. Without this directive, Tailwind v4 will not scan the library files and variants like `flat`/`outline` will render unstyled.

That's it. All `PU` components are auto-imported and ready to use.

---

## Theming

ProxyUI is fully themable through CSS variables. There are two layers of tokens — **brand colors** (used for emphasis: buttons, chips, focus rings, error states) and **surface tokens** (used for the neutral backgrounds and borders shared by cards, inputs, dropdowns, tables, etc.). Because surface tokens need different values in light and dark mode, they are declared on `:root` and `.dark` rather than directly inside `@theme`.

### Brand colors

| Variable          | Default   |
| ----------------- | --------- |
| `--color-primary` | `#376fff` |
| `--color-success` | `#2bd994` |
| `--color-warning` | `#f3a952` |
| `--color-danger`  | `#fb2c56` |

### Surface tokens

| Variable             | Light     | Dark      | Used by                                                                                                                              |
| -------------------- | --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `--color-background` | `#f5f5f7` | `#08090c` | Page-level background (apply `bg-background` to your root layout). Sits underneath cards and surfaces.                                |
| `--color-card`       | `#ffffff` | `#14171c` | `PUCard` bg, input `secondary` variant, `PUTable` body and mobile cards, popovers of `PUSelect` / `PUAutocomplete` / `PUDropdown`    |
| `--color-default`    | `#eaecef` | `#242830` | Input `default` variant bg, `PUChip` / `PUAvatar` / `PUSkeleton` neutral fill, `PUTable` header + row hover, `border-default` on all surfaces |

The three tokens are layered from back to front: `background` (the page) → `card` (raised surfaces) → `default` (subtle fills inside cards). Components reference them via Tailwind utilities (`bg-background`, `bg-card`, `bg-default`, `border-default`, …) so overriding a variable retheme the whole library at once.

### Setting it up in your project

All tokens — brand colors and surface tokens — ship with sensible defaults in the package. You only need a single `@import` in your Tailwind entry CSS:

```css
@import "tailwindcss";
@source "../node_modules/@smurfox/proxy-ui/dist";
@custom-variant dark (&:where(.dark, .dark *));

@import "@smurfox/proxy-ui/theme.css";
```

That brings the `@theme` registration (so utilities like `bg-primary`, `bg-card`, `bg-default`, `border-default` get generated) plus the light/dark default values for surface tokens. Components work out of the box.

Apply `bg-background` to your root layout so the page picks up the token:

```vue
<template>
  <div :class="{ dark: isDark }" class="min-h-screen">
    <div class="bg-background min-h-screen">
      <!-- your app -->
    </div>
  </div>
</template>
```

> The `@import "@smurfox/proxy-ui/theme.css"` must live in the same file as `@import "tailwindcss"` so Tailwind processes the `@theme` block inside it. Loading it as a separate stylesheet (a `<link>`, a Vue `<style>`, etc.) sets the runtime values but does **not** register the design tokens, and the `bg-primary` / `bg-card` / `bg-default` / `border-default` utilities won't be generated.

### Customizing the look

All defaults can be overridden **after** the `@import`. CSS cascade makes your declarations win — every component picks up the change automatically.

**Brand colors** are flat values, so override them inside `@theme`:

```css
@import "@smurfox/proxy-ui/theme.css";

@theme {
  --color-primary: #6366f1;     /* indigo accent */
  --color-success: #16a34a;
  --color-warning: #ea580c;
  --color-danger: #dc2626;
}
```

**Surface tokens** switch between light and dark, so override them in `:root` / `.dark`:

```css
@import "@smurfox/proxy-ui/theme.css";

:root {
  --color-background: #fafafa;  /* warmer page bg */
  --color-card: #ffffff;
  --color-default: #ececec;
}

.dark {
  --color-background: #050608;  /* deeper page bg */
  --color-card: #0d0f12;
  --color-default: #1c2027;
}
```

> The `@custom-variant dark` line is what makes the `dark:` Tailwind variant respond to a `.dark` class on a parent element (instead of `prefers-color-scheme`). All ProxyUI components assume this setup.

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
| `icon`           | `string`                                                                            | —           | Iconify icon name for icon-only button.                          |
| `startIcon`      | `string`                                                                            | —           | Iconify icon name rendered before the label.                     |
| `startIconClass` | `string`                                                                            | —           | Extra classes applied to the `startIcon` (e.g. rotation, color override). |
| `endIcon`        | `string`                                                                            | —           | Iconify icon name rendered after the label.                      |
| `endIconClass`   | `string`                                                                            | —           | Extra classes applied to the `endIcon` (e.g. `rotate-180`).      |
| `iconSize`       | `string`                                                                            | —           | Size passed to the icon-only `Icon` component.                   |
| `iconColor`      | `string`                                                                            | —           | Color name appended as `text-{iconColor}` to the icon-only icon. |
| `customClass`    | `string`                                                                            | —           | Extra Tailwind classes merged into the final class list. Combines with the variant/color and wins on conflicts via `tailwind-merge`. Used alone with `color="custom"` to define the entire color scheme. |

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

<!-- Custom color (customClass replaces the color scheme entirely) -->
<PUButton
  color="custom"
  custom-class="bg-purple-500 text-white hover:bg-purple-600"
  label="Custom"
/>

<!-- Additive customClass — overrides text color on a ghost button -->
<PUButton variant="ghost" custom-class="font-bold text-amber-500" label="Tweaked" />

<!-- Rotating endIcon via endIconClass (e.g. caret that flips when open) -->
<PUButton
  variant="ghost"
  label="Year"
  end-icon="mdi:chevron-down"
  :end-icon-class="isOpen ? 'rotate-180 transition-transform' : 'transition-transform'"
/>

<!-- Slot -->
<PUButton>
  <span>Custom content</span>
</PUButton>
```

> `customClass` is now **additive**: it's merged into the class list through `tailwind-merge`, so conflicting utilities (`text-*`, `bg-*`, `font-*`, etc.) override the variant/color defaults automatically. Use `color="custom"` only when you want to fully replace the color scheme rather than override individual properties.

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
| `inlineLabel` | `boolean`                                                   | `false`                   | Render `label` as a floating label inside the input (small text above the value, no external label above). |
| `placeholder` | `string`                                                    | —                         | Placeholder text inside the input.                   |
| `description` | `string`                                                    | —                         | Helper text displayed below the input.               |
| `rounded`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'`                    | Border radius.                                       |
| `variant`     | `'default' \| 'secondary'`                                  | `'default'`               | Visual style. `default` = subtle gray fill, `secondary` = white fill (dark surface in dark mode). |
| `required`    | `boolean`                                                   | `false`                   | Shows a red asterisk on the label.                   |
| `error`       | `string`                                                    | —                         | Error message to display. Changes styling to danger. |
| `disabled`    | `boolean`                                                   | `false`                   | Disables the input.                                  |
| `focus`       | `boolean`                                                   | `false`                   | Selects the whole text on focus (useful for pre-filled fields the user is likely to replace). |

**Slots**

| Slot           | Description                   |
| -------------- | ----------------------------- |
| `startContent` | Icon or content at the start. |
| `endContent`   | Icon or content at the end.   |

**Examples**

```vue
<!-- Basic -->
<PUInput label="Email" type="email" placeholder="you@example.com" />

<!-- Select all on focus (great for pre-filled codes the user wants to replace) -->
<PUInput v-model="orderCode" label="Order code" focus />

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

### PUTextArea

A multi-line text input. Shares the look and feel of `PUInput`, with extra props for `rows` and resize behavior.

```vue
<PUTextArea v-model="message" label="Message" placeholder="Write your message" />
```

**Props**

| Prop          | Type                                                        | Default                   | Description                                          |
| ------------- | ----------------------------------------------------------- | ------------------------- | ---------------------------------------------------- |
| `modelValue`  | `string \| number`                                          | —                         | Bound value (v-model).                               |
| `label`       | `string`                                                    | —                         | Label displayed above the textarea.                  |
| `labelClass`  | `string`                                                    | `'text-sm font-semibold'` | Custom classes for the label.                        |
| `inlineLabel` | `boolean`                                                   | `false`                   | Render `label` as a floating label inside the textarea. |
| `placeholder` | `string`                                                    | —                         | Placeholder text.                                    |
| `description` | `string`                                                    | —                         | Helper text displayed below.                         |
| `rounded`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'`                    | Border radius.                                       |
| `variant`     | `'default' \| 'secondary'`                                  | `'default'`               | Visual style. `default` = subtle gray fill, `secondary` = white fill (dark surface in dark mode). |
| `rows`        | `number \| string`                                          | `4`                       | Initial number of visible rows.                      |
| `resize`      | `'none' \| 'both' \| 'horizontal' \| 'vertical'`            | `'vertical'`              | Resize behavior.                                     |
| `required`    | `boolean`                                                   | `false`                   | Shows a red asterisk on the label.                   |
| `error`       | `string`                                                    | —                         | Error message to display. Changes styling to danger. |
| `disabled`    | `boolean`                                                   | `false`                   | Disables the textarea.                               |

**Slots**

| Slot           | Description                   |
| -------------- | ----------------------------- |
| `startContent` | Icon or content at the start. |
| `endContent`   | Icon or content at the end.   |

**Examples**

```vue
<!-- Basic -->
<PUTextArea v-model="message" label="Message" placeholder="Write your message" />

<!-- Fixed size, no resize -->
<PUTextArea label="Comment" :rows="6" resize="none" />

<!-- With error -->
<PUTextArea label="Bio" error="Bio is required" required />

<!-- With icon -->
<PUTextArea label="Notes">
  <template #startContent>
    <Icon name="lucide:notebook-pen" />
  </template>
</PUTextArea>
```

---

### PUCheckbox

An animated checkbox powered by `motion-v` — the filled box and check mark pop in with a scale animation and shrink away when unchecked. Supports `v-model` with a boolean value; clicking the box or the label toggles it.

```vue
<PUCheckbox v-model="acceptTerms" label="Accept terms and conditions" />
```

**Props**

| Prop            | Type                                                | Default     | Description                                                            |
| --------------- | --------------------------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `modelValue`    | `boolean`                                           | `false`     | Checked state (v-model).                                               |
| `label`         | `string`                                            | —           | Text rendered next to the box. Omit it for a standalone checkbox.      |
| `labelPosition` | `'left' \| 'right'`                                 | `'right'`   | Side of the box where the label renders.                               |
| `labelClass`    | `string`                                            | `'text-sm'` | Custom classes for the label.                                          |
| `size`          | `'sm' \| 'md' \| 'lg'`                              | `'md'`      | Box size. The check icon scales along with it.                         |
| `rounded`       | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`  | `'md'`      | Border radius. `full` gives it a radio-button look.                    |

**Events**

| Event               | Payload   | Description                     |
| ------------------- | --------- | ------------------------------- |
| `update:modelValue` | `boolean` | Emitted when the state toggles. |

**Examples**

```vue
<!-- Basic -->
<PUCheckbox v-model="newsletter" label="Subscribe to the newsletter" />

<!-- Label on the left -->
<PUCheckbox v-model="darkMode" label="Dark mode" label-position="left" />

<!-- Sizes -->
<PUCheckbox v-model="small" label="Small" size="sm" />
<PUCheckbox v-model="large" label="Large" size="lg" />

<!-- Round, radio-button look -->
<PUCheckbox v-model="enabled" label="Enabled" rounded="full" />

<!-- Without label -->
<PUCheckbox v-model="standalone" />
```

---

### PUSelect

A custom select with an animated dropdown panel teleported to `body`. Dark-mode aware, supports `v-model`, and emits both `update:modelValue` and `change`. Only one `PUSelect` can be open at a time across the page — opening a new one automatically closes any other open select.

```vue
<PUSelect
  v-model="role"
  label="Role"
  :options="[
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ]"
/>
```

**Props**

| Prop          | Type                                                        | Default                   | Description                                          |
| ------------- | ----------------------------------------------------------- | ------------------------- | ---------------------------------------------------- |
| `modelValue`  | `string \| number \| null \| (string \| number)[]`         | `null`                    | Selected value (v-model). An array when `multiple` is set. |
| `options`     | `SelectOption[]` (`{ label, value, ...extra }`)             | `[]`                      | Items shown in the dropdown. Extra fields are allowed and exposed to the slots. |
| `multiple`    | `boolean`                                                   | `false`                   | Multi-select mode: picking an option toggles it, the dropdown stays open, and the trigger shows the selected labels comma-separated (or the `selected` slot). |
| `label`       | `string`                                                    | —                         | Label displayed above the select.                    |
| `labelClass`  | `string`                                                    | `'text-sm font-semibold'` | Custom classes for the label.                        |
| `inlineLabel` | `boolean`                                                   | `false`                   | Render `label` as a floating label inside the trigger. |
| `placeholder` | `string`                                                    | `'Seleccionar'`           | Text shown when nothing is selected.                 |
| `description` | `string`                                                    | —                         | Helper text displayed below.                         |
| `rounded`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'`                    | Border radius.                                       |
| `variant`     | `'default' \| 'secondary'`                                  | `'default'`               | Visual style. `default` = subtle gray fill, `secondary` = white fill (dark surface in dark mode). |
| `required`    | `boolean`                                                   | `false`                   | Shows a red asterisk on the label.                   |
| `error`       | `string`                                                    | `''`                      | Error message to display. Changes styling to danger. |
| `disabled`    | `boolean`                                                   | `false`                   | Disables the select.                                 |

**Events**

| Event               | Payload            | Description                            |
| ------------------- | ------------------ | -------------------------------------- |
| `update:modelValue` | `string \| number \| (string \| number)[]` | Emitted when an option is picked. An array in `multiple` mode. |
| `change`            | `string \| number \| (string \| number)[]` | Emitted alongside `update:modelValue`. |

**Slots**

| Slot       | Scope                                        | Description                                                                 |
| ---------- | -------------------------------------------- | --------------------------------------------------------------------------- |
| `selected` | `{ option: SelectOption, options: SelectOption[] }` | Custom content for the trigger when a value is selected (placeholder still renders by default). `option` is the first selected option; `options` holds all of them (a single-item array unless `multiple`). |
| `option`   | `{ option: SelectOption, selected: boolean }` | Custom content for each item in the dropdown list. The check icon for the selected item is kept automatically. |

**Examples**

```vue
<!-- Basic -->
<PUSelect v-model="country" :options="countries" label="Country" />

<!-- With description -->
<PUSelect
  v-model="plan"
  :options="plans"
  label="Plan"
  description="You can change this later"
/>

<!-- With error -->
<PUSelect v-model="status" :options="statuses" error="Pick a status" required />

<!-- Disabled -->
<PUSelect :options="statuses" disabled label="Locked" />

<!-- Multiple: v-model is an array, picking toggles, dropdown stays open -->
<PUSelect v-model="tags" :options="tagOptions" label="Tags" multiple />

<!-- Custom rendering: options can carry extra fields (e.g. email, avatar) -->
<PUSelect v-model="clientId" label="Client" :options="clients">
  <template #selected="{ option }">
    <div class="flex items-center gap-2 min-w-0">
      <span class="size-6 shrink-0 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">
        {{ String(option.label).charAt(0) }}
      </span>
      <span class="truncate">{{ option.label }}</span>
    </div>
  </template>
  <template #option="{ option, selected }">
    <div class="flex flex-col min-w-0 leading-tight">
      <span class="text-sm truncate" :class="selected ? 'text-primary' : ''">{{ option.label }}</span>
      <span class="text-xs text-gray-500 truncate">{{ option.email }}</span>
    </div>
  </template>
</PUSelect>
```

---

### PUAutocomplete

A searchable variant of `PUSelect` — same look and dropdown behavior, but the trigger is a real `<input>` that filters the options as you type. Includes a clear (`×`) button that resets both the search text and the selected value. Like `PUSelect`, the dropdown is teleported to `body` and only one autocomplete can be open at a time.

```vue
<PUAutocomplete
  v-model="framework"
  label="Framework"
  placeholder="Search a framework"
  :options="[
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Vue', value: 'vue' },
    { label: 'React', value: 'react' },
  ]"
/>
```

Filtering is case-insensitive and matches `label`. When the input text matches the currently-selected option's label exactly, the list is shown unfiltered so the user can browse all options again without clearing first. On close without selection, the input reverts to the selected option's label (or empty if nothing was selected).

**Props**

| Prop          | Type                                                        | Default                   | Description                                          |
| ------------- | ----------------------------------------------------------- | ------------------------- | ---------------------------------------------------- |
| `modelValue`  | `string \| number \| null \| (string \| number)[]`         | `null`                    | Selected value (v-model). An array when `multiple` is set. |
| `options`     | `AutocompleteOption[]` (`{ label, value, ...extra }`)       | `[]`                      | Items shown in the dropdown. Extra fields are allowed and exposed to the `option` slot. |
| `multiple`    | `boolean`                                                   | `false`                   | Multi-select mode: picking toggles the option, the dropdown stays open and the active filter is kept. While idle, the input shows the selected labels comma-separated (or the `selected` slot). The clear button resets to `[]`. |
| `label`       | `string`                                                    | —                         | Label displayed above the input.                     |
| `labelClass`  | `string`                                                    | `'text-sm font-semibold'` | Custom classes for the label.                        |
| `inlineLabel` | `boolean`                                                   | `false`                   | Render `label` as a floating label inside the input. |
| `placeholder` | `string`                                                    | `'Search...'`             | Placeholder text shown when the input is empty.      |
| `description` | `string`                                                    | —                         | Helper text displayed below.                         |
| `rounded`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'`                    | Border radius.                                       |
| `variant`     | `'default' \| 'secondary'`                                  | `'default'`               | Visual style. `default` = subtle gray fill, `secondary` = white fill (dark surface in dark mode). |
| `required`    | `boolean`                                                   | `false`                   | Shows a red asterisk on the label.                   |
| `error`       | `string`                                                    | `''`                      | Error message to display. Changes styling to danger. |
| `disabled`    | `boolean`                                                   | `false`                   | Disables the input.                                  |

**Events**

| Event               | Payload                          | Description                                                              |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `update:modelValue` | `string \| number \| null \| (string \| number)[]` | Emitted when an option is picked, or `null` when the clear button is used. An array in `multiple` mode. |
| `change`            | `string \| number \| null \| (string \| number)[]` | Emitted alongside `update:modelValue`.                                   |
| `search`            | `string`                         | Emitted on every keystroke with the current input text. Useful for remote search. |

**Slots**

| Slot       | Scope                                              | Description                                                                 |
| ---------- | -------------------------------------------------- | --------------------------------------------------------------------------- |
| `selected` | `{ option: AutocompleteOption, options: AutocompleteOption[] }` | Rich display of the selection, rendered as an overlay on top of the input. It stays visible while the dropdown is merely open and only hides once the user starts typing, so the input can be used to filter. `option` is the first selected option; `options` holds all of them (a single-item array unless `multiple`). |
| `option`   | `{ option: AutocompleteOption, selected: boolean }` | Custom content for each item in the dropdown list. The check icon for the selected item is kept automatically. |

**Examples**

```vue
<!-- Basic -->
<PUAutocomplete v-model="country" :options="countries" label="Country" />

<!-- Secondary variant + required -->
<PUAutocomplete
  v-model="city"
  variant="secondary"
  :options="cities"
  label="City"
  required
/>

<!-- With error -->
<PUAutocomplete
  v-model="status"
  :options="statuses"
  label="Status"
  error="Pick a status"
  required
/>

<!-- Remote search via the `search` event -->
<PUAutocomplete
  v-model="user"
  :options="remoteResults"
  label="User"
  placeholder="Type to search users"
  @search="onSearch"
/>

<!-- Multiple: v-model is an array; type to filter, pick several in a row -->
<PUAutocomplete v-model="countryCodes" :options="countries" label="Countries" multiple />

<!-- Custom rendering: options can carry extra fields (e.g. email) -->
<PUAutocomplete v-model="clientId" label="Client" :options="clients">
  <template #selected="{ option }">
    <div class="flex items-center gap-2 min-w-0">
      <span class="size-6 shrink-0 rounded-full bg-primary/15 text-primary text-xs font-semibold flex items-center justify-center">
        {{ String(option.label).charAt(0) }}
      </span>
      <span class="truncate">{{ option.label }}</span>
    </div>
  </template>
  <template #option="{ option, selected }">
    <div class="flex flex-col min-w-0 leading-tight">
      <span class="text-sm truncate" :class="selected ? 'text-primary' : ''">{{ option.label }}</span>
      <span class="text-xs text-gray-500 truncate">{{ option.email }}</span>
    </div>
  </template>
</PUAutocomplete>
```

---

### PUDatePicker

A custom date picker that replaces the native `<input type="date">` with a calendar popover. The popover is teleported to `body` (so it escapes any `overflow` ancestor) and includes a year scroller so the user can jump decades without arrow-clicking month by month. Like `PUSelect`/`PUAutocomplete`, only one popover can be open at a time across the page, and the panel re-positions itself on scroll and resize.

```vue
<PUDatePicker v-model="birthDate" label="Birth date" required>
  <template #startContent>
    <Icon name="lucide:calendar" />
  </template>
</PUDatePicker>
```

The `modelValue` is an ISO date string (`YYYY-MM-DD`). The trigger shows the date formatted via `Intl.DateTimeFormat`. All calendar texts (weekday labels, the Clear/Today buttons, the default placeholder and the month names) follow the `lang` prop — English by default, Spanish with `lang="es"`. Click the month/year label in the popover header to open the year scroller — it auto-scrolls to the current view year. The Clear button clears the value, and the Today button picks today (disabled if today is outside `min`/`max`).

**Props**

| Prop          | Type                                                        | Default                   | Description                                                                                       |
| ------------- | ----------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------- |
| `modelValue`  | `string`                                                    | `''`                      | ISO date `YYYY-MM-DD` (v-model). Empty string means no selection.                                 |
| `label`       | `string`                                                    | —                         | Label displayed above the trigger.                                                                |
| `labelClass`  | `string`                                                    | `'text-sm font-semibold'` | Custom classes for the label.                                                                     |
| `inlineLabel` | `boolean`                                                   | `false`                   | Render `label` as a floating label inside the trigger (compact dual-line layout).                 |
| `placeholder` | `string`                                                    | per `lang`                | Text shown when no date is selected. Defaults to `'mm/dd/yyyy'` (`en`) or `'dd/mm/aaaa'` (`es`).  |
| `description` | `string`                                                    | —                         | Helper text displayed below.                                                                      |
| `rounded`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'`                    | Border radius of the trigger.                                                                     |
| `variant`     | `'default' \| 'secondary'`                                  | `'default'`               | Visual style. `default` = subtle gray fill, `secondary` = white fill (dark surface in dark mode). |
| `required`    | `boolean`                                                   | `false`                   | Shows a red asterisk on the label.                                                                |
| `error`       | `string`                                                    | —                         | Error message to display. Changes styling to danger.                                              |
| `disabled`    | `boolean`                                                   | `false`                   | Disables the trigger.                                                                             |
| `min`         | `string`                                                    | —                         | Minimum selectable date (`YYYY-MM-DD`). Days, months, and years before it are disabled.           |
| `max`         | `string`                                                    | —                         | Maximum selectable date (`YYYY-MM-DD`). Days, months, and years after it are disabled.            |
| `lang`        | `'en' \| 'es'`                                              | `'en'`                    | Language for all calendar texts: weekday labels, Clear/Today buttons, default placeholder, and date/month formatting. |
| `locale`      | `string`                                                    | follows `lang`            | BCP 47 locale tag that overrides only the `Intl` formatting (date format and month names) — e.g. `'en-GB'` for `dd/mm/yyyy` order. UI texts still come from `lang`. |
| `minYear`     | `number`                                                    | `currentYear - 100`       | Lower bound of the year scroller. Clamped further by `min` if present.                            |
| `maxYear`     | `number`                                                    | `currentYear + 10`        | Upper bound of the year scroller. Clamped further by `max` if present.                            |

**Slots**

| Slot           | Description                                            |
| -------------- | ------------------------------------------------------ |
| `startContent` | Icon or content at the start of the trigger.           |
| `endContent`   | Icon or content at the end (replaces the default calendar icon). |

**Events**

| Event               | Payload    | Description                                                                |
| ------------------- | ---------- | -------------------------------------------------------------------------- |
| `update:modelValue` | `string`   | ISO date when a date is picked, or empty string when "Borrar" is clicked.  |

**Examples**

```vue
<!-- Basic -->
<PUDatePicker v-model="startDate" label="Start date" />

<!-- Bounded range (only 2026 dates) -->
<PUDatePicker
  v-model="bookingDate"
  label="Booking"
  min="2026-01-01"
  max="2026-12-31"
/>

<!-- Birthday picker with a wider year range -->
<PUDatePicker
  v-model="birthDate"
  label="Birth date"
  :min-year="1900"
  :max-year="2026"
  required
/>

<!-- Spanish calendar (weekdays, buttons, placeholder and month names) -->
<PUDatePicker v-model="date" label="Fecha" lang="es" />

<!-- English texts but day-first format -->
<PUDatePicker v-model="date" label="Date" locale="en-GB" />

<!-- Linked range — end date can't be before start date -->
<PUDatePicker v-model="startDate" label="Start" />
<PUDatePicker
  v-model="endDate"
  label="End"
  :min="startDate || undefined"
  variant="secondary"
/>

<!-- With validation error -->
<PUDatePicker
  v-model="date"
  label="Birth date"
  error="Please pick a valid date"
  required
/>

<!-- Inline label — label stacked above the value inside the trigger -->
<PUDatePicker v-model="startDate" label="Fecha inicial" inline-label />
<PUDatePicker v-model="endDate" label="Fecha final" inline-label />
```

> **Inline label** is supported by all form components (`PUInput`, `PUTextArea`, `PUSelect`, `PUAutocomplete`, `PUDatePicker`). When `inlineLabel` is `true`, the external `<label>` above the field is hidden and the label renders as a small floating label inside the field — ideal for compact filter rows or dense forms. The `required` asterisk follows the label automatically.

> The popover renders inside a wrapper that mirrors the host's `.dark` ancestor so all child `PUButton`/`PUCard` instances stay in sync with the app's theme — even though they are teleported to `body`. Dark-mode is captured on open; if the theme is toggled while the popover is open, close and reopen it to refresh.

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
| `isBordered`  | `boolean`                    | `true`      | Adds a border to the card.        |

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

### PUDropdown

A floating panel anchored to an activator element. The menu is teleported to `body` and positioned with `position: fixed` relative to the activator, so it escapes any `overflow` ancestor (scroll containers, modals, etc.). The menu re-positions itself on scroll and resize while open. Opens on click and closes on outside click; only one `PUDropdown` can be open at a time across the page. Provides a `closeDropdown` function (via `inject`) so child items can close the panel after acting.

```vue
<PUDropdown>
  <template #activator>
    <PUButton label="Options" end-icon="lucide:chevron-down" />
  </template>
  <template #content>
    <ul class="p-2">
      <li class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg cursor-pointer">
        Profile
      </li>
      <li class="px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg cursor-pointer">
        Settings
      </li>
    </ul>
  </template>
</PUDropdown>
```

**Props**

| Prop           | Type     | Default     | Description                                                        |
| -------------- | -------- | ----------- | ------------------------------------------------------------------ |
| `menuMinWidth` | `string` | `'min-w-52'` | Tailwind min-width class applied to the floating panel.            |

**Slots**

| Slot        | Description                                              |
| ----------- | -------------------------------------------------------- |
| `activator` | The element the user clicks to open the dropdown.        |
| `content`   | The floating panel contents (rendered when open).        |

**Provides**

| Key             | Type         | Description                                                              |
| --------------- | ------------ | ------------------------------------------------------------------------ |
| `closeDropdown` | `() => void` | Call from inside `content` to close the dropdown (e.g. after an action). |

```vue
<!-- Closing the dropdown from a child item -->
<script setup>
import { inject } from "vue";
const closeDropdown = inject("closeDropdown");
</script>

<template>
  <button @click="handleAction(); closeDropdown?.()">Action</button>
</template>
```

---

### PULottie

A Lottie animation player powered by `vue3-lottie`. Renders inside `ClientOnly` so it is SSR-safe, and shrinks 80px in width and height on screens narrower than 768px.

```vue
<script setup>
import animationData from "./my-animation.json";
</script>

<template>
  <PULottie :animation-data="animationData" />
</template>
```

**Props**

| Prop            | Type      | Default | Description                                                  |
| --------------- | --------- | ------- | ------------------------------------------------------------ |
| `animationData` | `object`  | —       | Parsed Lottie JSON object. Required.                         |
| `loop`          | `boolean` | `true`  | Whether the animation loops.                                 |
| `height`        | `number`  | `420`   | Height in pixels. Reduced by 80px on viewports below 768px.  |
| `width`         | `number`  | `420`   | Width in pixels. Reduced by 80px on viewports below 768px.   |

**Examples**

```vue
<!-- Play once -->
<PULottie :animation-data="data" :loop="false" />

<!-- Custom size -->
<PULottie :animation-data="data" :width="240" :height="240" />
```

> `PUTable` ships with a bundled empty-state Lottie that uses this component internally. You can disable or override it via the table's `showEmptyAnimation` and `emptyAnimationData` props.

---

### PUTable

A responsive data table that renders as a normal `<table>` on `md+` viewports and switches to a stack of cards on mobile. Cells are rendered through per-column scoped slots so you can fully customize their content.

```vue
<PUTable :columns="columns" :items="items" />
```

**Props**

| Prop                   | Type                                                                         | Default                                                                                  | Description                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `items`                | `TItem[]` where `TItem extends { id: string \| number }`                     | `[]`                                                                                     | Row data. `PUTable` is generic in `TItem`, so passing `SaleOrder[]`, `User[]`, etc. is type-safe — `row-click` and the `cell-{id}` slot scope infer your interface. |
| `columns`              | `{ name: string, id: string, width?: string }[]`                             | `[]`                                                                                     | Column definitions. `id` is the row key to read, `width` is CSS width.                      |
| `rounded`              | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'` | `'lg'`                                                                                   | Border radius of the outer container.                                                       |
| `isBordered`           | `boolean`                                                                    | `false`                                                                                  | Adds an outer border around the table.                                                      |
| `isSelectable`         | `boolean`                                                                    | `false`                                                                                  | Enables row click + hover effects (cursor, bg highlight). Emits `row-click`.                |
| `itemsSize`            | `'sm' \| 'md' \| 'lg'`                                                       | `'md'`                                                                                   | Vertical padding of body rows. `sm` → `py-2`, `md` → `py-4`, `lg` → `py-6`.                 |
| `headerColor`          | `string`                                                                     | `'bg-default text-[#71717A] dark:text-[#9CA3AF]'`                                        | Tailwind classes applied to `<thead>`. Uses the `--color-default` surface token by default. |
| `isBodyColored`        | `boolean`                                                                    | `false`                                                                                  | When `true`, applies `bodyColor` to `<tbody>`. Leave `false` to let the parent paint the bg.|
| `bodyColor`            | `string`                                                                     | `'bg-card'`                                                                              | Tailwind classes applied to `<tbody>` (only when `isBodyColored` is `true`). Uses the `--color-card` surface token by default. |
| `hasShadow`            | `boolean`                                                                    | `true`                                                                                   | Adds an iOS-style outer shadow to the table container.                                      |
| `emptyStateTitle`      | `string`                                                                     | `'No results found'`                                                                     | Heading shown when `items` is empty.                                                        |
| `emptyStateDescription`| `string`                                                                     | `'Try adjusting your search or filter to find what you\'re looking for.'`                | Sub-text shown under the empty-state title.                                                 |
| `showEmptyAnimation`   | `boolean`                                                                    | `true`                                                                                   | Renders a bundled Lottie above the empty-state text. Set to `false` to hide it.             |
| `emptyAnimationData`   | `object \| undefined`                                                        | bundled `empty-state.json`                                                               | Override the empty-state Lottie with your own animation JSON object.                        |
| `emptyAnimationSize`   | `number`                                                                     | `220`                                                                                    | Width and height of the empty-state animation, in pixels.                                   |
| `withPagination`         | `boolean`                                                                  | `false`                                                                                  | Renders a `PUPagination` inside the table footer.                                           |
| `paginationPage`         | `number`                                                                   | `1`                                                                                      | Current page (use with `v-model:paginationPage`).                                           |
| `paginationTotalItems`   | `number \| undefined`                                                      | `items.length`                                                                           | Total number of items across all pages. Defaults to the length of `items`.                  |
| `paginationItemsPerPage` | `number \| undefined`                                                      | `items.length` (or `10` if empty)                                                        | Items per page. Defaults to the current `items` length so client-paginated tables work out of the box. Use with `v-model:paginationItemsPerPage` when `paginationShowPageSize` is on. |
| `paginationShowItemsCount` | `boolean`                                                                | `true`                                                                                   | Show the "Mostrando X-Y de Z registros" label on the left.                                  |
| `paginationShowPageSize`   | `boolean`                                                                | `false`                                                                                  | Turns the footer items-count label into a toggle that reveals a page-size selector on click, so it stays collapsed until needed. |
| `paginationPageSizeOptions`| `number[]`                                                               | `[10, 20, 50, 100]`                                                                      | Options offered in the page-size selector.                                                  |
| `paginationPageSizeLabel`  | `string`                                                                 | `'Filas por página'`                                                                     | Toggle label used when the count is hidden and on mobile.                                   |

**Events**

| Event                            | Payload                | Description                                                                                            |
| -------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `row-click`                      | `item: TItem`          | Emitted when a row is clicked (only when `isSelectable` is `true`). `TItem` is inferred from `items`.  |
| `update:paginationPage`          | `page: number`         | Emitted when the user changes the page (enables `v-model:paginationPage`).                             |
| `pagination-page-change`         | `page: number`         | Emitted alongside `update:paginationPage` for non-v-model listeners.                                   |
| `update:paginationItemsPerPage`  | `itemsPerPage: number` | Emitted when the page size changes (enables `v-model:paginationItemsPerPage`). The page also resets to `1`. |
| `pagination-page-size-change`    | `itemsPerPage: number` | Emitted alongside `update:paginationItemsPerPage` for non-v-model listeners.                           |

**Slots**

| Slot            | Scope                                  | Description                                                                  |
| --------------- | -------------------------------------- | ---------------------------------------------------------------------------- |
| `cell-{id}`     | `{ item, value }`                      | Customize the cell for the column with `id` = `{id}`. Falls back to `value`. |
| `mobile-card`   | `{ item, columns }`                    | Replace the default mobile card layout for an entire row.                    |

**Examples**

```vue
<template>
  <!-- Basic table -->
  <PUTable :columns="columns" :items="items" />

  <!-- Custom cell rendering -->
  <PUTable :columns="columns" :items="items" rounded="2xl" is-bordered>
    <template #cell-status="{ value }">
      <PUChip :label="value" :color="value === 'Active' ? 'success' : 'danger'" variant="flat" size="sm" />
    </template>
    <template #cell-actions="{ item }">
      <div class="flex gap-2 justify-end">
        <PUButton is-icon-only icon="lucide:pencil" variant="ghost" size="sm" @click.stop="edit(item)" />
        <PUButton is-icon-only icon="lucide:trash-2" variant="ghost" color="danger" size="sm" @click.stop="remove(item)" />
      </div>
    </template>
  </PUTable>

  <!-- Selectable rows with row-click -->
  <PUTable
    :columns="columns"
    :items="items"
    is-selectable
    @row-click="onRowClick"
  />
</template>

<script setup>
const columns = [
  { name: "Name", id: "name", width: "40%" },
  { name: "Status", id: "status", width: "30%" },
  { name: "", id: "actions", width: "30%" },
];
const items = [
  { id: 1, name: "Ada Lovelace", status: "Active" },
  { id: 2, name: "Alan Turing", status: "Inactive" },
];

function onRowClick(item) {
  console.log("clicked row:", item);
}
</script>

> When `isSelectable` is enabled, clicks on interactive children (buttons, links) propagate to the row. Use `@click.stop` on those children if you don't want them to fire `row-click`.
```

---

### PUPagination

A pagination control with first/prev/next/last buttons and a numeric page range (up to 5 page buttons grouped together). Used standalone or embedded inside `PUTable` via `withPagination`.

```vue
<PUPagination
  v-model:page="page"
  :total-items="items.length"
  :items-per-page="10"
/>
```

**Props**

| Prop             | Type      | Default | Description                                                                |
| ---------------- | --------- | ------- | -------------------------------------------------------------------------- |
| `page`            | `number`   | `1`                    | Current page (use with `v-model:page`).                                    |
| `totalItems`      | `number`   | `0`                    | Total number of items across all pages. Used to compute `totalPages`.      |
| `itemsPerPage`    | `number`   | `10`                   | Items per page (use with `v-model:items-per-page` when `showPageSize` is on). |
| `showItemsCount`  | `boolean`  | `true`                 | Show the "Mostrando X-Y de Z registros" label on the left (md+ viewports). |
| `showPageSize`    | `boolean`  | `false`                | Turns the items-count label into a toggle (with a chevron) that reveals a page-size `PUSelect` on click, so the selector stays collapsed until needed. |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]`    | Options offered in the page-size selector.                                 |
| `pageSizeLabel`   | `string`   | `'Filas por página'`   | Toggle label used when the items count is hidden (`showItemsCount: false`) and on mobile. |

**Events**

| Event                   | Payload                | Description                                                                          |
| ----------------------- | ---------------------- | ------------------------------------------------------------------------------------ |
| `update:page`           | `page: number`         | Emitted when the page changes (enables `v-model:page`).                              |
| `page-change`           | `page: number`         | Emitted alongside `update:page` for non-v-model listeners.                          |
| `update:itemsPerPage`   | `itemsPerPage: number` | Emitted when the page size changes (enables `v-model:items-per-page`). The page also resets to `1`. |
| `page-size-change`      | `itemsPerPage: number` | Emitted alongside `update:itemsPerPage` for non-v-model listeners.                  |

**Examples**

```vue
<!-- Basic -->
<PUPagination v-model:page="page" :total-items="350" :items-per-page="20" />

<!-- Without the items counter -->
<PUPagination
  v-model:page="page"
  :total-items="350"
  :items-per-page="20"
  :show-items-count="false"
/>

<!-- With a page-size selector -->
<PUPagination
  v-model:page="page"
  v-model:items-per-page="perPage"
  :total-items="350"
  show-page-size
  :page-size-options="[10, 20, 50, 100]"
/>

<!-- Inside a PUTable -->
<PUTable
  v-model:pagination-page="page"
  :columns="columns"
  :items="pagedItems"
  with-pagination
  :pagination-total-items="totalItems"
  :pagination-items-per-page="20"
/>
```

---

### PUSkeleton

A shimmer loading placeholder used to reserve layout space while async content is fetching. Accepts named sizes or any Tailwind `h-*` / `w-*` utility class as a string.

```vue
<PUSkeleton />
```

**Props**

| Prop      | Type                                                | Default         | Description                                                                                 |
| --------- | --------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------- |
| `variant` | `'rectangular' \| 'circular' \| 'text'`             | `'rectangular'` | Visual shape. `rectangular` is `rounded-xl`, `circular` is a full circle, `text` is `4px`.  |
| `height`  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string`    | `'md'`          | Named height (`h-4` → `h-20`) or any Tailwind height utility (e.g. `'h-32'`, `'h-3.5'`).    |
| `width`   | `'full' \| 'auto' \| string`                        | `'full'`        | `full` → `w-full`, `auto` → `w-auto`, or any Tailwind width utility (e.g. `'w-1/2'`).       |

**Examples**

```vue
<!-- Basic -->
<PUSkeleton />

<!-- Variants -->
<PUSkeleton variant="rectangular" height="h-20" width="w-32" />
<PUSkeleton variant="circular" height="h-16" width="w-16" />
<PUSkeleton variant="text" height="h-3" width="w-2/3" />

<!-- Named heights -->
<PUSkeleton height="xs" />
<PUSkeleton height="sm" />
<PUSkeleton height="md" />
<PUSkeleton height="lg" />
<PUSkeleton height="xl" />

<!-- Composed card placeholder -->
<PUCard class="p-6 flex flex-col gap-4">
  <PUSkeleton height="h-40" />
  <PUSkeleton height="h-5" width="w-2/3" />
  <PUSkeleton height="h-4" width="w-1/2" />
  <div class="flex items-center gap-3 pt-2">
    <PUSkeleton height="h-10" width="w-10" />
    <div class="flex flex-col gap-1.5 flex-1">
      <PUSkeleton height="h-3.5" width="w-1/3" />
      <PUSkeleton height="h-3" width="w-1/4" />
    </div>
  </div>
</PUCard>
```

---

## TypeScript

ProxyUI exports all component types:

```ts
import type {
  GlobalRounded,
  ButtonProps,
  ButtonColor,
  ButtonVariant,
  ButtonSize,
  ButtonRounded,
  InputProps,
  InputVariant,
  InputRounded,
  CheckboxProps,
  CheckboxSize,
  CheckboxRounded,
  CheckboxLabelPosition,
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
  LottieProps,
  TableProps,
  TableColumn,
  TableItem,
  TableRounded,
  TableItemsSize,
  PaginationProps,
  SkeletonProps,
  SkeletonVariant,
  SkeletonHeight,
  SkeletonWidth,
  SelectOption,
  SelectProps,
  AutocompleteOption,
  AutocompleteProps,
  DatePickerProps,
  DatePickerLang,
} from "@smurfox/proxy-ui";
```

> `PUTextArea` and `PUDropdown` define their props inline and do not export dedicated `Props` types. They reuse `InputVariant` and `InputRounded` from the same package. `PUSelect`, `PUAutocomplete`, and `PUDatePicker` do export `SelectProps`/`SelectOption`, `AutocompleteProps`/`AutocompleteOption`, and `DatePickerProps` respectively. `SelectOption` and `AutocompleteOption` accept arbitrary extra fields, which are exposed to the rendering slots.

---

## License

[MIT](./LICENSE)
