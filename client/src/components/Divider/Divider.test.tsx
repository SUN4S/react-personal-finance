import { cleanup, render } from "@testing-library/react";

import { Divider } from "./Divider";
import renderer from "react-test-renderer";

describe("Divider Component", () => {
  afterAll(cleanup);

  it("Renders", () => {
    const { getByTestId } = render(<Divider text="OR" />);
    const dividerElement = getByTestId("divider");
    expect(dividerElement).toBeTruthy();
  });

  it("Renders Text", () => {
    const { getByTestId } = render(<Divider text="OR" />);
    const dividerElement = getByTestId("divider");
    expect(dividerElement).toHaveTextContent("OR");
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(<Divider text="OR" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
