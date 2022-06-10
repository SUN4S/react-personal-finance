import { ChartError } from "./ChartError";

export default {
  title: "Chart Error",
  component: ChartError,
};

export const Default_Light = () => (
  <html data-theme="light">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
        width: "400px",
      }}
    >
      <ChartError title="no Data" />
    </div>
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
        width: "400px",
      }}
    >
      <ChartError title="no Data" />
    </div>
  </html>
);
