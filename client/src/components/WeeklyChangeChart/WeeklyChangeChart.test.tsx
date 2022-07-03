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
});
