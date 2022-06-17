import "./ExpenseChart.scss";

import { useEffect, useState } from "react";

import { ErrorText } from "../../components/ErrorText/ErrorText";
import { ExpenseBarChart } from "../../components/ExpenseBarChart/ExpenseBarChart";
import { ExpenseChartProps } from "../../models/chart";
import { LoadingBox } from "../../components/LoadingBox/LoadingBox";

interface DataObject {
  name: string;
  value: number;
}

// Component that houses subcomponents
export const ExpenseChart = ({
  expenseData,
  expenseIsFetching,
  expenseIsSuccess,
}: ExpenseChartProps) => {
  // State for data array
  // Data used to draw barchart
  const [data, setData] = useState<Array<DataObject>>([
    { name: "Essentials", value: 0 },
    { name: "Wants", value: 0 },
    { name: "Culture", value: 0 },
    { name: "Unexpected", value: 0 },
  ]);

  useEffect(() => {
    // Needlesly complex way to update array of objects
    // Create a variable that will be passed to state later
    let processedData: Array<DataObject> = data;
    // Map through all expenses
    expenseData?.forEach((item) => {
      // Create a temporary Array
      let temp_state = [...processedData];
      // Create a temporary object with currently needed value
      // If 'item' is "unexpected" it will create a temp element with that name
      let temp_element = {
        ...processedData[
          processedData.findIndex((el) => el.name === item.category)
        ],
      };
      // take temp elements value and add following value
      temp_element.value += item.amount;
      // Update temp_element to temp_state
      // Basically change value for object with current name
      temp_state[processedData.findIndex((el) => el.name === item.category)] =
        temp_element;
      // Update variable with updated object
      processedData = temp_state;
    });
    // Set state of processed expense data
    setData(processedData);
    // Set state of loading to false
  }, [expenseData]);

  return (
    <div className="chart">
      <div className="chartHeader">
        <h3>Expense Breakdown</h3>
      </div>
      <div className="chartBody">
        {expenseIsFetching ? (
          <LoadingBox size="xl" />
        ) : (
          <div className="barchartContainer">
            {expenseIsSuccess && expenseData.length > 0 ? (
              <ExpenseBarChart chartData={data} />
            ) : (
              <ErrorText title="No Data" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
