import "./Dashboard.scss";

import { ChartContainer } from "../../layout/ChartContainer/ChartContainer";
import { ExpenseList } from "../../layout/ExpenseList/ExpenseList";

export const Dashboard = () => {
  // Redux Toolkit api Request to get expense array
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
          <ExpenseList />
        </div>
      </section>
    </>
  );
};
