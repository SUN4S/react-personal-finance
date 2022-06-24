import "./Register.scss";

import { IconLogo } from "../../resources/icons/IconLogo/IconLogo";
import { RegisterForm } from "../../layout/RegisterForm/RegisterForm";
import { RegisterInputs } from "../../models/user";
import { notification } from "../../features/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router";
import { useRegisterUserMutation } from "../../services/user";

export const Register = () => {
  // Redux Toolkit api function to register user
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  // React Router functions to redirect
  const navigate = useNavigate();
  // Redux Toolkit function to dispach(call) functions
  const dispatch = useAppDispatch();

  const onSubmit = async (data: RegisterInputs) => {
    // Create new user object
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    // Attempt to create a new user
    const response: any = await registerUser(user);
    if (response.data) {
      // If request goes through
      // Dispatch Redux Toolkit function to generate notification
      dispatch(
        notification({
          title: "Register User",
          message: response.data.msg,
          type: "success",
        })
      );
      // After successful registration, redirect user to dashboard
      navigate("/");
    } else if (response.error) {
      // If request fails
      // Dispatch Redux Toolkit function to generate notification
      dispatch(
        notification({
          title: "Register User",
          message: response.error.data.msg,
          type: "danger",
        })
      );
    }
  };
  return (
    <section className="register">
      <div className="registerContainer">
        <div className="logoContainer">
          <IconLogo />
        </div>
        <h1 className="registerHeader">Register</h1>
        <div className="registerDesc">Fill out form to Register</div>
        <RegisterForm submitFunction={onSubmit} isLoading={isLoading} />
      </div>
    </section>
  );
};
