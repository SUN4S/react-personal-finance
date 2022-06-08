import { ExpenseListItem } from "../ExpenseListItem/ExpenseListItem";
import { ExpenseState } from "../../models/expenses";

export const ExpenseList = (props: { data: Array<ExpenseState> }) => {
  return (
    <>
      {props.data.map((item: ExpenseState) => {
        return <ExpenseListItem expenseData={item} key={item._id} />;
      })}
    </>
  );
};
