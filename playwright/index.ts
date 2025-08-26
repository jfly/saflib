import type { Page } from "@playwright/test";
export * from "./screenshots.ts";
import { convertI18NInterpolationToRegex } from "@saflib/utils";

/**
 * Dimensions for a small Android device, for E2E testing the mobile experience.
 */
export const tightAndroidViewport = { width: 430, height: 700 };

/**
 * Convenience function for generating a unique user ID for tests.
 */
export const getUniqueId = () => {
  return Math.random().toString(36).substring(2, 15);
};

/**
 * Convenience function for generating a unique email for tests.
 */
export const getUniqueEmail = () => {
  return `test${getUniqueId()}@gmail.com`;
};

/**
 * Strings that are exported by client packages will be in objects like these. Their values match valid HTML attributes.
 */
export interface ElementStringObject {
  role?: "button" | "combobox" | "option" | "heading" | "link";
  text?: string;
  "data-testid"?: string;
  placeholder?: string;
  "aria-label"?: string;
  label?: string;
}

/**
 * A string for an HTML element can either be a plain string, or an object with valid HTML attributes.
 */
export type ElementString = string | ElementStringObject;

/**
 * Convenience function for getting an element by an ElementString. Use this as much as possible, as it really helps avoid spending a bunch of time debugging string matching issues.
 */
export const getByString = (page: Page, stringThing: ElementString) => {
  if (typeof stringThing === "string") {
    return page.getByText(convertI18NInterpolationToRegex(stringThing), {
      exact: true,
    });
  }
  if (stringThing["aria-label"]) {
    return page.getByLabel(stringThing["aria-label"], { exact: true });
  }
  if (stringThing.label) {
    return page.getByLabel(stringThing.label, { exact: true });
  }
  if (stringThing["data-testid"]) {
    return page.getByTestId(stringThing["data-testid"]);
  }
  if (stringThing.placeholder) {
    return page.getByPlaceholder(stringThing.placeholder, { exact: true });
  }
  if (stringThing["text"]) {
    return page.getByText(stringThing["text"], { exact: true });
  }
  throw new Error(`Invalid string thing: ${JSON.stringify(stringThing)}`);
};

/**
 * The Vuetify select component is a bit tricky with Playwright, so this is a convenience function for choosing an option.
 */
export const chooseVuetifySelectOption = async (
  page: Page,
  label: string,
  option: string,
) => {
  await page.getByRole("combobox").filter({ hasText: label }).click();
  await page.getByRole("option", { name: option }).click();
};
