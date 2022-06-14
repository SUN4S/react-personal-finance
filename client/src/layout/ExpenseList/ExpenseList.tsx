import "./ExpenseList.scss";

import { ExpenseListItem } from "../../components/ExpenseListItem/ExpenseListItem";
import { ExpenseState } from "../../models/expenses";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

export const ExpenseList = () => {
  const expenses = useSelector((state: RootState) => state.expenses.data);

  return (
    <>
      {expenses.map((item: ExpenseState) => {
        return <ExpenseListItem expenseData={item} key={item._id} />;
      })}
    </>
  );
};
