import { cleanup, fireEvent, render } from "@testing-library/react";

import { ErrorText } from "./ErrorText";
import renderer from "react-test-renderer";

describe("Error Text", () => {
  afterEach(cleanup);

  it("Renders", () => {
    const { getByTestId } = render(<ErrorText title="Error" />);
    expect(getByTestId("errorText")).toBeTruthy();
  });

  it("Renders Text", () => {
    const { getByTestId } = render(<ErrorText title="Error" />);
    expect(getByTestId("errorText").querySelector("span")).toHaveTextContent(
      "Error"
    );
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(<ErrorText title="Error" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
