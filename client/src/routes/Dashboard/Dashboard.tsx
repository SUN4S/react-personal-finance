import "./Dashboard.scss";

import { ChartContainer } from "../../components/ChartContainer/ChartContainer";
import { ExpenseList } from "../../components/ExpenseList/ExpenseList";
import { RootState } from "../../app/store";
import { useCurrentBudgetQuery } from "../../services/budget";
import { useCurrentExpenseMonthQuery } from "../../services/expenses";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  // Redux Toolkit api Request to get expense array
  const currentExpensesQuery = useCurrentExpenseMonthQuery({});
  const budgetQuery = useCurrentBudgetQuery({});

  const expenses = useSelector((state: RootState) => state.expenses.data);

  return (
    <>
      <section className="dashboard">
        {/* Currentl Chart container is a placeholder */}
        <ChartContainer
          budgetData={budgetQuery.data}
          expenseData={currentExpensesQuery.data}
          budgetIsFetching={budgetQuery.isFetching}
          budgetIsSuccess={budgetQuery.isSuccess}
          expenseIsFetching={currentExpensesQuery.isFetching}
          expenseIsSuccess={currentExpensesQuery.isSuccess}
        />
        <div className="expenseList">
          <div className="listHeader">
            <div className="expenseListHeaderDate">Date</div>
            <div className="expenseListHeaderCategory">Category</div>
            <div className="expenseListHeaderAmount">Amount</div>
            <div className="expenseListHeaderDescription">Description</div>
            <div className="expenseListHeaderTags">Tags</div>
            <div className="expenseListHeaderControls">Edit</div>
          </div>
          {/* Rendering a list of expense items */}
          <div className="listBody">
            {currentExpensesQuery.isSuccess ? (
              <ExpenseList data={expenses} />
            ) : (
              <h2>No Data Available</h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
