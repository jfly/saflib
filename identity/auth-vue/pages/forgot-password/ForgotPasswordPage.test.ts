import { describe, it, expect } from "vitest";
import {
  stubGlobals,
  mountWithPlugins,
} from "../../../../vue-spa/testing/components.ts";
import type { VueWrapper } from "@vue/test-utils";
import ForgotPasswordPage from "./ForgotPasswordPage.vue";
import { createAuthRouter } from "../../auth-router.ts";
import { getElementByString } from "@saflib/vue-spa/testing";
import { forgot_password_page } from "./ForgotPasswordPage.strings.ts";

const router = createAuthRouter();

describe("ForgotPasswordPage", () => {
  stubGlobals();

  // Helper functions for element selection
  const getEmailInput = (wrapper: VueWrapper) => {
    return getElementByString(wrapper, forgot_password_page.email_address);
  };

  const getSubmitButton = (wrapper: VueWrapper) => {
    return getElementByString(wrapper, forgot_password_page.send_reset_link);
  };

  const mountComponent = () => {
    return mountWithPlugins(ForgotPasswordPage, {}, { router });
  };

  it("should render the form", () => {
    const wrapper = mountComponent();
    expect(getEmailInput(wrapper).exists()).toBe(true);
    expect(getSubmitButton(wrapper).exists()).toBe(true);
    expect(wrapper.text()).toContain("Reset Password");
  });
});
