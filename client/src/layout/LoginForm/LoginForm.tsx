import "./LoginForm.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../../components/Button/Button";
import { Divider } from "../../components/Divider/Divider";
import { FormInput } from "../../components/FormInput/FormInput";
import { Link } from "react-router-dom";
import { LoginInputs } from "../../models/user";
import { notification } from "../../features/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useLoginMutation } from "../../services/user";

export const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();
  // Redux-hook-form selecting functions to use
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  // On submit, sending request to authenticate user
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
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
    <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
      <FormInput
        labelFor="username"
        label="Username:"
        inputTestId="username"
        required
        type="text"
        placeholder="Ex.: John123, user69"
        register={register}
        name="username"
      />
      {errors.username && (
        <span data-testid="usernameMissing">This field is required</span>
      )}

      <FormInput
        labelFor="password"
        label="Password:"
        inputTestId="password"
        required
        type="password"
        placeholder="Ex.: password123, idontknow"
        register={register}
        name="password"
      />
      {errors.password && (
        <span data-testid="passwordMissing">This field is required</span>
      )}

      <Button
        type="submit"
        class="primaryBtn"
        text="Login"
        testId="login"
        loading={isLoading}
        disabled={isLoading}
      />

      <Divider text="OR" />

      <Link to="/register">
        <Button
          type="button"
          class="grayBtn"
          text="Register"
          testId="register"
        />
      </Link>
    </form>
  );
};
