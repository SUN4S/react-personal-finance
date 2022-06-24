import { cleanup, fireEvent, render } from "@testing-library/react";

import { CollapseButton } from "./CollapseButton";
import renderer from "react-test-renderer";

describe("Collapse Button", () => {
  afterEach(cleanup);

  it("Renders", () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(
      <CollapseButton clickFunction={mockFunction} />
    );
    expect(getByTestId("collapseButton")).toBeTruthy();
  });

  it("Fires Function", () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(
      <CollapseButton clickFunction={mockFunction} />
    );
    fireEvent.click(getByTestId("collapseButton"));
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("Matches Snapshot", () => {
    const mockFunction = jest.fn();
    const tree = renderer
      .create(<CollapseButton clickFunction={mockFunction} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
