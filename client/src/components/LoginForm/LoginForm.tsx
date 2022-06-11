import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import { Link } from "react-router-dom";
import { LoginInputs } from "../../models/user";
import { notification } from "../../features/notification/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useLoginMutation } from "../../services/user";

export const LoginForm = () => {
  // Redux Toolkit api function used to send request to back-end
  const [login, { isLoading }] = useLoginMutation();
  // Redux Toolkit function used to dispatch(call) functions
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">
        Username:
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="ex: john123, etc."
        />
        {errors.username && <span>This field is required</span>}
      </label>

      <label htmlFor="password">
        Password:
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="ex: password123, etc."
        />
        {errors.password && <span>This field is required</span>}
      </label>

      <Button
        type="submit"
        class="secondaryBtn"
        text="Login"
        loading={isLoading}
        disabled={isLoading}
      />

      <Divider text="OR" />

      <Link to="/register">
        <Button type="button" class="grayBtn" text="Register" />
      </Link>
    </form>
  );
};
