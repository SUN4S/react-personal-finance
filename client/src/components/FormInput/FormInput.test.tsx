import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import { FormInput } from "./FormInput";
import { FormProvider } from "react-hook-form";
import renderer from "react-test-renderer";

describe("Form Input", () => {
  afterEach(cleanup);
  const mockRegister = jest.fn();
  it("Renders", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="name"
        label="name"
        required
        type="text"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    expect(getByTestId("formLabel")).toBeTruthy();
  });

  it("Render Label", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="name"
        label="name"
        required
        type="text"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    expect(getByTestId("formLabel")).toHaveTextContent("name");
  });

  it("Render Input", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="name"
        label="name"
        required
        type="text"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    expect(getByTestId("formInput")).toBeTruthy();
  });

  it("Renders Placeholder", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="name"
        label="name"
        required
        type="text"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    const inputPlaceholder = screen.getByPlaceholderText("Enter Name");
    expect(inputPlaceholder).toBeTruthy();
  });

  it("Is Typeable", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="name"
        label="name"
        required
        type="text"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    const input = screen.getByTestId("formInput");
    fireEvent.change(input, { target: { value: "John" } });
    expect(input).toHaveValue("John");
  });

  it("Renders Children", () => {
    const { getByTestId } = render(
      <FormInput labelFor="image">
        <h1>Hello World</h1>
      </FormInput>
    );
    expect(getByTestId("formLabel")).toContainHTML("<h1>Hello World</h1>");
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(
      <FormInput
        labelFor="name"
        label="name"
        required
        type="text"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("Matches Snapshot (Children)", () => {
    const tree = renderer.create(
      <FormInput labelFor="image">
        <h1>Hello World</h1>
      </FormInput>
    );
    expect(tree).toMatchSnapshot();
  });
});
