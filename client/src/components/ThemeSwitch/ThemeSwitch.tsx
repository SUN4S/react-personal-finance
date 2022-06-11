import "./ThemeSwitch.scss";

import { useTheme } from "../../hooks/useTheme";

export const ThemeSwitch = () => {
  const { currentTheme, setTheme } = useTheme();

  // Function that handles theme change
  // Inverts selected option,
  const handleThemeChange = () => {
    if (currentTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="themeContainer">
      <button aria-label="Theme switch" onClick={handleThemeChange}>
        {currentTheme === "dark" ? (
          <i className="fa-solid fa-moon"></i>
        ) : (
          <i className="fa-solid fa-sun"></i>
        )}
      </button>
    </div>
  );
};
