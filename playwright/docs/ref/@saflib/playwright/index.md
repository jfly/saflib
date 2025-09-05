[**@saflib/playwright**](../../index.md)

---

# @saflib/playwright

Utilities for Playwright tests.

## Interfaces

| Interface                                            | Description                                  |
| ---------------------------------------------------- | -------------------------------------------- |
| [ScreenshotOptions](interfaces/ScreenshotOptions.md) | Options for the `attachScreenshot` function. |

## Variables

| Variable                                                  | Description                                                                   |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [tightAndroidViewport](variables/tightAndroidViewport.md) | Dimensions for a small Android device, for E2E testing the mobile experience. |

## Functions

| Function                                                            | Description                                                                                                                                                                        |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [attachScreenshot](functions/attachScreenshot.md)                   | Attach a screenshot to the test report. Use throughout tests to create a visual record of the user journey for easier review.                                                      |
| [chooseVuetifySelectOption](functions/chooseVuetifySelectOption.md) | The Vuetify select component is a bit tricky with Playwright, so this is a convenience function for choosing an option.                                                            |
| [cleanScreenshots](functions/cleanScreenshots.md)                   | Clean up screenshots from the previous test run. Call this at the beginning of your test.                                                                                          |
| [getByString](functions/getByString.md)                             | Convenience function for getting an element by an ElementString. Use this as much as possible, as it really helps avoid spending a bunch of time debugging string matching issues. |
| [getUniqueEmail](functions/getUniqueEmail.md)                       | Convenience function for generating a unique email for tests.                                                                                                                      |
| [getUniqueId](functions/getUniqueId.md)                             | Convenience function for generating a unique user ID for tests.                                                                                                                    |
