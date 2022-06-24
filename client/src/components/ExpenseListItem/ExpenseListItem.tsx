import "./ExpenseListItem.scss";

import { ExpenseState } from "../../models/expenses";
import { IconEdit } from "../Icons/IconEdit/IconEdit";

export const ExpenseListItem = (props: {
  expenseData: ExpenseState;
  clickFunction: Function;
}) => {
  return (
    <div className="expenseListElement" data-testid="expenseItem">
      <div className="expenseListElementDate">
        {`${new Date(props.expenseData.date).toISOString().slice(0, 10)}`}
      </div>
      <div className="expenseListElementCategory">
        {props.expenseData.category}
      </div>
      <div className="expenseListElementAmount">{props.expenseData.amount}</div>
      <div className="expenseListElementDescription">
        {props.expenseData.description
          ? props.expenseData.description
          : "No Description"}
      </div>
      <div className="expenseListElementTags">
        {props.expenseData.tags &&
          props.expenseData.tags.map((tag: string, index: number) => {
            return (
              <div className="tagElement" key={index}>
                {tag}
              </div>
            );
          })}
      </div>
      <div className="expenseListElementControls">
        <button
          aria-label="Edit expense"
          data-testid="editExpenseButton"
          onClick={() => props.clickFunction(props.expenseData)}
        >
          <IconEdit />
        </button>
      </div>
    </div>
  );
};
