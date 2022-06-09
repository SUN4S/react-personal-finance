import { LoginForm } from "./LoginForm";

export default {
  title: "Login Form",
  component: LoginForm,
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
      <LoginForm />
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
      <LoginForm />
    </div>
  </html>
);
