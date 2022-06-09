import { BudgetForm } from "./BudgetForm";

export default {
  title: "Budget Chart Form",
  component: BudgetForm,
};

export const Default_Light = () => (
  <html data-theme="light">
    <div
      style={{
        width: "400px",
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <BudgetForm />
    </div>
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <div
      style={{
        width: "400px",
        backgroundColor: "var(--sidebar-bg)",
        padding: "8px",
      }}
    >
      <BudgetForm />
    </div>
  </html>
);
