import { ExpenseState } from "../../models/expenses";
import { toggleModal } from "../../features/modal/ModalSlice";
import { useDispatch } from "react-redux";

export const ListItem = (props: { expenseData: ExpenseState }) => {
  // Redux Toolkit function to dispatch(call) functions
  const dispatch = useDispatch();

  // Handle button click and pass data to modal
  // 'editable' sets modal element to be set to edit mode
  // 'data' send current items data to modal
  const handleClick = () => {
    dispatch(
      toggleModal({ isOpen: true, editable: true, data: props.expenseData })
    );
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
          props.expenseData.tags.map((tag: any, index: number) => {
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
