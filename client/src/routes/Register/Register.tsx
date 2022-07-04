import "./Register.scss";

import { IconLogo } from "../../resources/icons/IconLogo/IconLogo";
import { RegisterForm } from "../../layout/RegisterForm/RegisterForm";

export const Register = () => {
  return (
    <section className="register">
      <div className="registerContainer">
        <div className="logoContainer">
          <IconLogo />
        </div>
        <h1 className="registerHeader">Register</h1>
        <div className="registerDesc">Fill out form to Register</div>
        <RegisterForm />
      </div>
    </section>
  );
};
