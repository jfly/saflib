import { mountWithPlugins } from "@saflib/vue-spa/testing";
import type { ComponentMountingOptions } from "@vue/test-utils";
import type { Component } from "vue";
import { createAuthRouter } from "./auth-router.ts";
import { authAppStrings } from "./strings.ts";
import { webCommonStrings } from "@vendata/web-common/strings";

export const router = createAuthRouter();

export const mountTestApp = <C extends Component>(
  Component: C,
  options: ComponentMountingOptions<C> = {},
) => {
  return mountWithPlugins(Component, options, {
    router,
    i18nMessages: {
      ...authAppStrings,
      ...webCommonStrings,
    },
  });
};
