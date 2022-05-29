import "./register.scss";

import Logo from "../../resources/icons/Logo.svg";
import { RegisterForm } from "./RegisterForm";

export const Register = () => {
  return (
    <section className="register">
      <div className="registerContainer">
        <img src={Logo} alt="Logo" />
        <h1 className="registerHeader">Register</h1>
        <div className="loginDesc">Fill out form to Register</div>
        <RegisterForm />
      </div>
    </section>
  );
};
