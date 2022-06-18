/**
 * @jest-environment jsdom
 */

import { cleanup, render } from "@testing-library/react";

import { Divider } from "./Divider";
import renderer from "react-test-renderer";

describe("Divider Component", () => {
  afterAll(cleanup);

  it("Renders Divider", () => {
    const { getByTestId } = render(<Divider text="OR" />);
    const dividerElement = getByTestId("divider");
    expect(dividerElement).toBeTruthy();
  });

  it("Renders Divider Text", () => {
    const { getByTestId } = render(<Divider text="OR" />);
    const dividerElement = getByTestId("divider");
    expect(dividerElement).toHaveTextContent("OR");
    expect(dividerElement).toHaveCss
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(<Divider text="OR" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
