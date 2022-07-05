import "./RecoveryForm.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../../components/Button/Button";
import { FormInput } from "../../components/FormInput/FormInput";
import { RecoverPasswordInput } from "../../models/user";
import { notification } from "../../features/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useRecoverPasswordMutation } from "../../services/user";

export const RecoveryForm = () => {
  // Redux toolkit mutation to handle login query
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation();

  const dispatch = useAppDispatch();
  // Redux-hook-form selecting functions to use
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoverPasswordInput>();

  // On submit, sending request to authenticate user
  const onSubmit: SubmitHandler<RecoverPasswordInput> = async (data) => {
    // Creating a user object
    const emailObject = {
      email: data.email,
    };

    // Calling Redux Toolkit api to authenticate user
    const response: any = await recoverPassword(emailObject);
    if (response.data) {
      // If response goes throught
      // Dispatch Redux Toolkit function to generate notification
      dispatch(
        notification({
          title: "Recovery Atempt",
          message: response.data.msg,
          type: "success",
        })
      );
    } else if (response.error) {
      // If response fails
      // Dispatch Redux Toolkit function to generate notification
      dispatch(
        notification({
          title: "Recovery Atempt",
          message: response.error.data.msg,
          type: "danger",
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="recoveryForm">
      <FormInput
        labelFor="email"
        label="Recovery Email:"
        inputTestId="email"
        required
        type="email"
        placeholder="Email..."
        register={register}
        name="email"
      />
      {errors.email && (
        <span data-testid="emailMissing">This field is required</span>
      )}

      <Button
        type="submit"
        class="primaryBtn"
        text="Send Email"
        testId="login"
        loading={isLoading}
        disabled={isLoading}
      />
    </form>
  );
};
