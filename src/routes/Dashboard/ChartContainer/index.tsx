import "./chartContainer.scss";

import { useEffect, useState } from "react";

import { RootState } from "../../../app/store";
import { useSelector } from "react-redux";

export const ChartContainer = () => {
  const [spentMoney, setSpentMoney] = useState<number>(0);
  const expenses = useSelector((state: RootState) => state.expenses);
  useEffect(() => {
    let spentAmount = 0;
    expenses.data.forEach((item: any) => {
      spentAmount += Number(item.amount);
    });
    setSpentMoney(spentAmount);
  }, [expenses]);

  return (
    <div className="chartContainer">
      <div className="chart">12</div>
      <div className="chart">Monthly Expenditure: {spentMoney}</div>
      <div className="chart">third</div>
      <div className="chart">four</div>
    </div>
  );
};
