import "./History.scss";

import { HistoryList } from "../../layout/HistoryList/HistoryList";
import { ImageModal } from "../../layout/ImageModal/ImageModal";

export const History = () => {
  return (
    <section className="history">
      <div className="historyContent">
        <div className="historylistHeader">
          <div className="historyListHeaderDate">Date</div>
          <div className="historyListHeaderCategory">Category</div>
          <div className="historyListHeaderAmount">Amount</div>
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
