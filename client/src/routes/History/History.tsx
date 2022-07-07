import "./History.scss";

import {
  sortByAmount,
  sortByCategory,
  sortByDate,
} from "../../features/HistorySlice";

import { HistoryList } from "../../layout/HistoryList/HistoryList";
import { ImageModal } from "../../layout/ImageModal/ImageModal";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const History = () => {
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
  return (
    <section className="history">
      <div className="historyContent">
        <div className="historylistHeader">
          <div className="historyListHeaderDate" onClick={dateSort}>
            Date
          </div>
          <div className="historyListHeaderCategory" onClick={categorySort}>
            Category
          </div>
          <div className="historyListHeaderAmount" onClick={amountSort}>
            Amount
          </div>
          <div className="historyListHeaderDescription">Description</div>
          <div className="historyListHeaderTags">Tags</div>
          <div className="historyListHeaderControls">Receipt</div>
        </div>
        {/* Rendering a list of expense historic items */}
        <HistoryList />
      </div>
      <ImageModal />
    </section>
  );
};
