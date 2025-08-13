import { expect } from "vitest";
import { type VueWrapper } from "@vue/test-utils";

interface ElementStringObject {
  placeholder?: string;
  text?: string;
  "data-testid"?: string;
  label?: string;
}

const regexCharacters = ["(", ")", ".", "*", "+", "?", "^", "$", "|", "/"];

const convertI18NInterpolationToRegex = (str: string) => {
  if (str.includes("{")) {
    let escapedStr = str;
    for (const char of regexCharacters) {
      escapedStr = escapedStr.replace(char, `\\${char}`);
    }
    return new RegExp(escapedStr.replace(/\{(.*?)\}/g, ".*"));
  }
  return str;
};

// Store strings for Vue components in Record<string, ElementString>
// Then you can v-bind them to the component, and also use them in tests for reliable element selection
// These objects can also be used in playwright tests, and eventually for i18n.
type ElementString = string | ElementStringObject;

export const getElementByString = (
  wrapper: VueWrapper,
  stringObj: ElementString,
) => {
  if (typeof stringObj === "string" || stringObj["text"]) {
    const elements = wrapper.findAll("*");
    const text: string =
      typeof stringObj === "string" ? stringObj : stringObj["text"]!;

    if (text.includes("{")) {
      // handle i18n interpolation with regex
      const r = convertI18NInterpolationToRegex(text);
      const element = elements.find((el) => {
        return el.text().match(r);
      });
      if (element) {
        return element;
      }
      throw new Error(`Element not found: ${text}`);
    }

    const element = elements.find((el) => {
      return el.text() === text;
    });
    expect(element?.exists()).toBe(true);
    return element!;
  }

  if (stringObj.label) {
    const elements = wrapper.findAll("label");
    const element = elements.find((el) => el.text() === stringObj.label);
    expect(element?.exists()).toBe(true);
    return element!;
  }

  if (stringObj.placeholder) {
    const elements = wrapper.findAll(
      `[placeholder="${stringObj.placeholder}"]`,
    );
    expect(elements.length).toBe(1);
    return elements[0];
  }

  if (stringObj["data-testid"]) {
    const elements = wrapper.findAll(
      `[data-testid="${stringObj["data-testid"]}"]`,
    );
    expect(elements.length).toBe(1);
    return elements[0];
  }

  throw new Error(`Unsupported string object: ${JSON.stringify(stringObj)}`);
};
