import "./BudgetChartForm.scss";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCurrentBudgetQuery,
  useEditBudgetMutation,
  usePostBudgetMutation,
} from "../../services/budget";

import { BudgetFormState } from "../../models/budget";
import { Button } from "../../components/Button/Button";
import { FormInput } from "../../components/FormInput/FormInput";
import { notification } from "../../features/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";

// Component to render a small form inside budget container
export const BudgetChartForm = (props: {
  editable: boolean;
  closeFunction: Function;
}) => {
  // Using RTK mutation to handle server POST/PUT requests
  const [postBudget, postState] = usePostBudgetMutation();
  const [editBudget, editState] = useEditBudgetMutation();
  // RTK query to get data from server
  const budgetQuery = useCurrentBudgetQuery({ skip: true });

  // RTK function to dispatch actions to reducers
  const dispatch = useAppDispatch();

  // Getting react-hook-forms functions that are needed
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormState>();

  // Function fired after button click
  const onSubmit: SubmitHandler<BudgetFormState> = async (data) => {
    if (props.editable) {
      // editing Existing budget
      const response: any = await editBudget(data);
      if (response.data) {
        // If request goes through
        // Dispatch Redux Toolkit function to generate notification
        dispatch(
          notification({
            title: "Edit Budget",
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
            title: "Edit Budget",
            message: response.error.data.msg,
            type: "danger",
          })
        );
      }
      props.closeFunction();
    } else {
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
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="budgetForm">
      <div className="budgetFormContainer">
        <FormInput
          labelFor="budget"
          name="budget"
          inputTestId="budget"
          required
          type="number"
          placeholder="Ex.: 160, 96.43"
          register={register}
        />
        <Button
          type="submit"
          class="primaryBtn"
          text="Add"
          testId="addBudget"
          loading={editState.isLoading || postState.isLoading}
        />
      </div>
      {errors.budget && <span>This field is required</span>}
    </form>
  );
};
