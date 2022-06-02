import "./ExpenseList.scss";

import { ExpenseListItem } from "../ExpenseListItem/ExpenseListItem";
import { ExpenseState } from "../../models/expenses";
import React from "react";
import { RootState } from "../../app/store";
import { useCurrentMonthQuery } from "../../services/expenses";
import { useSelector } from "react-redux";

export const ExpenseList = () => {
  // Redux Toolkit api Request to get expense array
  const expensesQuery = useCurrentMonthQuery({});
  const expenses = useSelector((state: RootState) => state.expenses.data);

  return (
    <div className="listBody">
      {expensesQuery.isSuccess &&
        expenses.map((item: ExpenseState) => {
          return <ExpenseListItem expenseData={item} key={item._id} />;
        })}
    </div>
  );
};
