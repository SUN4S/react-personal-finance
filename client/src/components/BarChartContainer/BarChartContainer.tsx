import "./BarChartContainer.scss";

import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

import { ExpenseState } from "../../models/expenses";
import { LoadingBox } from "../LoadingBox/LoadingBox";

interface DataObject {
  name: string;
  value: number;
}

// TODO: Fix Reference chart bug, where one line is thinner
// Also fix isFront bug, where reference lines will not go behind bars

export const BarChartContainer = (props: {
  expenseData: Array<ExpenseState>;
}) => {
  // State for data array
  // Data used to draw barchart
  const [data, setData] = useState<Array<DataObject>>([
    { name: "Essentials", value: 0 },
    { name: "Wants", value: 0 },
    { name: "Culture", value: 0 },
    { name: "Unexpected", value: 0 },
  ]);
  // Loading state for when data is being processed
  const [loading, setLoading] = useState<boolean>(true);

  // Colors for barchart bars
  const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#a2b321"];

  useEffect(() => {
    // Needlesly complex way to update array of objects
    // Create a variable that will be passed to state later
    let processedData: Array<DataObject> = data;
    // Map through all expenses
    props.expenseData.forEach((item) => {
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
    setLoading(false);
  }, [props.expenseData]);

  return (
    <div className="barchartContainer">
      {loading ? (
        <LoadingBox size="xl" />
      ) : (
        <ResponsiveContainer width="100%" minWidth="225px" height="100%">
          <BarChart data={data} layout="vertical">
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              width={80}
              tick={{ fontSize: 14, fill: "var(--text-secondary)" }}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: "var(--sidebar-bg)",
                padding: "0",
                border: "1px solid var(--text-secondary)",
                color: "var(--text-primary)",
                borderRadius: "5px",
              }}
              itemStyle={{
                color: "var(--text-primary)",
              }}
            />
            {data.map(
              (entry, index) =>
                entry.value > 0 && (
                  <ReferenceLine
                    segment={[
                      { x: entry.value, y: entry.name },
                      { x: entry.value, y: data[3].name },
                    ]}
                    stroke="var(--text-secondary)"
                    strokeWidth={1}
                    isFront={false}
                    style={{
                      transform: "translateY(12px) translateX(-1px)",
                    }}
                  />
                )
            )}
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
