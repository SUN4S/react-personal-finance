import { cleanup, fireEvent, render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { SidebarList } from "./SidebarList";
import renderer from "react-test-renderer";

describe("Sidebar List", () => {
  afterEach(cleanup);

  it("Renders", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <SidebarList />
      </MemoryRouter>
    );
    expect(getByTestId("sidebarList")).toBeTruthy();
  });

  it("Dashboard Link Exists", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <SidebarList />
      </MemoryRouter>
    );
    // navigate here on event
    expect(
      getByTestId("sidebarList").querySelectorAll("ul li a")[0]
    ).toHaveAttribute("href", "/");
  });

  it("History Link Exists", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <SidebarList />
      </MemoryRouter>
    );
    // navigate here on event
    expect(
      getByTestId("sidebarList").querySelectorAll("ul li a")[1]
    ).toHaveAttribute("href", "/history");
  });

  it("Stocks Link Exists", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <SidebarList />
      </MemoryRouter>
    );
    // navigate here on event
    expect(
      getByTestId("sidebarList").querySelectorAll("ul li a")[2]
    ).toHaveAttribute("href", "/stocks");
  });

  it("Weekly Link Exists", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <SidebarList />
      </MemoryRouter>
    );
    // navigate here on event
    expect(
      getByTestId("sidebarList").querySelectorAll("ul li a")[3]
    ).toHaveAttribute("href", "/weekly");
  });

  it("Monthly Link Exists", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <SidebarList />
      </MemoryRouter>
    );
    // navigate here on event
    expect(
      getByTestId("sidebarList").querySelectorAll("ul li a")[4]
    ).toHaveAttribute("href", "/monthly");
  });

  it("Matches Snapshot", () => {
    const tree = renderer.create(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <SidebarList />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
