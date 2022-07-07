import { cleanup, render, screen } from "@testing-library/react";

import { ReportsChart } from "./ReportsChart";

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
      <ReportsChart
        totalAmount={500}
        spentAmount={100}
        color={"#3b82f6"}
        name={"Essentials"}
        shortText={false} // because some names are longer, this is to change allocated text width
      />
    );
    expect(getByTestId("reportsChart")).toBeTruthy();
  });

  it("Renders Label", () => {
    const { container } = render(
      <ReportsChart
        totalAmount={500}
        spentAmount={100}
        color={"#3b82f6"}
        name={"Essentials"}
        shortText={false} // because some names are longer, this is to change allocated text width
      />
    );
    expect(container.querySelector(".recharts-label")).toBeInTheDocument();
  });

  it("Renders Label Correct Text", () => {
    const { container } = render(
      <ReportsChart
        totalAmount={500}
        spentAmount={100}
        color={"#3b82f6"}
        name={"Essentials"}
        shortText={false} // because some names are longer, this is to change allocated text width
      />
    );
    expect(container.querySelector(".recharts-label tspan")).toHaveTextContent(
      "Essentials"
    );
  });

  it("Renders Tooltip", () => {
    const { getByTestId } = render(
      <ReportsChart
        totalAmount={500}
        spentAmount={100}
        color={"#3b82f6"}
        name={"Essentials"}
        shortText={false} // because some names are longer, this is to change allocated text width
      />
    );
    expect(
      getByTestId("reportsChart").querySelector(".recharts-tooltip-wrapper")
    ).toBeInTheDocument();
  });
});
