import { cleanup, fireEvent, render } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import { UserDropdown } from "./UserDropdown";
import renderer from "react-test-renderer";

describe("Dropdown", () => {
  afterEach(cleanup);
  const mockFunction = jest.fn();

  it("Renders", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <UserDropdown openStatus={true} logoutFunction={mockFunction} />
      </MemoryRouter>
    );
    expect(getByTestId("dropdown")).toBeTruthy();
  });

  it("Renders Collapsed", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <UserDropdown openStatus={false} logoutFunction={mockFunction} />
      </MemoryRouter>
    );
    expect(getByTestId("dropdown")).toHaveClass("collapsedDropdown");
  });

  it("Renders Options", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <UserDropdown openStatus={true} logoutFunction={mockFunction} />
      </MemoryRouter>
    );
    expect(getByTestId("dropdown").querySelectorAll("ul li").length).toBe(2);
  });

  it("Setting Link Exists", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <UserDropdown openStatus={true} logoutFunction={mockFunction} />
      </MemoryRouter>
    );
    expect(getByTestId("dropdown").querySelector("ul li a")).toHaveAttribute(
      "href",
      "/settings"
    );
  });

  it("Logout Clickable", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/currentUri"]}>
        <UserDropdown openStatus={true} logoutFunction={mockFunction} />
      </MemoryRouter>
    );
    fireEvent.click(getByTestId("logoutButton"));
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
