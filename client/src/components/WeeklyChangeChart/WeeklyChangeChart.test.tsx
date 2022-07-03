import { cleanup, render } from "@testing-library/react";

import { WeeklyChangeChart } from "./WeeklyChangeChart";
import { weeklyChangeChartData } from "../../resources/mockData";

describe("Weekly Change Chart", () => {
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
      <WeeklyChangeChart chartData={weeklyChangeChartData} />
    );
    expect(getByTestId("lineChart")).toBeTruthy();
  });

  it("Renders xAxis", () => {
    const { getByTestId } = render(
      <WeeklyChangeChart chartData={weeklyChangeChartData} />
    );
    const axisText = getByTestId("lineChart").querySelectorAll(
      `.recharts-xAxis .recharts-cartesian-axis-ticks .recharts-cartesian-axis-tick`
    );
    expect(axisText.length).toBe(2);
  });

  it("Renders yAxis", () => {
    const { getByTestId } = render(
      <WeeklyChangeChart chartData={weeklyChangeChartData} />
    );
    const axisText = getByTestId("lineChart").querySelectorAll(
      `.recharts-yAxis .recharts-cartesian-axis-ticks .recharts-cartesian-axis-tick`
    );
    expect(axisText.length).toBe(5);
  });

  it("Renders Tooltip", () => {
    const { container } = render(
      <WeeklyChangeChart chartData={weeklyChangeChartData} />
    );
    expect(
      container.querySelector(".recharts-default-tooltip")
    ).toBeInTheDocument();
  });
});
