import "./themeSwitch.scss";

import React, { ChangeEvent, useEffect, useState } from "react";

export const ThemeSwitch = () => {
  // Check if theme has at some point been set to localstorage
  // If not, set currentTheme state to 'light'
  const [currentTheme, setCurrentTheme] = useState<string | null>(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // On load, set html->data-theme to currentTheme('light' or 'dark')
  useEffect(() => {
    currentTheme &&
      document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  // Function that handles theme change
  // Inverts selected option,
  // sets state to that option
  // and saves state to localStorage for future use
  const handleThemeChange = () => {
    if (currentTheme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      setCurrentTheme("dark");
      localStorage.setItem("theme", "dark"); //add this
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setCurrentTheme("light");
      localStorage.setItem("theme", "light"); //add this
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
