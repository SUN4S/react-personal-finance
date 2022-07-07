import "./MonthlyList.scss";

import { DateTime } from "luxon";
import { ErrorText } from "../../components/ErrorText/ErrorText";
import { LoadingBox } from "../../components/LoadingBox/LoadingBox";
import { MonthlyReportsState } from "../../models/reports";
import { ReportsChart } from "../../components/ReportsChart/ReportsChart";
import { RootState } from "../../app/store";
import { useMonthlyReportsQuery } from "../../services/reports";
import { useSelector } from "react-redux";

export const MonthlyList = () => {
  const { isLoading, isSuccess } = useMonthlyReportsQuery({});
  // Getting weekly reports data from redux store
  const monthlyData = useSelector((state: RootState) => state.monthly.data);

  return (
    <div className="monthlylistBody">
      {isLoading ? (
        <LoadingBox size="xl" />
      ) : monthlyData.length > 0 ? (
        monthlyData.map((item: MonthlyReportsState) => {
          return (
            <div className="listItem">
              <div className="listItemHeader">
                <div className="dateContainer">
                  <div>
                    Date:{" "}
                    {DateTime.fromISO(item.monthDate).toFormat("yyyy-MM")}
                  </div>
                </div>
                <div>Total Amount Spent: {item.totalAmount}</div>
              </div>
              <div className="chartsContainer">
                <ReportsChart
                  totalAmount={item.totalAmount}
                  spentAmount={item.essentialsAmount}
                  color={"#3b82f6"}
                  name={"Essentials"}
                  shortText={false} // because some names are longer, this is to change allocated text width
                />
                <ReportsChart
                  totalAmount={item.totalAmount}
                  spentAmount={item.wantsAmount}
                  color={"#eab308"}
                  name={"Wants"}
                  shortText={true} // because some names are longer, this is to change allocated text width
                />
                <ReportsChart
                  totalAmount={item.totalAmount}
                  spentAmount={item.cultureAmount}
                  color={"#22c55e"}
                  name={"Culture"}
                  shortText={true} // because some names are longer, this is to change allocated text width
                />
                <ReportsChart
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
