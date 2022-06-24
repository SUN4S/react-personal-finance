import { cleanup, fireEvent, render } from "@testing-library/react";

import { ExpenseListItem } from "./ExpenseListItem";
import renderer from "react-test-renderer";

describe("Expense List Item", () => {
  afterEach(cleanup);

  const mockFunction = jest.fn();
  const mockData = {
    _id: "62b1a3df9525535b9a48136b",
    category: "Culture",
    amount: 100,
    date: new Date("2022-06-21T10:56:14.942+00:00"),
    tags: ["Cinema", "Dog"],
    description: "Random description",
    receipt: "",
  };

  it("Renders", () => {
    const { getByTestId } = render(
      <ExpenseListItem expenseData={mockData} clickFunction={mockFunction} />
    );
    expect(getByTestId("expenseItem")).toBeTruthy();
  });

  it("Clicked Edit", () => {
    const { getByTestId } = render(
      <ExpenseListItem expenseData={mockData} clickFunction={mockFunction} />
    );
    fireEvent.click(getByTestId("editExpenseButton"));
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("Renders Date", () => {
    const { getByTestId } = render(
      <ExpenseListItem expenseData={mockData} clickFunction={mockFunction} />
    );
    expect(
      getByTestId("expenseItem").querySelector(".expenseListElementDate")
    ).toHaveTextContent("2022-06-21");
  });

  it("Renders Category", () => {
    const { getByTestId } = render(
      <ExpenseListItem expenseData={mockData} clickFunction={mockFunction} />
    );
    expect(
      getByTestId("expenseItem").querySelector(".expenseListElementCategory")
    ).toHaveTextContent("Culture");
  });

  it("Renders Amount", () => {
    const { getByTestId } = render(
      <ExpenseListItem expenseData={mockData} clickFunction={mockFunction} />
    );
    expect(
      getByTestId("expenseItem").querySelector(".expenseListElementAmount")
    ).toHaveTextContent("100");
  });

  it("Renders Description", () => {
    const { getByTestId } = render(
      <ExpenseListItem expenseData={mockData} clickFunction={mockFunction} />
    );
    expect(
      getByTestId("expenseItem").querySelector(".expenseListElementDescription")
    ).toHaveTextContent("Random description");
  });

  it("Renders Tags", () => {
    const { getByTestId } = render(
      <ExpenseListItem expenseData={mockData} clickFunction={mockFunction} />
    );
    expect(
      getByTestId("expenseItem").querySelectorAll(".tagElement")[0]
    ).toHaveTextContent("Cinema");
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(
      <ExpenseListItem expenseData={mockData} clickFunction={mockFunction} />
    );
    expect(tree).toMatchSnapshot();
  });
});
