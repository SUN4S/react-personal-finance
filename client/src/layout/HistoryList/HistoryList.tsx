import "./HistoryList.scss";

import { ErrorText } from "../../components/ErrorText/ErrorText";
import { ExpenseState } from "../../models/expenses";
import { HistoryListItem } from "../../components/HistoryListItem/HistoryListItem";
import { RootState } from "../../app/store";
import { toggleImageModal } from "../../features/ImageModalSlice";
import { useAppDispatch } from "../../app/hooks";
import { useExpenseHistoryQuery } from "../../services/expenses";
import { useSelector } from "react-redux";

export const HistoryList = () => {
  const historyQuery = useExpenseHistoryQuery({});
  const history = useSelector((state: RootState) => state.history.data);

  const dispatch = useAppDispatch();

  return (
    <div className="listBody">
      {historyQuery.isSuccess ? (
        history.map((item: ExpenseState) => {
          return (
            <HistoryListItem
              historyData={item}
              clickFunction={() =>
                dispatch(toggleImageModal({ isOpen: true, src: item.receipt }))
              }
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
