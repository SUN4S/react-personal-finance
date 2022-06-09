import "./BudgetForm.scss";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCurrentBudgetQuery,
  usePostBudgetMutation,
} from "../../services/budget";

import { BudgetFormState } from "../../models/budget";
import { Button } from "../Button/Button";
import { notification } from "../../features/notification/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";

export const BudgetForm = () => {
  const [postBudget, { isLoading }] = usePostBudgetMutation();
  const budgetQuery = useCurrentBudgetQuery({});

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormState>();

  const onSubmit: SubmitHandler<BudgetFormState> = async (data) => {
    // Posting new budget
    const response: any = await postBudget(data);
    if (response.data) {
      // If request goes through
      // Dispatch Redux Toolkit function to generate notification
      dispatch(
        notification({
          title: "Add Budget",
          message: response.data.msg,
          type: "success",
        })
      );
      budgetQuery.refetch();
      // After successful registration, redirect user to dashboard
    } else if (response.error) {
      // If request fails
      // Dispatch Redux Toolkit function to generate notification
      dispatch(
        notification({
          title: "Add Budget",
          message: response.error.data.msg,
          type: "danger",
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="budgetForm">
      <label htmlFor="budget">
        <input
          type="number"
          {...register("budget", { required: true })}
          placeholder="ex: 160, 98.22"
        />
        {errors.budget && <span>This field is required</span>}
      </label>
      <Button type="submit" class="primaryBtn" text="Add" loading={isLoading} />
    </form>
  );
};
