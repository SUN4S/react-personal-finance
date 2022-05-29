import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import { Link } from "react-router-dom";
import { LoginInputs } from "../../models/user";
import { notification } from "../../features/notification/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useIsLoggedInQuery } from "../../services/user";
import { useLoginMutation } from "../../services/user";

export const LoginForm = () => {
  const loggedInQuery = useIsLoggedInQuery({
    skip: true,
  });
  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const user = {
      username: data.username,
      password: data.password,
    };

    const response: any = await login(user);
    if (response.data) {
      dispatch(
        notification({
          title: "Login Atempt",
          message: response.data.msg,
          type: "success",
        })
      );
    } else if (response.error) {
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

      {loggedInQuery.isFetching ? (
        <Button type="submit" class="loadingBtn" text="" disabled />
      ) : (
        <Button type="submit" class="secondaryBtn" text="Login" />
      )}
      <Divider />
      <Link to="/register">
        <Button type="button" class="grayBtn" text="Register" />
      </Link>
    </form>
  );
};
