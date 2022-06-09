import { Divider } from "./Divider";

export default {
  title: "Divider",
  component: Divider,
};

export const Default_Light = () => (
  <html data-theme="light">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <Divider text="OR" />
    </div>
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <Divider text="OR" />
    </div>
  </html>
);
