import { cleanup, fireEvent, render } from "@testing-library/react";

import { FormProvider } from "react-hook-form";
import { FormSelect } from "./FormSelect";
import renderer from "react-test-renderer";

describe("Form Select", () => {
  afterEach(cleanup);
  const mockOption = ["Essentials", "Wants", "Culture", "Unexpected"];
  const mockRegister = jest.fn();

  it("Renders", () => {
    const { getByTestId } = render(
      <FormSelect
        labelFor="category"
        label="Expense Category"
        name="category"
        inputTestId="category"
        options={["Essentials", "Wants", "Culture", "Unexpected"]}
        required
        register={mockRegister}
      />
    );
    expect(getByTestId("formLabel")).toBeTruthy();
  });

  it("Render Label", () => {
    const { getByTestId } = render(
      <FormSelect
        labelFor="category"
        label="Expense Category"
        name="category"
        inputTestId="category"
        options={["Essentials", "Wants", "Culture", "Unexpected"]}
        required
        register={mockRegister}
      />
    );
    expect(getByTestId("formLabel")).toHaveTextContent("Expense Category");
  });

  it("Renders Label For", () => {
    const { getByTestId } = render(
      <FormSelect
        labelFor="category"
        label="Expense Category"
        name="category"
        inputTestId="category"
        options={["Essentials", "Wants", "Culture", "Unexpected"]}
        required
        register={mockRegister}
      />
    );
    expect(getByTestId("formLabel")).toHaveAttribute("for", "category");
  });

  it("Renders Select", () => {
    const { getByTestId } = render(
      <FormSelect
        labelFor="category"
        label="Expense Category"
        name="category"
        inputTestId="category"
        options={["Essentials", "Wants", "Culture", "Unexpected"]}
        required
        register={mockRegister}
      />
    );
    expect(getByTestId("category")).toBeTruthy();
  });

  it("Renders Options", () => {
    const { getByTestId } = render(
      <FormSelect
        labelFor="category"
        label="Expense Category"
        name="category"
        inputTestId="category"
        options={["Essentials", "Wants", "Culture", "Unexpected"]}
        required
        register={mockRegister}
      />
    );
    const options = getByTestId("category").querySelectorAll("option");
    expect(options[0]).toHaveTextContent("Essentials");
    expect(options[1]).toHaveTextContent("Wants");
    expect(options[2]).toHaveTextContent("Culture");
    expect(options[3]).toHaveTextContent("Unexpected");
  });

  it("Options Selectable", () => {
    const { getByTestId } = render(
      <FormSelect
        labelFor="category"
        label="Expense Category"
        name="category"
        inputTestId="category"
        options={["Essentials", "Wants", "Culture", "Unexpected"]}
        required
        register={mockRegister}
      />
    );
    fireEvent.change(getByTestId("category"), {
      target: { value: "Culture", name: "Culture" },
    });
    expect(getByTestId("category")).toHaveValue("Culture");
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(
      <FormSelect
        labelFor="category"
        label="Expense Category"
        name="category"
        inputTestId="category"
        options={["Essentials", "Wants", "Culture", "Unexpected"]}
        required
        register={mockRegister}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
