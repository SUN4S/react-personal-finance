import "./themeSwitch.scss";

import React, { ChangeEvent, useEffect, useState } from "react";

export const ThemeSwitch = () => {
  const [currentTheme, setCurrentTheme] = useState<string | null>(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    currentTheme &&
      document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

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
      <button onClick={handleThemeChange}>
        {currentTheme === "dark" ? (
          <i className="fa-solid fa-moon"></i>
        ) : (
          <i className="fa-solid fa-sun"></i>
        )}
      </button>
    </div>
  );
};
