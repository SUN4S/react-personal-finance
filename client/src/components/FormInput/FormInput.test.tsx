import { cleanup, fireEvent, render } from "@testing-library/react";

import { FormInput } from "./FormInput";
import renderer from "react-test-renderer";

describe("Form Input", () => {
  afterEach(cleanup);
  const mockRegister = jest.fn();
  it("Renders", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="username"
        label="username"
        inputTestId="username"
        required
        type="text"
        name="username"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    expect(getByTestId("formLabel")).toBeTruthy();
  });

  it("Renders Label", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="username"
        label="username"
        inputTestId="username"
        required
        type="text"
        name="username"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    expect(getByTestId("formLabel")).toHaveTextContent("username");
  });

  it("Renders Label For", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="username"
        label="username"
        inputTestId="username"
        required
        type="text"
        name="username"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    expect(getByTestId("formLabel")).toHaveAttribute("for", "username");
  });

  it("Renders Input", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="username"
        label="username"
        inputTestId="username"
        required
        type="text"
        name="username"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    expect(getByTestId("username")).toBeTruthy();
  });

  it("Renders Placeholder", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="username"
        label="username"
        inputTestId="username"
        required
        type="text"
        name="username"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    expect(getByTestId("username")).toHaveAttribute(
      "placeholder",
      "Enter Name"
    );
  });

  it("Has Input Type", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="username"
        label="username"
        inputTestId="username"
        required
        type="text"
        name="username"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    expect(getByTestId("username")).toHaveAttribute("type", "text");
  });

  it("Is Typeable", () => {
    const { getByTestId } = render(
      <FormInput
        labelFor="username"
        label="username"
        inputTestId="username"
        required
        type="text"
        name="username"
        placeholder="Enter Name"
        register={mockRegister}
      />
    );
    fireEvent.change(getByTestId("username"), { target: { value: "John" } });
    expect(getByTestId("username")).toHaveValue("John");
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
        labelFor="username"
        label="username"
        inputTestId="username"
        required
        type="text"
        name="username"
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
