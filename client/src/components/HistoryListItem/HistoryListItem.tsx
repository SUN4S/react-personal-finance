import "./HistoryListItem.scss";

import { DateTime } from "luxon";
import { ExpenseState } from "../../models/expenses";
import { IconImage } from "../../resources/icons/IconImage/IconImage";

export const HistoryListItem = (props: {
  historyData: ExpenseState;
  clickFunction: Function;
}) => {
  return (
    <div className="historyListElement" data-testid="historyItem">
      <div className="historyListElementDate">
        {`${DateTime.fromISO(props.historyData.date).toFormat("MM-dd")}`}
      </div>
      <div className="historyListElementCategory">
        {props.historyData.category}
      </div>
      <div className="historyListElementAmount">{props.historyData.amount}</div>
      <div className="historyListElementDescription">
        {props.historyData.description
          ? props.historyData.description
          : "No Description"}
      </div>
      <div className="historyListElementTags">
        {props.historyData.tags &&
          props.historyData.tags.map((tag: string, index: number) => {
            return (
              <div className="tagElement" key={index}>
                {tag}
              </div>
            );
          })}
      </div>
      <div className="historyListElementControls">
        {props.historyData.receipt ? (
          <button
            aria-label="Preview Image"
            data-testid="previewImageButton"
            onClick={() => props.clickFunction()}
          >
            <IconImage />
          </button>
        ) : (
          "-"
        )}
      </div>
    </div>
  );
};
