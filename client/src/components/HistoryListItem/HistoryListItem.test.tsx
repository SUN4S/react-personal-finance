import { cleanup, fireEvent, render } from "@testing-library/react";

import { HistoryListItem } from "./HistoryListItem";
import renderer from "react-test-renderer";

describe("Expense List Item", () => {
  afterEach(cleanup);

  const mockFunction = jest.fn();
  const mockData = {
    _id: "62b1a3df9525535b9a48136b",
    category: "Culture",
    amount: 100,
    date: "2022-06-21T10:56:14.942+00:00",
    tags: ["Cinema", "Dog"],
    description: "Random description",
    receipt: "someImage.jpg",
  };

  it("Renders", () => {
    const { getByTestId } = render(
      <HistoryListItem historyData={mockData} clickFunction={mockFunction} />
    );
    expect(getByTestId("historyItem")).toBeTruthy();
  });

  it("Clicked Edit", () => {
    const { getByTestId } = render(
      <HistoryListItem historyData={mockData} clickFunction={mockFunction} />
    );
    fireEvent.click(getByTestId("previewImageButton"));
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("Renders Date", () => {
    const { getByTestId } = render(
      <HistoryListItem historyData={mockData} clickFunction={mockFunction} />
    );
    expect(
      getByTestId("historyItem").querySelector(".historyListElementDate")
    ).toHaveTextContent("06-21");
  });

  it("Renders Category", () => {
    const { getByTestId } = render(
      <HistoryListItem historyData={mockData} clickFunction={mockFunction} />
    );
    expect(
      getByTestId("historyItem").querySelector(".historyListElementCategory")
    ).toHaveTextContent("Culture");
  });

  it("Renders Amount", () => {
    const { getByTestId } = render(
      <HistoryListItem historyData={mockData} clickFunction={mockFunction} />
    );
    expect(
      getByTestId("historyItem").querySelector(".historyListElementAmount")
    ).toHaveTextContent("100");
  });

  it("Renders Description", () => {
    const { getByTestId } = render(
      <HistoryListItem historyData={mockData} clickFunction={mockFunction} />
    );
    expect(
      getByTestId("historyItem").querySelector(".historyListElementDescription")
    ).toHaveTextContent("Random description");
  });

  it("Renders Tags", () => {
    const { getByTestId } = render(
      <HistoryListItem historyData={mockData} clickFunction={mockFunction} />
    );
    expect(
      getByTestId("historyItem").querySelectorAll(".tagElement")[0]
    ).toHaveTextContent("Cinema");
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(
      <HistoryListItem historyData={mockData} clickFunction={mockFunction} />
    );
    expect(tree).toMatchSnapshot();
  });
});
