import "./dashboard.scss";

import { ChartContainer } from "./ChartContainer";
import { ExpenseState } from "../../models/expenses";
import { ListItem } from "./ListItem";
import { RootState } from "../../app/store";
import { useExpensesQuery } from "../../services/expenses";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const expensesQuery = useExpensesQuery({});
  const expenses = useSelector((state: RootState) => state.expenses.data);

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
          <div className="listBody">
            {expensesQuery.isSuccess &&
              expenses.map((item: ExpenseState) => {
                return <ListItem expenseData={item} key={item._id} />;
              })}
          </div>
        </div>
      </section>
    </>
  );
};
