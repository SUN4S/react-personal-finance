import { cleanup, fireEvent, render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { MobileNavList } from "./MobileNavList";
import renderer from "react-test-renderer";

describe("Mobile Navigation List", () => {
  afterEach(cleanup);
  const mockFunction = jest.fn();

  it("Renders", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <MobileNavList clickFunction={mockFunction} />
      </MemoryRouter>
    );
    expect(getByTestId("mobileNavList")).toBeTruthy();
  });

  it("Renders Link List", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <MobileNavList clickFunction={mockFunction} />
      </MemoryRouter>
    );
    expect(getByTestId("mobileNavList").querySelectorAll("ul li").length).toBe(
      5
    );
  });

  it("Has Aria-label", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <MobileNavList clickFunction={mockFunction} />
      </MemoryRouter>
    );

    expect(getByTestId("mobileNavListButton")).toHaveAttribute(
      "aria-label",
      "Mobile Navigation Button"
    );
  });

  it("Calls Function", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <MobileNavList clickFunction={mockFunction} />
      </MemoryRouter>
    );
    fireEvent.click(getByTestId("mobileNavListButton"));
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("Dashboard Link Exists", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <MobileNavList clickFunction={mockFunction} />
      </MemoryRouter>
    );
    // navigate here on event
    expect(
      getByTestId("mobileNavList").querySelectorAll("ul li a")[0]
    ).toHaveAttribute("href", "/");
  });

  it("History Link Exists", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <MobileNavList clickFunction={mockFunction} />
      </MemoryRouter>
    );
    // navigate here on event
    expect(
      getByTestId("mobileNavList").querySelectorAll("ul li a")[1]
    ).toHaveAttribute("href", "/history");
  });

  it("Stocks Link Exists", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <MobileNavList clickFunction={mockFunction} />
      </MemoryRouter>
    );
    // navigate here on event
    expect(
      getByTestId("mobileNavList").querySelectorAll("ul li a")[2]
    ).toHaveAttribute("href", "/stocks");
  });

  it("Weekly Link Exists", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <MobileNavList clickFunction={mockFunction} />
      </MemoryRouter>
    );
    // navigate here on event
    expect(
      getByTestId("mobileNavList").querySelectorAll("ul li a")[3]
    ).toHaveAttribute("href", "/weekly");
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <MobileNavList clickFunction={mockFunction} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
