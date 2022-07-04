import "./PasswordChangeForm.scss";

import { Button } from "../../components/Button/Button";
import { ChangePasswordFormInput } from "../../models/user";
import { FormInput } from "../../components/FormInput/FormInput";
import { notification } from "../../features/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";
import { useChangePasswordMutation } from "../../services/user";
import { useForm } from "react-hook-form";

export const PasswordChangeForm = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormInput>();

  // On submit, sending request to authenticate user
  const onSubmit = async (data: ChangePasswordFormInput) => {
    if (data.newPassword !== data.newPasswordRepeat) {
      dispatch(
        notification({
          title: "Change Password",
          message: "Repeated password does not match",
          type: "danger",
        })
      );
      return;
    } else {
      // Creating a password object
      const passwordObject = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };

      // Calling Redux Toolkit api to authenticate user
      const response: any = await changePassword(passwordObject);
      if (response.data) {
        // If response goes throught
        // Dispatch Redux Toolkit function to generate notification
        dispatch(
          notification({
            title: "Change Password",
            message: response.data.msg,
            type: "success",
          })
        );
      } else if (response.error) {
        // If response fails
        // Dispatch Redux Toolkit function to generate notification
        dispatch(
          notification({
            title: "Change Password",
            message: response.error.data.msg,
            type: "danger",
          })
        );
      }
    }
  };

  return (
    <div id="passwordChangeContainer">
      <h3>Change Password</h3>
      <form onSubmit={handleSubmit(onSubmit)} id="passwordChangeForm">
        <FormInput
          labelFor="oldPassword"
          label="Current Password:"
          inputTestId="oldPassword"
          required
          type="password"
          register={register}
          name="oldPassword"
        />
        {errors.oldPassword && (
          <span data-testid="oldPasswordMissing">This field is required</span>
        )}

        <FormInput
          labelFor="newPassword"
          label="New Password:"
          inputTestId="newPassword"
          required
          type="password"
          register={register}
          name="newPassword"
        />
        {errors.newPassword && (
          <span data-testid="newPasswordMissing">This field is required</span>
        )}
        <div className="reqContainer">
          <ul>
            <li>Length 8-64</li>
            <li>At least one Uppercase Letter</li>
            <li>At least one Number</li>
            <li>At least one Special Symbol</li>
          </ul>
        </div>

        <FormInput
          labelFor="newPasswordRepeat"
          label="Repeat New Password:"
          inputTestId="newPasswordRepeat"
          required
          type="password"
          register={register}
          name="newPasswordRepeat"
        />
        {errors.newPassword && (
          <span data-testid="newPasswordRepeatMissing">
            This field is required
          </span>
        )}

        <Button
          type="submit"
          class="primaryBtn"
          text="Change Password"
          testId="changePassword"
          loading={isLoading}
          disabled={isLoading}
        />
      </form>
    </div>
  );
};
