import { type Component } from "vue";

declare module "*.vue" {
  const src: Component;
  export default src;
}
