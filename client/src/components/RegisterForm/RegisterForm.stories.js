import { RegisterForm } from "./RegisterForm";

export default {
  title: "Registration Form",
  component: RegisterForm,
};

export const Default_Light = () => (
  <html data-theme="light">
    <RegisterForm />
  </html>
);

export const Default_Dark = () => (
  <html data-theme="dark">
    <RegisterForm />
  </html>
);
