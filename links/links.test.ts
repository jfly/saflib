import { beforeEach, describe, expect, it } from "vitest";
import { linkToHref } from "./index.ts";
import { typedEnv } from "@saflib/env";
beforeEach(() => {
  globalThis.document = {
    location: { hostname: "subdomain-a.docker.localhost", protocol: "http:" },
  } as unknown as Document;
});

describe("linkToHref", () => {
  it("returns the correct href for a link", () => {
    expect(linkToHref({ subdomain: "test", path: "/" })).toBe(
      "http://test.docker.localhost/",
    );
  });

  it("adds query params to the href", () => {
    expect(
      linkToHref(
        { subdomain: "test", path: "/", params: ["a", "b"] },
        { params: { a: "1", b: "2" } },
      ),
    ).toBe("http://test.docker.localhost/?a=1&b=2");
  });

  it("handles an empty subdomain", () => {
    expect(linkToHref({ subdomain: "", path: "/" })).toBe(
      "http://docker.localhost/",
    );
  });

  it("throws an error if a param is not found in the link", () => {
    expect(() =>
      linkToHref(
        { subdomain: "test", path: "/", params: ["a", "b"] },
        { params: { a: "1", c: "2" } },
      ),
    ).toThrow("Param c not found in link /");
  });

  it("also works on backend with process.env", () => {
    globalThis.document = undefined as unknown as Document;
    typedEnv.DOMAIN = "some.domain";
    typedEnv.PROTOCOL = "https";
    expect(linkToHref({ subdomain: "test", path: "/" })).toBe(
      "https://test.some.domain/",
    );
  });
});
