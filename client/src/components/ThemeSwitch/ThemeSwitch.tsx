import "./ThemeSwitch.scss";

import { IconMoon } from "../../resources/icons/IconMoon/IconMoon";
import { IconSun } from "../../resources/icons/IconSun/IconSun";

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
