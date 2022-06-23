import { cleanup, fireEvent, render } from "@testing-library/react";

import { LoadingBox } from "./LoadingBox";
import renderer from "react-test-renderer";

describe("Loading Box", () => {
  afterEach(cleanup);

  it("Renders", () => {
    const { getByTestId } = render(<LoadingBox size="sm" />);
    expect(getByTestId("loadingBox")).toBeTruthy();
  });

  it("Sets Size Small", () => {
    const { getByTestId } = render(<LoadingBox size="sm" />);
    expect(getByTestId("loadingSpinner")).toHaveClass("sm");
  });

  it("Sets Size large", () => {
    const { getByTestId } = render(<LoadingBox size="lg" />);
    expect(getByTestId("loadingSpinner")).toHaveClass("lg");
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(<LoadingBox size="lg" />);
    expect(tree).toMatchSnapshot();
  });
});
