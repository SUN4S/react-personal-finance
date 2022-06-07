import { Sidebar } from "./Sidebar";

export default {
  title: "Sidebar",
  component: Sidebar,
};

export const Default_Light = () => (
  <html data-theme="light">
    <Sidebar />
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <Sidebar />
  </html>
);
