import "./RegisterForm.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../../components/Button/Button";
import { FormInput } from "../../components/FormInput/FormInput";
import { RegisterInputs } from "../../models/user";
import { notification } from "../../features/NotificationSlice";
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
    <form onSubmit={handleSubmit(onSubmit)} id="registrationForm">
      <FormInput
        labelFor="username"
        label="Username:"
        inputTestId="username"
        required
        type="text"
        placeholder="Ex.: John123, user68"
        register={register}
        name="username"
      />
      {errors.username && (
        <span data-testid="usernameMissing">This field is required</span>
      )}

      <FormInput
        labelFor="email"
        label="Email:"
        inputTestId="email"
        required
        type="email"
        placeholder="Ex.: randomemail@mail.com"
        register={register}
        name="email"
      />
      {errors.email && (
        <span data-testid="emailMissing">This field is required</span>
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

      <div className="reqContainer">
        <ul>
          <li>Length 8-64 Characters</li>
          <li>At least one Uppercase Letter</li>
          <li>At least one Number</li>
          <li>At least one Special Symbol</li>
        </ul>
      </div>

      <Button
        type="submit"
        class="primaryBtn"
        text="Register"
        testId="register"
        loading={isLoading}
        disabled={isLoading}
      />
    </form>
  );
};
