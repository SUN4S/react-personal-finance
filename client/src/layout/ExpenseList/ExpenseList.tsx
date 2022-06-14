import "./ExpenseList.scss";

import { ExpenseListItem } from "../../components/ExpenseListItem/ExpenseListItem";
import { ExpenseState } from "../../models/expenses";
import { RootState } from "../../app/store";
import { useCurrentExpenseMonthQuery } from "../../services/expenses";
import { useSelector } from "react-redux";

export const ExpenseList = () => {
  const currentExpensesQuery = useCurrentExpenseMonthQuery({});
  const expenses = useSelector((state: RootState) => state.expenses.data);

  return (
    <div className="listBody">
      {currentExpensesQuery.isSuccess ? (
        expenses.map((item: ExpenseState) => {
          return <ExpenseListItem expenseData={item} key={item._id} />;
        })
      ) : (
        <h2>No Data Available</h2>
      )}
    </div>
  );
};
