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

    // Componentes
    addComponentsDir({
      path: resolver.resolve("./runtime/components"),
      prefix: "PU",
      global: true,
    });
  },
});
