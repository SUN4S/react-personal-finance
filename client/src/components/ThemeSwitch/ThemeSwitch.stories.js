import { ThemeSwitch } from "./ThemeSwitch";

export default {
  title: "Theme Switch",
  component: ThemeSwitch,
};

export const Default_Light = () => (
  <html data-theme="light">
    <ThemeSwitch />
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <ThemeSwitch />
  </html>
);
