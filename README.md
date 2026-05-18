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

ProxyUI uses CSS variables for colors. Add them to your CSS file to customize:

```css
@import "tailwindcss";
@source "../node_modules/@smurfox/proxy-ui/dist";

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
| `placeholder` | `string`                                                    | —                         | Placeholder text.                                    |
| `description` | `string`                                                    | —                         | Helper text displayed below.                         |
| `rounded`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'`                    | Border radius.                                       |
| `variant`     | `'default' \| 'secondary'`                                  | `'default'`               | Visual style.                                        |
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
| `modelValue`  | `string \| number \| null`                                  | `null`                    | Selected value (v-model).                            |
| `options`     | `{ label: string, value: string \| number }[]`              | `[]`                      | Items shown in the dropdown.                         |
| `label`       | `string`                                                    | —                         | Label displayed above the select.                    |
| `labelClass`  | `string`                                                    | `'text-sm font-semibold'` | Custom classes for the label.                        |
| `placeholder` | `string`                                                    | `'Seleccionar'`           | Text shown when nothing is selected.                 |
| `description` | `string`                                                    | —                         | Helper text displayed below.                         |
| `rounded`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'`                    | Border radius.                                       |
| `variant`     | `'default' \| 'secondary'`                                  | `'default'`               | Visual style.                                        |
| `required`    | `boolean`                                                   | `false`                   | Shows a red asterisk on the label.                   |
| `error`       | `string`                                                    | `''`                      | Error message to display. Changes styling to danger. |
| `disabled`    | `boolean`                                                   | `false`                   | Disables the select.                                 |

**Events**

| Event               | Payload            | Description                            |
| ------------------- | ------------------ | -------------------------------------- |
| `update:modelValue` | `string \| number` | Emitted when an option is picked.      |
| `change`            | `string \| number` | Emitted alongside `update:modelValue`. |

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
| `modelValue`  | `string \| number \| null`                                  | `null`                    | Selected value (v-model).                            |
| `options`     | `{ label: string, value: string \| number }[]`              | `[]`                      | Items shown in the dropdown.                         |
| `label`       | `string`                                                    | —                         | Label displayed above the input.                     |
| `labelClass`  | `string`                                                    | `'text-sm font-semibold'` | Custom classes for the label.                        |
| `placeholder` | `string`                                                    | `'Search...'`             | Placeholder text shown when the input is empty.      |
| `description` | `string`                                                    | —                         | Helper text displayed below.                         |
| `rounded`     | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'xl'`                    | Border radius.                                       |
| `variant`     | `'default' \| 'secondary'`                                  | `'default'`               | Visual style.                                        |
| `required`    | `boolean`                                                   | `false`                   | Shows a red asterisk on the label.                   |
| `error`       | `string`                                                    | `''`                      | Error message to display. Changes styling to danger. |
| `disabled`    | `boolean`                                                   | `false`                   | Disables the input.                                  |

**Events**

| Event               | Payload                          | Description                                                              |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `update:modelValue` | `string \| number \| null`       | Emitted when an option is picked, or `null` when the clear button is used. |
| `change`            | `string \| number \| null`       | Emitted alongside `update:modelValue`.                                   |
| `search`            | `string`                         | Emitted on every keystroke with the current input text. Useful for remote search. |

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
| `items`                | `Array<{ id: string \| number, [key: string]: unknown }>`                    | `[]`                                                                                     | Row data. Each item must have an `id` used as the Vue key.                                  |
| `columns`              | `{ name: string, id: string, width?: string }[]`                             | `[]`                                                                                     | Column definitions. `id` is the row key to read, `width` is CSS width.                      |
| `rounded`              | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| 'full'` | `'lg'`                                                                                   | Border radius of the outer container.                                                       |
| `isBordered`           | `boolean`                                                                    | `false`                                                                                  | Adds an outer border around the table.                                                      |
| `isSelectable`         | `boolean`                                                                    | `false`                                                                                  | Enables row click + hover effects (cursor, bg highlight, motion-v lift). Emits `row-click`. |
| `itemsSize`            | `'sm' \| 'md' \| 'lg'`                                                       | `'md'`                                                                                   | Vertical padding of body rows. `sm` → `py-2`, `md` → `py-4`, `lg` → `py-6`.                 |
| `headerColor`          | `string`                                                                     | `bg-[#F4F4F5] text-[#71717A] dark:bg-[#20242C] dark:text-[#9CA3AF]`                      | Tailwind classes applied to `<thead>`.                                                      |
| `isBodyColored`        | `boolean`                                                                    | `false`                                                                                  | When `true`, applies `bodyColor` to `<tbody>`. Leave `false` to let the parent paint the bg.|
| `bodyColor`            | `string`                                                                     | `'bg-white dark:bg-[#14171C]'`                                                           | Tailwind classes applied to `<tbody>` (only when `isBodyColored` is `true`).                |
| `hasShadow`            | `boolean`                                                                    | `true`                                                                                   | Adds an iOS-style outer shadow to the table container.                                      |
| `emptyStateTitle`      | `string`                                                                     | `'No results found'`                                                                     | Heading shown when `items` is empty.                                                        |
| `emptyStateDescription`| `string`                                                                     | `'Try adjusting your search or filter to find what you\'re looking for.'`                | Sub-text shown under the empty-state title.                                                 |
| `showEmptyAnimation`   | `boolean`                                                                    | `true`                                                                                   | Renders a bundled Lottie above the empty-state text. Set to `false` to hide it.             |
| `emptyAnimationData`   | `object \| undefined`                                                        | bundled `empty-state.json`                                                               | Override the empty-state Lottie with your own animation JSON object.                        |
| `emptyAnimationSize`   | `number`                                                                     | `220`                                                                                    | Width and height of the empty-state animation, in pixels.                                   |

**Events**

| Event       | Payload                                                  | Description                                                              |
| ----------- | -------------------------------------------------------- | ------------------------------------------------------------------------ |
| `row-click` | `item: { id: string \| number, [key: string]: unknown }` | Emitted when a row is clicked (only when `isSelectable` is `true`).      |

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
  AutocompleteOption,
  AutocompleteProps,
} from "@smurfox/proxy-ui";
```

> `PUTextArea`, `PUSelect`, and `PUDropdown` define their props inline and do not export dedicated `Props` types. They reuse `InputVariant` and `InputRounded` from the same package. `PUAutocomplete` does export `AutocompleteProps` and `AutocompleteOption`.

---

## License

[MIT](./LICENSE)
