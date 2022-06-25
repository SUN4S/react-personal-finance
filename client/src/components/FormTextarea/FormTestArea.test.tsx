import { cleanup, fireEvent, render } from "@testing-library/react";

import { FormTextarea } from "./FormTextarea";
import renderer from "react-test-renderer";

describe("Form Textarea", () => {
  afterEach(cleanup);
  const mockRegister = jest.fn();

  it("Renders", () => {
    const { getByTestId } = render(
      <FormTextarea
        labelFor="description"
        label="Description:"
        name="description"
        inputTestId="description"
        required={false}
        placeholder="Something to describe your expense"
        register={mockRegister}
      />
    );
    expect(getByTestId("formLabel")).toBeTruthy();
  });

  it("Render Label", () => {
    const { getByTestId } = render(
      <FormTextarea
        labelFor="description"
        label="Description:"
        name="description"
        inputTestId="description"
        required={false}
        placeholder="Something to describe your expense"
        register={mockRegister}
      />
    );
    expect(getByTestId("formLabel")).toHaveTextContent("Description:");
  });

  it("Renders Label For", () => {
    const { getByTestId } = render(
      <FormTextarea
        labelFor="description"
        label="Description:"
        name="description"
        inputTestId="description"
        required={false}
        placeholder="Something to describe your expense"
        register={mockRegister}
      />
    );
    expect(getByTestId("formLabel")).toHaveAttribute("for", "description");
  });

  it("Renders Placeholder", () => {
    const { getByTestId } = render(
      <FormTextarea
        labelFor="description"
        label="Description:"
        name="description"
        inputTestId="description"
        required={false}
        placeholder="Something to describe your expense"
        register={mockRegister}
      />
    );
    expect(getByTestId("description")).toHaveAttribute(
      "placeholder",
      "Something to describe your expense"
    );
  });

  it("Is Typeable", () => {
    const { getByTestId } = render(
      <FormTextarea
        labelFor="description"
        label="Description:"
        name="description"
        inputTestId="description"
        required={false}
        placeholder="Something to describe your expense"
        register={mockRegister}
      />
    );
    fireEvent.change(getByTestId("description"), {
      target: { value: "John" },
    });
    expect(getByTestId("description")).toHaveValue("John");
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(
      <FormTextarea
        labelFor="description"
        label="Description:"
        name="description"
        inputTestId="description"
        required={false}
        placeholder="Something to describe your expense"
        register={mockRegister}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
