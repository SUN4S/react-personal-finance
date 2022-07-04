import "./Login.scss";

import { IconLogo } from "../../resources/icons/IconLogo/IconLogo";
import { LoginForm } from "../../layout/LoginForm/LoginForm";
import { useTheme } from "../../hooks/useTheme";

// Login display
export const Login = () => {
  const { currentTheme } = useTheme();

  return (
    <section className="login">
      <div className="loginContainer">
        <div className="logoContainer">
          <IconLogo />
        </div>
        <h1 className="loginHeader">Login</h1>
        <div className="loginDesc">Please enter your Username and Password</div>
        <LoginForm />
      </div>
    </section>
  );
};
