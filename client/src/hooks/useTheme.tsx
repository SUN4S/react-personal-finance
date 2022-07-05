import { useEffect, useState } from "react";

// Custom hook to set/get data abount current theme
export const useTheme = () => {
  // set current theme bu checking if it exists in local storage
  // if it DOES NOT exist, set it to "light" by default
  const [currentTheme, setCurrentTheme] = useState<string | null>(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // Setting a different theme also store data into local storage
  const setTheme = (mode: string) => {
    localStorage.setItem("theme", mode);
    setCurrentTheme(mode);
  };

  // On load, set html->data-theme to currentTheme('light' or 'dark')
  useEffect(() => {
    currentTheme &&
      document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return { currentTheme, setTheme };
};
