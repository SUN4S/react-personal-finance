import { MobileNav } from "./MobileNav";

export default {
  title: "Mobile Navigation",
  component: MobileNav,
};

export const Default_Light = () => (
  <html data-theme="light">
    <MobileNav />
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <MobileNav />
  </html>
);
