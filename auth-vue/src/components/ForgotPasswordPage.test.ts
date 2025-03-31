import { describe, it, expect } from "vitest";
import {
  withResizeObserverMock,
  mountWithPlugins,
  waitFor,
  setupMockServer,
} from "@saflib/vue-spa-dev/components";
import type { VueWrapper } from "@vue/test-utils";
import ForgotPasswordPage from "./ForgotPasswordPage.vue";
import { router } from "../router";
import { VAlert, VBtn } from "vuetify/components";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://api.localhost:3000/auth/forgot-password", async () => {
    return HttpResponse.json({
      success: true,
      message:
        "If an account exists with this email, a recovery email was sent",
    });
  }),
];

export const server = setupMockServer(handlers);

withResizeObserverMock(() => {
  describe("ForgotPasswordPage", () => {
    // Helper functions for element selection
    const getEmailInput = (wrapper: VueWrapper) => {
      const emailInput = wrapper.find("[placeholder='Email address']");
      expect(emailInput.exists()).toBe(true);
      return emailInput;
    };

    const getSubmitButton = (wrapper: VueWrapper) => {
      const button = wrapper.findComponent(VBtn);
      expect(button.exists()).toBe(true);
      expect(button.text()).toBe("Send Reset Link");
      return button;
    };

    const getSuccessAlert = (wrapper: VueWrapper) => {
      const alert = wrapper
        .findAllComponents(VAlert)
        .find((alert) => alert.props().type === "success");
      return alert;
    };

    const getErrorAlert = (wrapper: VueWrapper) => {
      const alerts = wrapper.findAllComponents(VAlert);
      return alerts.find((alert) => alert.props().type === "error");
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

    it("should validate email format", async () => {
      const wrapper = mountComponent();
      const emailInput = getEmailInput(wrapper);

      // Test invalid email
      await emailInput.setValue("invalid-email");
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toContain("Email must be valid");

      // Test valid email
      await emailInput.setValue("valid@email.com");
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).not.toContain("Email must be valid");
    });

    it("should disable submit button when form is invalid", async () => {
      const wrapper = mountComponent();
      const submitButton = getSubmitButton(wrapper);

      // Initially disabled
      expect(submitButton.attributes("disabled")).toBeDefined();

      // After valid input
      await getEmailInput(wrapper).setValue("valid@email.com");
      await wrapper.vm.$nextTick();
      expect(submitButton.attributes("disabled")).toBeUndefined();
    });

    it("should show loading state during submission", async () => {
      const wrapper = mountComponent();
      const submitButton = getSubmitButton(wrapper);
      const emailInput = getEmailInput(wrapper);

      await emailInput.setValue("valid@email.com");
      await wrapper.vm.$nextTick();
      await submitButton.trigger("click");

      expect(submitButton.text()).toBe("Sending...");
      expect(emailInput.attributes("disabled")).toBeDefined();
    });

    it("should show success message after successful submission", async () => {
      server.use(
        http.post("http://api.localhost:3000/auth/forgot-password", () => {
          return new HttpResponse(
            JSON.stringify({
              success: true,
              message:
                "If an account exists with this email, a recovery email was sent",
            }),
            { status: 200 },
          );
        }),
      );

      const wrapper = mountComponent();
      const emailInput = getEmailInput(wrapper);
      const submitButton = getSubmitButton(wrapper);

      await emailInput.setValue("valid@email.com");
      await wrapper.vm.$nextTick();
      await submitButton.trigger("click");
      const successAlert = await waitFor(() => getSuccessAlert(wrapper));
      expect(successAlert).toBeDefined();
      expect(successAlert?.text()).toContain(
        "If an account exists with this email",
      );
    });

    it("should show error message after failed submission", async () => {
      // Mock failed response
      server.use(
        http.post("http://api.localhost:3000/auth/forgot-password", () => {
          return new HttpResponse(
            JSON.stringify({
              error: "API Error",
            }),
            { status: 500 },
          );
        }),
      );

      const wrapper = mountComponent();
      const emailInput = getEmailInput(wrapper);
      const submitButton = getSubmitButton(wrapper);

      await emailInput.setValue("valid@email.com");
      await wrapper.vm.$nextTick();
      await submitButton.trigger("click");
      await waitFor(() => getErrorAlert(wrapper));
      const errorAlert = getErrorAlert(wrapper);
      expect(errorAlert).toBeDefined();
      expect(errorAlert?.text()).toContain("An error occurred");
    });
  });
});
