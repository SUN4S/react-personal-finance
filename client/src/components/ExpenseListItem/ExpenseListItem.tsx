import "./ExpenseListItem.scss";

import { ExpenseState } from "../../models/expenses";
import { IconEdit } from "../Icons/IconEdit/IconEdit";

export const ExpenseListItem = (props: {
  expenseData: ExpenseState;
  clickFunction: Function;
}) => {
  return (
    <div className="expenseListElement">
      <div className="expenseListElementDate">
        {`${new Date(props.expenseData.date).getFullYear()}-${
          new Date(props.expenseData.date).getMonth() + 1
        }-${new Date(props.expenseData.date).getDate()}`}
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
          onClick={() => props.clickFunction(props.expenseData)}
        >
          <IconEdit />
        </button>
      </div>
    </div>
  );
};
