import "./Dashboard.scss";

import {
  sortByAmount,
  sortByCategory,
  sortByDate,
} from "../../features/ExpenseSlice";

import { ChartContainer } from "../../layout/ChartContainer/ChartContainer";
import { ExpenseList } from "../../layout/ExpenseList/ExpenseList";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const Dashboard = () => {
  // States to monitor what type of sorting was used
  const [sortedByDate, setSortedByDate] = useState<boolean>(false);
  const [sortedByCategory, setSortedByCategory] = useState<boolean>(false);
  const [sortedByAmount, setSortedByAmount] = useState<boolean>(false);

  // Redux toolkit function to call reducer functions
  const dispatch = useDispatch();

  // Sorting Expense array list by Date
  const dateSort = () => {
    // Dispatching reducer function
    dispatch(sortByDate({ sorted: sortedByDate }));
    setSortedByDate(!sortedByDate);
    setSortedByCategory(false);
    setSortedByAmount(false);
  };

  // Sorting Expense array list by Category
  const categorySort = () => {
    // Dispatching reducer function
    dispatch(sortByCategory({ sorted: sortedByCategory }));
    setSortedByCategory(!sortedByCategory);
    setSortedByDate(false);
    setSortedByAmount(false);
  };

  // Sorting Expense array list by Amount
  const amountSort = () => {
    // Dispatching reducer function
    dispatch(sortByAmount({ sorted: sortedByAmount }));
    setSortedByAmount(!sortedByAmount);
    setSortedByDate(false);
    setSortedByCategory(false);
  };

  // Redux Toolkit api Request to get expense array
  return (
    <>
      <section className="dashboard">
        {/* Currentl Chart container is a placeholder */}
        <ChartContainer />
        <div className="expenseList">
          <div className="listHeader">
            <div className="expenseListHeaderDate" onClick={dateSort}>
              Date
            </div>
            <div className="expenseListHeaderCategory" onClick={categorySort}>
              Category
            </div>
            <div className="expenseListHeaderAmount" onClick={amountSort}>
              Amount
            </div>
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
