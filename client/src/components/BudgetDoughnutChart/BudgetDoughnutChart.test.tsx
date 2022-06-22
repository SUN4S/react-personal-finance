import { cleanup, render } from "@testing-library/react";

import { BudgetDoughnutChart } from "./BudgetDoughnutChart";

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

  it("Renders Chart", () => {
    const { getByTestId } = render(
      <BudgetDoughnutChart expenseAmount={600} remainingBudget={200} />
    );
    expect(getByTestId("doughnutChart")).toBeTruthy();
  });

  it("Displays Label", () => {
    const { container } = render(
      <BudgetDoughnutChart expenseAmount={600} remainingBudget={200} />
    );
    expect(container.querySelector(".recharts-label")).toBeTruthy();
  });

  it("Displays Label Correct Text", () => {
    const { container } = render(
      <BudgetDoughnutChart expenseAmount={600} remainingBudget={200} />
    );
    expect(container.querySelector(".recharts-label tspan")).toHaveTextContent(
      "200"
    );
  });

  it("Displays Legend", () => {
    const { container } = render(
      <BudgetDoughnutChart expenseAmount={600} remainingBudget={200} />
    );
    expect(container.querySelector(".recharts-default-legend")).toBeTruthy();
  });
});
