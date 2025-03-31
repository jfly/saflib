import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  withResizeObserverMock,
  mountWithPlugins,
} from "@saflib/vue-spa-dev/components";
import type { VueWrapper } from "@vue/test-utils";
import ForgotPasswordPage from "./ForgotPasswordPage.vue";
import { useForgotPassword } from "../requests/auth";
import { router } from "../router";
import { VAlert } from "vuetify/components";
import { ref } from "vue";
// Mock the auth requests

vi.mock("../requests/auth.ts", async (importOriginal) => {
  const original = await importOriginal<typeof import("../requests/auth")>();
  return {
    ...original,
    useForgotPassword: vi.fn(),
  };
});

withResizeObserverMock(() => {
  describe("ForgotPasswordPage", () => {
    // Helper functions for element selection
    const getEmailInput = (wrapper: VueWrapper) => {
      const emailInput = wrapper.find("[placeholder='Email address']");
      expect(emailInput.exists()).toBe(true);
      return emailInput;
    };

    const getSubmitButton = (wrapper: VueWrapper) => {
      const button = wrapper.find("button");
      expect(button.exists()).toBe(true);
      return button;
    };

    const getSuccessAlert = (wrapper: VueWrapper) => {
      const alert = wrapper.find(".v-alert--success");
      return alert;
    };

    const getErrorAlert = (wrapper: VueWrapper) => {
      const alerts = wrapper.findAllComponents(VAlert);
      return alerts.find((alert) => alert.props().type === "error");
    };

    const mountComponent = () => {
      return mountWithPlugins(ForgotPasswordPage, {}, { router });
    };

    beforeEach(() => {
      vi.clearAllMocks();
      // Reset the mock implementation
      (useForgotPassword as any).mockReturnValue({
        mutate: vi.fn(),
        isPending: false,
      });
    });

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
      expect(wrapper.text()).toContain("Must be a valid email");

      // Test valid email
      await emailInput.setValue("valid@email.com");
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).not.toContain("Must be a valid email");
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

      // Mock the mutation to simulate loading state
      (useForgotPassword as any).mockReturnValue({
        mutate: vi.fn(),
        isPending: true,
      });

      await emailInput.setValue("valid@email.com");
      await wrapper.vm.$nextTick();

      expect(submitButton.text()).toBe("Sending...");
      expect(emailInput.attributes("disabled")).toBeDefined();
    });

    it("should show success message after successful submission", async () => {
      const wrapper = mountComponent();
      const emailInput = getEmailInput(wrapper);
      const submitButton = getSubmitButton(wrapper);

      // Mock successful mutation
      const mockMutate = vi.fn().mockResolvedValue(undefined);
      (useForgotPassword as any).mockReturnValue({
        mutate: mockMutate,
        isPending: false,
      });

      await emailInput.setValue("valid@email.com");
      await wrapper.vm.$nextTick();
      await submitButton.trigger("click");
      await wrapper.vm.$nextTick();

      const successAlert = getSuccessAlert(wrapper);
      expect(successAlert.exists()).toBe(true);
      expect(successAlert.text()).toContain(
        "If an account exists with this email",
      );
      expect(mockMutate).toHaveBeenCalledWith({ email: "valid@email.com" });
    });

    it("should show error message after failed submission", async () => {
      // Mock failed mutation
      const mockMutate = vi.fn().mockRejectedValue(new Error("API Error"));
      vi.mocked(useForgotPassword).mockReturnValue({
        mutate: mockMutate,
        isPending: ref(false),
        data: ref({ success: false, message: "API Error" }),
        error: ref(null),
        variables: ref({ email: "valid@email.com" }),
        isError: ref(false),
        isSuccess: ref(true),
        isIdle: ref(false),
        status: ref("success"),
        context: ref(null),
        failureCount: ref(0),
        failureReason: ref(null),
        isPaused: ref(false),
        submittedAt: ref(0),
        mutateAsync: vi.fn(),
        reset: vi.fn(),
      });

      const wrapper = mountComponent();
      const emailInput = getEmailInput(wrapper);
      const submitButton = getSubmitButton(wrapper);

      await emailInput.setValue("valid@email.com");
      await wrapper.vm.$nextTick();
      await submitButton.trigger("click");
      await wrapper.vm.$nextTick();

      const errorAlert = getErrorAlert(wrapper);
      expect(errorAlert).toBeDefined();
      expect(errorAlert?.text()).toContain("An error occurred");
      expect(mockMutate).toHaveBeenCalledWith({ email: "valid@email.com" });
    });
  });
});
