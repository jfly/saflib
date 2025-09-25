import { mountWithPlugins } from "@saflib/vue/testing";
import type { ComponentMountingOptions } from "@vue/test-utils";
import type { Component } from "vue";
import { __serviceName__SdkStrings } from "./strings.ts";
import { __serviceName__ServiceFakeHandlers } from "./fakes.ts";
import { router } from "./router.ts";

export const mountTestApp = <C extends Component>(
  Component: C,
  options: ComponentMountingOptions<C> = {},
) => {
  return mountWithPlugins(Component, options, {
    i18nMessages: {
      ...__serviceName__SdkStrings,
    },
    router,
  });
};

export const testAppHandlers = [...__serviceName__ServiceFakeHandlers];
