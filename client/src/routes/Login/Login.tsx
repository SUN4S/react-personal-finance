import "./Login.scss";

import { LoginForm } from "../../layout/LoginForm/LoginForm";
import { LoginInputs } from "../../models/user";
import Logo from "../../resources/icons/Logo.svg";
import { notification } from "../../features/notification/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useLoginMutation } from "../../services/user";
import { useTheme } from "../../hooks/useTheme";

// Login display
export const Login = () => {
  const { currentTheme } = useTheme();

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();

  // On submit, sending request to authenticate user
  const onSubmit = async (data: LoginInputs) => {
    // Creating a user object
    const user = {
      username: data.username,
      password: data.password,
    };

    // Calling Redux Toolkit api to authenticate user
    const response: any = await login(user);
    if (response.data) {
      // If response goes throught
      // Dispatch Redux Toolkit function to generate notification
      dispatch(
        notification({
          title: "Login Atempt",
          message: response.data.msg,
          type: "success",
        })
      );
    } else if (response.error) {
      // If response fails
      // Dispatch Redux Toolkit function to generate notification
      dispatch(
        notification({
          title: "Login Atempt",
          message: "Wrong Username or Password",
          type: "danger",
        })
      );
    }
  };

  return (
    <section className="login">
      <div className="loginContainer">
        <img src={Logo} alt="Logo" />
        <h1 className="loginHeader">Login</h1>
        <div className="loginDesc">Please enter your Username and Password</div>
        <LoginForm submitFunction={onSubmit} isLoading={isLoading} />
      </div>
    </section>
  );
};
