import "./ExpenseList.scss";

import { ErrorText } from "../../components/ErrorText/ErrorText";
import { ExpenseListItem } from "../../components/ExpenseListItem/ExpenseListItem";
import { ExpenseState } from "../../models/expenses";
import { RootState } from "../../app/store";
import { toggleModal } from "../../features/ModalSlice";
import { useCurrentExpenseMonthQuery } from "../../services/expenses";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const ExpenseList = () => {
  const currentExpensesQuery = useCurrentExpenseMonthQuery({});
  const expenses = useSelector((state: RootState) => state.expenses.data);

  // Redux Toolkit function to dispatch(call) functions
  const dispatch = useDispatch();

  // Handle button click and pass data to modal
  // 'editable' sets modal element to be set to edit mode
  // 'data' send current items data to modal
  const handleClick = (expenseData: ExpenseState) => {
    dispatch(toggleModal({ isOpen: true, editable: true, data: expenseData }));
  };

  return (
    <div className="listBody">
      {currentExpensesQuery.isSuccess ? (
        expenses.map((item: ExpenseState) => {
          return (
            <ExpenseListItem
              expenseData={item}
              clickFunction={handleClick}
              key={item._id}
            />
          );
        })
      ) : (
        <ErrorText title="No Data" />
      )}
    </div>
  );
};
