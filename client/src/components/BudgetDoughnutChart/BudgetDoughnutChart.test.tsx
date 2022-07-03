import { cleanup, render } from "@testing-library/react";

import { BudgetDoughnutChart } from "./BudgetDoughnutChart";
import userEvent from "@testing-library/user-event";

describe("Budget Doughnut Chart", () => {
  beforeAll(() => {
    jest
      .spyOn(HTMLElement.prototype, "clientHeight", "get")
      .mockReturnValue(144);
    jest
      .spyOn(HTMLElement.prototype, "clientWidth", "get")
      .mockReturnValue(400);
  });

  afterAll(cleanup);

  it("Renders", () => {
    const { getByTestId } = render(
      <BudgetDoughnutChart expenseAmount={600} remainingBudget={200} />
    );
    expect(getByTestId("doughnutChart")).toBeTruthy();
  });

  it("Renders Label", () => {
    const { container } = render(
      <BudgetDoughnutChart expenseAmount={600} remainingBudget={200} />
    );
    expect(container.querySelector(".recharts-label")).toBeInTheDocument();
  });

  it("Renders Label Correct Text", () => {
    const { container } = render(
      <BudgetDoughnutChart expenseAmount={600} remainingBudget={200} />
    );
    expect(container.querySelector(".recharts-label tspan")).toHaveTextContent(
      "200"
    );
  });

  it("Renders Legend", () => {
    const { container } = render(
      <BudgetDoughnutChart expenseAmount={600} remainingBudget={200} />
    );
    expect(container.querySelector(".recharts-default-legend")).toBeInTheDocument();
  });

  it("Renders Legend Correct Text", () => {
    const { container } = render(
      <BudgetDoughnutChart expenseAmount={600} remainingBudget={200} />
    );
    expect(
      container.querySelectorAll(
        ".recharts-default-legend .recharts-legend-item span"
      )[0]
    ).toHaveTextContent("Remaining");
    expect(
      container.querySelectorAll(
        ".recharts-default-legend .recharts-legend-item span"
      )[1]
    ).toHaveTextContent("Spent");
  });

  it("Renders Tooltip", () => {
    const { getByTestId } = render(
      <BudgetDoughnutChart expenseAmount={600} remainingBudget={200} />
    );
    expect(
      getByTestId("doughnutChart").querySelector(".recharts-tooltip-wrapper")
    ).toBeInTheDocument();
  });
});
