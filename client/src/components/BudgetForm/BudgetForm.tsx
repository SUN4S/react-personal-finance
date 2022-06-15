import "./BudgetForm.scss";

import { SubmitHandler, useForm } from "react-hook-form";

import { BudgetFormState } from "../../models/budget";
import { Button } from "../Button/Button";
import { FormInput } from "../FormInput/FormInput";

// Component to render a small form inside budget container
export const BudgetForm = (props: {
  submitFunction: Function;
  isLoading: boolean;
}) => {
  // Getting react-hook-forms functions that are needed
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormState>();

  // Function fired button click
  const onSubmit: SubmitHandler<BudgetFormState> = async (data) => {
    await props.submitFunction(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="budgetForm">
      <div className="budgetInput">
        <FormInput
          labelFor="budget"
          name="budget"
          required
          type="number"
          placeholder="Ex.: 160, 96.43"
          register={register}
        />
        {errors.budget && <span>This field is required</span>}
      </div>

      <Button
        type="submit"
        class="primaryBtn"
        text="Add"
        loading={props.isLoading}
      />
    </form>
  );
};
