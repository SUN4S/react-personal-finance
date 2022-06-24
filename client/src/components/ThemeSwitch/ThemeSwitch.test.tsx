import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
} from "@testing-library/react";

import { ThemeSwitch } from "./ThemeSwitch";
import renderer from "react-test-renderer";
import { useTheme } from "../../hooks/useTheme";

describe("Theme Switch", () => {
  afterEach(cleanup);
  const mockFunction = jest.fn();

  it("Renders", () => {
    const { getByTestId } = render(
      <ThemeSwitch theme="light" clickFunction={mockFunction} />
    );
    expect(getByTestId("themeButton")).toBeTruthy();
  });

  it("Is Clickable", () => {
    const { getByTestId } = render(
      <ThemeSwitch theme="light" clickFunction={mockFunction} />
    );

    fireEvent.click(getByTestId("themeButton"));
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it("Has Aria-label", () => {
    const { getByTestId } = render(
      <ThemeSwitch theme="light" clickFunction={mockFunction} />
    );

    expect(getByTestId("themeButton")).toHaveAttribute(
      "aria-label",
      "Theme switch"
    );
  });

  it("Renders Sun Svg", () => {
    const { getByTestId } = render(
      <ThemeSwitch theme="light" clickFunction={mockFunction} />
    );

    expect(
      getByTestId("themeButton").querySelector("svg#sunLogo")
    ).toBeTruthy();
  });

  it("Renders Moon Svg", () => {
    const { getByTestId } = render(
      <ThemeSwitch theme="dark" clickFunction={mockFunction} />
    );

    expect(
      getByTestId("themeButton").querySelector("svg#moonLogo")
    ).toBeTruthy();
  });

  it("Matches Light Snapshot", () => {
    const tree = renderer.create(
      <ThemeSwitch theme="light" clickFunction={mockFunction} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("Matches Dark Snapshot", () => {
    const tree = renderer.create(
      <ThemeSwitch theme="dark" clickFunction={mockFunction} />
    );
    expect(tree).toMatchSnapshot();
  });
});
