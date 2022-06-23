import { cleanup, render } from "@testing-library/react";

import { ExpenseBarChart } from "./ExpenseBarChart";

describe("Expense Bar Chart", () => {
  afterEach(cleanup);

  const mockData = [
    { name: "Essentials", value: 0 },
    { name: "Wants", value: 0 },
    { name: "Culture", value: 0 },
    { name: "Unexpected", value: 0 },
  ];

  beforeAll(() => {
    jest
      .spyOn(HTMLElement.prototype, "clientHeight", "get")
      .mockReturnValue(144);
    jest
      .spyOn(HTMLElement.prototype, "clientWidth", "get")
      .mockReturnValue(400);
  });

  it("Renders", () => {
    const { getByTestId } = render(<ExpenseBarChart chartData={mockData} />);
    expect(getByTestId("expenseChart")).toBeTruthy();
  });

  it("Renders yAxis", () => {
    const { getByTestId } = render(<ExpenseBarChart chartData={mockData} />);
    const axisText = getByTestId("expenseChart").querySelectorAll(
      `.recharts-yAxis .recharts-cartesian-axis-ticks text tspan`
    );
    expect(axisText[0]).toHaveTextContent("Essentials");
    expect(axisText[1]).toHaveTextContent("Wants");
    expect(axisText[2]).toHaveTextContent("Culture");
    expect(axisText[3]).toHaveTextContent("Unexpected");
  });
});
