import "./Login.scss";

import { LoginForm } from "../../components/LoginForm/LoginForm";
import Logo from "../../resources/icons/Logo.svg";
import { useTheme } from "../../hooks/useTheme";

// Login display
export const Login = () => {
  const { currentTheme } = useTheme();

  return (
    <section className="login">
      <div className="loginContainer">
        <img src={Logo} alt="Logo" />
        <h1 className="loginHeader">Login</h1>
        <div className="loginDesc">Please enter your Username and Password</div>
        <LoginForm />
      </div>
    </section>
  );
};
