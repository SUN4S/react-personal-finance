import "./dashboard.scss";

import { ChartContainer } from "../../components/ChartContainer/ChartContainer";
import { ExpenseList } from "../../components/ExpenseList/ExpenseList";

export const Dashboard = () => {
  return (
    <>
      <section className="dashboard">
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
