import { cleanup, fireEvent, render } from "@testing-library/react";

import { Button } from "./Button";
import renderer from "react-test-renderer";

describe("Button", () => {
  afterEach(cleanup);

  it("Renders Button", () => {
    const { getByTestId } = render(
      <Button type="button" text="Press Me!" class="primaryBtn" />
    );
    expect(getByTestId("button")).toBeTruthy();
  });

  it("Button Fires handleclick", () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(
      <Button
        type="button"
        text="Press Me!"
        class="primaryBtn"
        action={mockFunction}
      />
    );
    fireEvent.click(getByTestId("button"));
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("Button Loading", () => {
    const { getByTestId } = render(
      <Button type="button" text="Press Me!" class="primaryBtn" loading />
    );
    expect(getByTestId("buttonLoader")).toBeTruthy();
  });

  it("Button Matches Snapshot", () => {
    const tree = renderer.create(
      <Button type="button" text="Press Me!" class="primaryBtn" />
    );
    expect(tree).toMatchSnapshot();
  });

  it("Button Matches Loading Snapshot", () => {
    const tree = renderer.create(
      <Button type="button" text="Press Me!" class="primaryBtn" loading />
    );
    expect(tree).toMatchSnapshot();
  });
});
