import "./LoginForm.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../../components/Button/Button";
import { Divider } from "../../components/Divider/Divider";
import { FormInput } from "../../components/FormInput/FormInput";
import { Link } from "react-router-dom";
import { LoginInputs } from "../../models/user";

export const LoginForm = (props: {
  submitFunction: Function;
  isLoading: boolean;
}) => {
  // Redux-hook-form selecting functions to use
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  // On submit, sending request to authenticate user
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    await props.submitFunction(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="loginForm">
      <FormInput
        labelFor="username"
        label="Username:"
        required
        type="text"
        placeholder="Ex.: John123, user69"
        register={register}
        name="username"
      />
      {errors.username && <span>This field is required</span>}

      <FormInput
        labelFor="password"
        label="Password:"
        required
        type="password"
        placeholder="Ex.: password123, idontknow"
        register={register}
        name="password"
      />
      {errors.password && <span>This field is required</span>}

      <Button
        type="submit"
        class="primaryBtn"
        text="Login"
        loading={props.isLoading}
        disabled={props.isLoading}
      />

      <Divider text="OR" />

      <Link to="/register">
        <Button type="button" class="grayBtn" text="Register" />
      </Link>
    </form>
  );
};
