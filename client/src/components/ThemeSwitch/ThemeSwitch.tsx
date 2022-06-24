import "./ThemeSwitch.scss";

import { IconMoon } from "../Icons/IconMoon/IconMoon";
import { IconSun } from "../Icons/IconSun/IconSun";
import { useTheme } from "../../hooks/useTheme";

export const ThemeSwitch = (props: {
  theme: string | null;
  clickFunction: Function;
}) => {
  return (
    <button
      id="themeButton"
      data-testid="themeButton"
      aria-label="Theme switch"
      onClick={() => props.clickFunction()}
    >
      {props.theme === "dark" ? <IconMoon /> : <IconSun />}
    </button>
  );
};
