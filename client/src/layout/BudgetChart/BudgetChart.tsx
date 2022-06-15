import "./BudgetChart.scss";

import {
  useCurrentBudgetQuery,
  usePostBudgetMutation,
} from "../../services/budget";

import { BudgetChartProps } from "../../models/chart";
import { BudgetForm } from "../../components/BudgetForm/BudgetForm";
import { DoughnutContainer } from "../../components/BudgetChartDoughnut/BudgetChartDoughnut";
import { LoadingBox } from "../../components/LoadingBox/LoadingBox";
import { notification } from "../../features/notification/NotificationSlice";
import { useAppDispatch } from "../../app/hooks";

// Component to render budgetChart
export const BudgetChart = ({
  budgetData,
  expenseData,
  budgetIsFetching,
  budgetIsSuccess,
  expenseIsFetching,
  expenseIsSuccess,
}: BudgetChartProps) => {
  // Using RTK mutation to handle server requests
  const [postBudget, { isLoading }] = usePostBudgetMutation();
  // RTK query to get data from server
  const budgetQuery = useCurrentBudgetQuery({ skip: true });

  // RTK function to dispatch actions to reducers
  const dispatch = useAppDispatch();

  const onSubmit = async (props: { data: number }) => {
    // Posting new budget
    const response: any = await postBudget({ budget: props.data });
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
    <div className="chart">
      <div className="chartHeader">
        <h3>Budget</h3>
      </div>
      <div className="chartBody">
        {budgetIsFetching || expenseIsFetching ? (
          <LoadingBox size="xl" />
        ) : budgetData &&
          budgetData.length > 0 &&
          budgetIsSuccess &&
          expenseIsSuccess ? (
          <DoughnutContainer
            budgetData={budgetData[0].budget}
            expenseData={expenseData}
          />
        ) : (
          <BudgetForm submitFunction={onSubmit} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};
