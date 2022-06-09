import { LoadingBox } from "./LoadingBox";

export default {
  title: "Loading Box",
  component: LoadingBox,
};

export const Default_Light = () => (
  <html data-theme="light">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
      }}
    >
      <LoadingBox size="sm" />
      <LoadingBox size="md" />
      <LoadingBox size="lg" />
      <LoadingBox size="xl" />
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
      <LoadingBox size="sm" />
      <LoadingBox size="md" />
      <LoadingBox size="lg" />
      <LoadingBox size="xl" />
    </div>
  </html>
);
