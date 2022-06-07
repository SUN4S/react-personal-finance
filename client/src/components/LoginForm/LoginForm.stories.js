import { LoginForm } from "./LoginForm";

export default {
  title: "Login Form",
  component: LoginForm,
};

export const Default_Light = () => (
  <html data-theme="light">
    <LoginForm />
  </html>
);
export const Default_Dark = () => (
  <html data-theme="dark">
    <LoginForm />
  </html>
);
