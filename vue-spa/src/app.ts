import { createTanstackQueryClient } from "./tanstack.ts";
import { createApp, type Component } from "vue";
import { createVuetify, type VuetifyOptions } from "vuetify";
import {
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from "@tanstack/vue-query";
import type { Router } from "vue-router";
import { createI18n } from "vue-i18n";
import { type I18nMessages } from "./strings.ts";

/**
 * Options for createVueApp.
 */
export interface CreateVueAppOptions {
  router: Router;
  vuetifyConfig?: VuetifyOptions;
  callback?: (app: ReturnType<typeof createApp>) => void;
  i18nMessages?: I18nMessages;
}

/**
 * Wrapper around vue's `createApp` function. Handles SAF-required plugins.
 *
 * Sets up:
 * - Vuetify
 * - Vue Router
 * - Tanstack Query
 * - Vue I18n
 *
 */
export const createVueApp = (
  Application: Component,
  { router, vuetifyConfig, callback, i18nMessages }: CreateVueAppOptions,
) => {
  const vuetify = createVuetify(vuetifyConfig);
  const app = createApp(Application);
  app.use(vuetify);
  if (router) {
    app.use(router);
  }

  const queryClient = createTanstackQueryClient();
  const options: VueQueryPluginOptions = {
    enableDevtoolsV6Plugin: true,
    queryClient,
  };
  app.use(VueQueryPlugin, options);

  let messages = {};
  if (i18nMessages) {
    messages = {
      legacy: false, // can be removed after vue-i18n v12 or so
      locale: "en",
      messages: {
        en: i18nMessages,
      },
    };
  }

  const i18n = createI18n(messages);
  app.use(i18n);

  if (callback) {
    callback(app);
  }

  app.mount("#app");
  return app;
};
