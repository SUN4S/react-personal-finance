import { Header } from "./Header";

export default {
  title: "Header",
  component: Header,
};

export const Default_Light = () => (
  <html data-theme="light">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
      }}
    >
      <Header />
    </div>
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
      }}
    >
      <Header />
    </div>
  </html>
);
