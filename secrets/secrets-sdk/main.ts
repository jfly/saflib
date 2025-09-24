import App from "./App.vue";
import { createVueApp, setClientName } from "@saflib/vue";
import "@saflib/vue/components";
import { secretsSdkStrings } from "./strings";
import { setupWorker } from "msw/browser";
import { secretsServiceFakeHandlers } from "./fakes.ts";
import { http, bypass } from "msw";

export const main = () => {
  const server = setupWorker(
    ...secretsServiceFakeHandlers,
    http.get("*", ({ request }) => {
      const originalUrl = new URL(request.url);
      const proxyRequest = new Request(originalUrl, {
        headers: request.headers,
      });
      return fetch(bypass(proxyRequest));
    }),
  );
  server.start({ onUnhandledRequest: "error" });
  setClientName("root");
  createVueApp(App, {
    i18nMessages: {
      ...secretsSdkStrings,
    },
  });
};

main();
