import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import { RegisterInputs } from "../../models/user";
import { notification } from "../../features/notification/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router";
import { useRegisterUserMutation } from "../../services/user";

export const RegisterForm = () => {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const response: any = await registerUser(user);
    console.log(response);
    if (response.data) {
      dispatch(
        notification({
          title: "Register User",
          message: response.data.msg,
          type: "success",
        })
      );
      navigate("/");
    } else if (response.error) {
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

      <Button type="submit" class="secondaryBtn" text="Register" />
    </form>
  );
};
