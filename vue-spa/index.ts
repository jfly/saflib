export { AsyncPage } from "./tricky-imports.ts";
import { createTanstackQueryClient } from "./tanstack.ts";
import { createApp, type Component } from "vue";
import { createVuetify, type VuetifyOptions } from "vuetify";
import {
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from "@tanstack/vue-query";
import type { Router } from "vue-router";
export * from "./tanstack.ts";
export * from "./events.ts";
import "./assets.d.ts";

interface CreateVueAppOptions {
  router: Router;
  vuetifyConfig?: VuetifyOptions;
  callback?: (app: ReturnType<typeof createApp>) => void;
}

export const createVueApp = (
  Application: Component,
  { router, vuetifyConfig, callback }: CreateVueAppOptions,
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

  if (callback) {
    callback(app);
  }

  app.mount("#app");
  return createApp(app);
};

export type LinkProps = { href: string } | { to: string };

export type Link = {
  subdomain: string;
  path: string;
};

export type LinkMap = Record<string, Link>;

// Based on the current domain, and if we're on the same subdomain, return props
// which will work with vuetify components such as v-list-item and b-btn
export const linkToProps = (link: Link) => {
  // This works for {subdomain}.docker.localhost as well as prod domains
  const domain = document.location.hostname.split(".").slice(-2).join(".");
  const currentSubdomain = document.location.hostname
    .split(".")
    .slice(0, -2)
    .join(".");
  const protocol = document.location.protocol;
  if (currentSubdomain === link.subdomain) {
    return {
      to: link.path,
    };
  }
  return {
    href: `${protocol}//${link.subdomain}.${domain}${link.path}`, // TODO: use router-link
  };
};
