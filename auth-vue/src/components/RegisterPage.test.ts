import { describe, it, expect, vi } from "vitest";
import {
  stubGlobals,
  mountWithPlugins,
  setupMockServer,
} from "@saflib/vue-spa-dev/components";
import { type VueWrapper } from "@vue/test-utils";
import { http, HttpResponse } from "msw";
import RegisterPage from "./RegisterPage.vue";
import { router } from "../router";

interface RegisterRequest {
  email: string;
  password: string;
}

// Set up MSW server
const handlers = [
  http.post("/api/auth/register", async ({ request }) => {
    const body = (await request.json()) as RegisterRequest;
    return HttpResponse.json({
      success: true,
      data: {
        token: "mock-token",
        user: {
          id: 1,
          email: body.email,
        },
      },
    });
  }),
];

describe("RegisterPage", () => {
  stubGlobals();
  const server = setupMockServer(handlers);

  // Helper functions for element selection
  const getEmailInput = (wrapper: VueWrapper) => {
    const inputs = wrapper.findAllComponents({ name: "v-text-field" });
    const emailInput = inputs.find(
      (input) => input.props("placeholder") === "Email address",
    );
    expect(emailInput?.exists()).toBe(true);
    return emailInput!;
  };

  const getPasswordInput = (wrapper: VueWrapper) => {
    const inputs = wrapper.findAllComponents({ name: "v-text-field" });
    const passwordInput = inputs.find(
      (input) => input.props("placeholder") === "Enter your password",
    );
    expect(passwordInput?.exists()).toBe(true);
    return passwordInput!;
  };

  const getConfirmPasswordInput = (wrapper: VueWrapper) => {
    const inputs = wrapper.findAllComponents({ name: "v-text-field" });
    const confirmPasswordInput = inputs.find(
      (input) => input.props("placeholder") === "Confirm your password",
    );
    expect(confirmPasswordInput?.exists()).toBe(true);
    return confirmPasswordInput!;
  };

  const getRegisterButton = (wrapper: VueWrapper) => {
    const buttons = wrapper.findAllComponents({ name: "v-btn" });
    const registerButton = buttons.find(
      (button) => button.text() === "Register",
    );
    expect(registerButton?.exists()).toBe(true);
    return registerButton!;
  };

  const mountComponent = () => {
    return mountWithPlugins(RegisterPage, {}, { router });
  };

  const fillForm = async (
    wrapper: VueWrapper,
    {
      email,
      password,
      confirmPassword,
    }: { email: string; password: string; confirmPassword: string },
  ) => {
    await getEmailInput(wrapper).setValue(email);
    await getPasswordInput(wrapper).setValue(password);
    await getConfirmPasswordInput(wrapper).setValue(confirmPassword);
    await vi.waitFor(() =>
      expect(wrapper.text()).not.toContain("Email must be valid"),
    );
  };

  it("should render the registration form", () => {
    const wrapper = mountComponent();
    expect(getEmailInput(wrapper).exists()).toBe(true);
    expect(getPasswordInput(wrapper).exists()).toBe(true);
    expect(getConfirmPasswordInput(wrapper).exists()).toBe(true);
    expect(getRegisterButton(wrapper).exists()).toBe(true);
  });

  it("should validate email format", async () => {
    const wrapper = mountComponent();
    const emailInput = getEmailInput(wrapper);

    await emailInput.setValue("invalid-email");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Email must be valid");

    await emailInput.setValue("valid@email.com");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).not.toContain("Email must be valid");
  });

  it("should validate password requirements", async () => {
    const wrapper = mountComponent();
    const passwordInput = getPasswordInput(wrapper);

    await passwordInput.setValue("short");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("Password must be at least");

    await passwordInput.setValue("validpassword123");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).not.toContain("Password must be at least");
  });

  it("should validate password confirmation match", async () => {
    const wrapper = mountComponent();

    await fillForm(wrapper, {
      email: "test@example.com",
      password: "validpassword123",
      confirmPassword: "differentpassword",
    });

    expect(wrapper.text()).toContain("Passwords must match");

    await getConfirmPasswordInput(wrapper).setValue("validpassword123");
    await wrapper.vm.$nextTick();
    expect(wrapper.text()).not.toContain("Passwords must match");
  });

  it("should disable register button when form is invalid", async () => {
    const wrapper = mountComponent();
    const registerButton = getRegisterButton(wrapper);

    // Initially disabled
    expect(registerButton.attributes("disabled")).toBe("");

    // After valid input
    await fillForm(wrapper, {
      email: "valid@email.com",
      password: "validpassword123",
      confirmPassword: "validpassword123",
    });
    expect(registerButton.attributes("disabled")).toBeUndefined();
  });

  it("should handle successful registration", async () => {
    const wrapper = mountComponent();
    const registerButton = getRegisterButton(wrapper);

    await fillForm(wrapper, {
      email: "test@example.com",
      password: "validpassword123",
      confirmPassword: "validpassword123",
    });

    await registerButton.trigger("click");
    await wrapper.vm.$nextTick();

    // Wait for the API request to complete
    await vi.waitFor(() => expect(location.href).toBe("/app/"));
  });
});
