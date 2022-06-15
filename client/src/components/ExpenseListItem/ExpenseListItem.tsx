import "./ExpenseListItem.scss";

import { ExpenseState } from "../../models/expenses";

export const ExpenseListItem = (props: {
  expenseData: ExpenseState;
  onClick: Function;
}) => {
  // Handle button click and pass data to modal
  const handleClick = async () => {
    await props.onClick(props.expenseData);
  };

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
        <button aria-label="Edit expense" onClick={handleClick}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
    </div>
  );
};
