import "./Dashboard.scss";

import { ChartContainer } from "../../components/ChartContainer/ChartContainer";
import { ExpenseList } from "../../components/ExpenseList/ExpenseList";
import { RootState } from "../../app/store";
import { useCurrentExpenseMonthQuery } from "../../services/expenses";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  // Redux Toolkit api Request to get expense array
  const expensesQuery = useCurrentExpenseMonthQuery({});
  const expenses = useSelector((state: RootState) => state.expenses.data);

  return (
    <>
      <section className="dashboard">
        {/* Currentl Chart container is a placeholder */}
        <ChartContainer />
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
            {expensesQuery.isSuccess ? (
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
