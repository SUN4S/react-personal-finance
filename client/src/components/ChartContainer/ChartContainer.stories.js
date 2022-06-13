import { ChartContainer } from "./ChartContainer";

export default {
  title: "Chart Container",
  component: ChartContainer,
};

export const Default_Light = () => (
  <html data-theme="light">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <ChartContainer />
    </div>
  </html>
);

export const Default_Light_No_Data = () => (
  <html data-theme="light">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <ChartContainer />
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
      <ChartContainer />
    </div>
  </html>
);

export const Default_Dark_No_Data = () => (
  <html data-theme="dark">
    <div
      style={{
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <ChartContainer />
    </div>
  </html>
);
