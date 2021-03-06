import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { Button } from "./Button";
import renderer from "react-test-renderer";

describe("Button", () => {
  afterEach(cleanup);

  it("Button", () => {
    const { getByTestId } = render(
      <Button
        type="button"
        text="Press Me!"
        class="primaryBtn"
        testId="button"
      />
    );
    expect(getByTestId("button")).toBeTruthy();
  });

  it("Renders Text", () => {
    const { getByTestId } = render(
      <Button
        type="button"
        text="Press Me!"
        class="primaryBtn"
        testId="button"
      />
    );
    const buttonText = screen.getByText("Press Me!");
    expect(buttonText).toBeTruthy();
  });

  it("Fires handleclick", () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(
      <Button
        type="button"
        text="Press Me!"
        testId="button"
        class="primaryBtn"
        action={mockFunction}
      />
    );
    fireEvent.click(getByTestId("button"));
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("Ignores handleclick", () => {
    const mockFunction = jest.fn();

    const { getByTestId } = render(
      <Button
        type="button"
        text="Press Me!"
        testId="button"
        class="primaryBtn"
        action={mockFunction}
        disabled
      />
    );
    fireEvent.click(getByTestId("button"));
    expect(mockFunction).toHaveBeenCalledTimes(0);
  });

  it("Loading", () => {
    const { getByTestId } = render(
      <Button
        type="button"
        text="Press Me!"
        class="primaryBtn"
        testId="button"
        loading
      />
    );
    expect(getByTestId("buttonLoader")).toBeTruthy();
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(
      <Button
        type="button"
        text="Press Me!"
        class="primaryBtn"
        testId="button"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("Matches Loading Snapshot", () => {
    const tree = renderer.create(
      <Button
        type="button"
        text="Press Me!"
        class="primaryBtn"
        testId="button"
        loading
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
