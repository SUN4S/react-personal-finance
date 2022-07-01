import "./WeeklyChangeChartContainer.scss";

import { useEffect, useState } from "react";

import { ErrorText } from "../../components/ErrorText/ErrorText";
import { LoadingBox } from "../../components/LoadingBox/LoadingBox";
import { WeeklyChangeChart } from "../../components/WeeklyChangeChart/WeeklyChangeChart";
import { WeeklyChangeChartProps } from "../../models/reports";
import { WeeklyReportsProps } from "../../models/chart";

export const WeeklyChangeChartContainer = ({
  weeklyData,
  weeklyIsFetching,
  weeklyIsSuccess,
}: WeeklyReportsProps) => {
  const [dataArray, setDataArray] = useState<WeeklyChangeChartProps[]>([]);

  useEffect(() => {
    let newArray: Array<WeeklyChangeChartProps> = [];
    weeklyData &&
      weeklyData.map((item) => {
        newArray.unshift({
          amount: item.totalAmount,
          date: item.toDate.slice(5, 10),
        });
      });
    setDataArray(newArray);
  }, [weeklyData]);

  return (
    <div className="chart">
      <div className="chartHeader">
        <h3>Weekly Change</h3>
      </div>
      <div className="chartBody">
        {weeklyIsFetching ? (
          <LoadingBox size="xl" />
        ) : (
          <div className="lineChartContainer">
            {weeklyIsSuccess && weeklyData.length > 0 ? (
              <WeeklyChangeChart chartData={dataArray} />
            ) : (
              <ErrorText title="No Data" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
