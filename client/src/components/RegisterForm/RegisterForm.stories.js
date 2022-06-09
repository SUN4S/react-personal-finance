import { RegisterForm } from "./RegisterForm";

export default {
  title: "Registration Form",
  component: RegisterForm,
};

export const Default_Light = () => (
  <html data-theme="light">
    <div
      style={{
        width: "400px",
        padding: "8px",
        backgroundColor: "var(--page-bg)",
      }}
    >
      <RegisterForm />
    </div>
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <div
      style={{
        width: "400px",
        padding: "8px",
        backgroundColor: "var(--page-bg)",
      }}
    >
      <RegisterForm />
    </div>
  </html>
);
