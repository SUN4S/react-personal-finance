import { cleanup, render, screen } from "@testing-library/react";

import { ExpenseBarChart } from "./ExpenseBarChart";
import { barChartData } from "../../resources/mockData";
import userEvent from "@testing-library/user-event";

describe("Expense Bar Chart", () => {
  afterEach(cleanup);

  beforeAll(() => {
    jest
      .spyOn(HTMLElement.prototype, "clientHeight", "get")
      .mockReturnValue(144);
    jest
      .spyOn(HTMLElement.prototype, "clientWidth", "get")
      .mockReturnValue(400);
  });

  it("Renders", () => {
    const { getByTestId } = render(
      <ExpenseBarChart chartData={barChartData} />
    );
    expect(getByTestId("expenseChart")).toBeTruthy();
  });

  it("Renders yAxis", () => {
    const { getByTestId } = render(
      <ExpenseBarChart chartData={barChartData} />
    );
    const axisText = getByTestId("expenseChart").querySelectorAll(
      `.recharts-yAxis .recharts-cartesian-axis-ticks text tspan`
    );
    expect(axisText[0]).toHaveTextContent("Essentials");
    expect(axisText[1]).toHaveTextContent("Wants");
    expect(axisText[2]).toHaveTextContent("Culture");
    expect(axisText[3]).toHaveTextContent("Unexpected");
  });

  it("Renders xAxis", () => {
    const { getByTestId } = render(
      <ExpenseBarChart chartData={barChartData} />
    );
    const axisText = getByTestId("expenseChart").querySelectorAll(
      `.recharts-xAxis .recharts-cartesian-axis-ticks .recharts-cartesian-axis-tick`
    );
    expect(axisText.length).toBe(5);
  });

  it("Renders Tooltip", () => {
    const { getByTestId } = render(
      <ExpenseBarChart chartData={barChartData} />
    );
    expect(
      getByTestId("expenseChart").querySelector(".recharts-tooltip-wrapper")
    ).toBeInTheDocument();
  });
});
