import "./RegisterForm.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../../components/Button/Button";
import { FormInput } from "../../components/FormInput/FormInput";
import { RegisterInputs } from "../../models/user";

export const RegisterForm = (props: {
  submitFunction: Function;
  isLoading: boolean;
}) => {
  // Getting React-hook-forms needed functions
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  // on submit Send request to create new user
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    await props.submitFunction(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="registrationForm">
      <FormInput
        labelFor="username"
        label="Username:"
        required
        type="text"
        placeholder="Ex.: John123, user68"
        register={register}
        name="username"
      />
      {errors.username && <span>This field is required</span>}

      <FormInput
        labelFor="email"
        label="Email:"
        required
        type="email"
        placeholder="Ex.: randomemail@mail.com"
        register={register}
        name="email"
      />
      {errors.email && <span>This field is required</span>}

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

      <div className="reqContainer">
        <ul>
          <li>At least one Uppercase Letter</li>
          <li>At least one Number</li>
          <li>At least one Special Symbol</li>
        </ul>
      </div>

      <Button
        type="submit"
        class="primaryBtn"
        text="Register"
        loading={props.isLoading}
        disabled={props.isLoading}
      />
    </form>
  );
};
