import { beforeEach, describe, expect, it } from "vitest";
import { linkToHref, linkToProps } from "./index.ts";
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

  it("throws an error if a param is not found in the link", () => {
    expect(() =>
      linkToHref(
        { subdomain: "test", path: "/", params: ["a", "b"] },
        { params: { a: "1", c: "2" } },
      ),
    ).toThrow("Param c not found in link /");
  });
});
describe("linkToProps", () => {
  it("returns href for links to other subdomains, and to for links to the same subdomain", () => {
    expect(linkToProps({ subdomain: "subdomain-a", path: "/" })).toEqual({
      to: "/",
    });
    expect(linkToProps({ subdomain: "subdomain-b", path: "/" })).toEqual({
      href: "http://subdomain-b.docker.localhost/",
    });
  });
});
