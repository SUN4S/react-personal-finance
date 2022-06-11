import "./RegisterForm.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../Button/Button";
import { RegisterInputs } from "../../models/user";
import { notification } from "../../features/notification/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router";
import { useRegisterUserMutation } from "../../services/user";

export const RegisterForm = () => {
  // Redux Toolkit api function to register user
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  // React Router functions to redirect
  const navigate = useNavigate();
  // Redux Toolkit function to dispach(call) functions
  const dispatch = useAppDispatch();

  // Getting React-hook-forms needed functions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  // on submit Send request to create new user
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="uername">
        Username:
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
        />
        {errors.username && <span>This field is required</span>}
      </label>

      <label htmlFor="email">
        Email:
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
        />
        {errors.email && <span>This field is required</span>}
      </label>

      <label htmlFor="password">
        Password:
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
        />
        {errors.password && <span>This field is required</span>}
      </label>

      <Button
        type="submit"
        class="secondaryBtn"
        text="Register"
        loading={isLoading}
        disabled={isLoading}
      />
    </form>
  );
};
