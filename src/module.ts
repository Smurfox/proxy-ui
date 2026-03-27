import { defineNuxtModule, createResolver, addComponentsDir } from "@nuxt/kit";

export * from "./runtime/types";

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "proxy-ui",
    configKey: "proxyUI",
  },
  defaults: {},
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Fuente Inter via @nuxt/fonts
    if (nuxt.options.fonts !== false) {
      nuxt.options.fonts = nuxt.options.fonts ?? {};
      (nuxt.options.fonts as any).families = [
        ...((nuxt.options.fonts as any).families ?? []),
        {
          name: "Inter",
          provider: "google",
          weights: [400, 500, 600, 700],
        },
      ];
    }

    // CSS Variables globales
    nuxt.options.app.head = nuxt.options.app.head ?? {};
    nuxt.options.app.head.style = [
      ...(nuxt.options.app.head.style ?? []),
      {
        innerHTML: `
          :root {
            --shadow-ios: 0 10px 30px rgba(0, 0, 0, 0.05);
          }
        `,
      },
    ];

    // Componentes
    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      prefix: "PU",
      global: true,
    });
  },
});
