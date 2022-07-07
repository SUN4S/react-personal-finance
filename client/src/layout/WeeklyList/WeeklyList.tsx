import "./WeeklyList.scss";

import { DateTime } from "luxon";
import { ErrorText } from "../../components/ErrorText/ErrorText";
import { RootState } from "../../app/store";
import { WeeklyReportsChart } from "../../components/WeeklyReportsChart/WeeklyReportsChart";
import { WeeklyReportsState } from "../../models/reports";
import { useSelector } from "react-redux";

export const WeeklyList = () => {
  // Getting weekly reports data from redux store
  const weeklyData = useSelector((state: RootState) => state.weekly.data);

  return (
    <div className="weeklylistBody">
      {weeklyData.length > 0 ? (
        weeklyData.map((item: WeeklyReportsState) => {
          return (
            <div className="listItem">
              <div className="listItemHeader">
                <div className="dateContainer">
                  <div>
                    From:{" "}
                    {DateTime.fromISO(item.fromDate).toFormat("yyyy-MM-dd")}
                  </div>
                  <div>
                    To: {DateTime.fromISO(item.toDate).toFormat("yyyy-MM-dd")}
                  </div>
                </div>
                <div>Total Amount Spent: {item.totalAmount}</div>
              </div>
              <div className="chartsContainer">
                <WeeklyReportsChart
                  totalAmount={item.totalAmount}
                  spentAmount={item.essentialsAmount}
                  color={"#3b82f6"}
                  name={"Essentials"}
                  shortText={false} // because some names are longer, this is to change allocated text width
                />
                <WeeklyReportsChart
                  totalAmount={item.totalAmount}
                  spentAmount={item.wantsAmount}
                  color={"#eab308"}
                  name={"Wants"}
                  shortText={true} // because some names are longer, this is to change allocated text width
                />
                <WeeklyReportsChart
                  totalAmount={item.totalAmount}
                  spentAmount={item.cultureAmount}
                  color={"#22c55e"}
                  name={"Culture"}
                  shortText={true} // because some names are longer, this is to change allocated text width
                />
                <WeeklyReportsChart
                  totalAmount={item.totalAmount}
                  spentAmount={item.unexpectedAmount}
                  color={"#ef4444"}
                  name={"Unexpected"}
                  shortText={false} // because some names are longer, this is to change allocated text width
                />
              </div>
            </div>
          );
        })
      ) : (
        <ErrorText title="No Data" />
      )}
    </div>
  );
};
